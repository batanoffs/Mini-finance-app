import { useContext, useCallback } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { useMessage } from './useMessage';
import { dataService, notificationService } from '../services';
import { getUserToken } from '../utils';

export const useAddFriend = () => {
    const { auth } = useContext(AuthContext);
    const { token } = getUserToken();
    const showMessage = useMessage();

    const onFriendRequest = async (formData) => {
        try {
            const friendNumber = formData.phone;

            console.log('friendPhoneNumber', friendNumber);
            
            const verifyResponse = await verifyFriendRequestStatus(friendNumber);

            const { receiverUserId } = verifyResponse;

            if (receiverUserId) return await sendFriendRequest(friendNumber, receiverUserId);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                showMessage('error', error.message);
            } else {
                showMessage('error', 'An error occurred');
            }
        }
    };

    const verifyFriendRequestStatus = useCallback(
        async (telephone) => {
            if (!telephone) throw new Error('No phone number provided');

            if (telephone === auth.phoneNumber) throw new Error('You cannot add yourself');

            const userData = await dataService.getAttribute('phoneNumber', telephone);

            if (!userData?.length) throw new Error('User with this phone number does not exist');

            const receiverUserId = userData[0].objectId;

            if (auth.friends?.some((friend) => friend.objectId === receiverUserId))
                throw new Error('This user is already your friend');

            const checkExistingFriendRequests = await notificationService.getAllFriendRequests(
                token
            );

            // Find if friend request has been sent before
            const filterFriendRequests = checkExistingFriendRequests?.filter(
                ({ receiver, sender }) =>
                    (receiver?.[0].objectId === receiverUserId &&
                        sender[0].objectId === auth.ownerId) ||
                    (receiver?.[0].objectId === auth.ownerId &&
                        sender[0].objectId === receiverUserId)
            );

            // If no friend request has been sent before, return the receiver's userId
            if (!filterFriendRequests?.length) return receiverUserId;

            // If friend request has been sent before, check the status
            const [
                {
                    sender: [{ objectId: senderId }],
                    receiver: [{ objectId: receiverId }],
                    status,
                },
            ] = filterFriendRequests;

            if (status === 'pending') throw new Error('You have already sent a friend request');
            if (status === 'accepted') throw new Error('You are already friends');
            if (status === 'declined')
                return await handleDeclinedRequest(
                    filterFriendRequests[0],
                    receiverUserId,
                    senderId
                );
        },
        [auth]
    );

    const sendFriendRequest = useCallback(
        async (telephone, receiverId) => {
            const response = await notificationService.createNotification(
                telephone,
                null,
                'friend request',
                auth.ownerId,
                token
            );
            if (!response?.success) throw new Error('Failed to send friend request');
            showMessage('success', 'Friend request sent');
        },
        [auth, token, showMessage]
    );

    const handleDeclinedRequest = useCallback(
        async (notification, receiverId, senderId) => {
            const notificationId = notification.objectId;

            if (notification.receiver[0].objectId === auth.ownerId) {
                // Update Relations and Flip Request for the Declined Case
                const [setSenderResponse, setReceiverResponse] = await Promise.all([
                    notificationService.updateRelation(notificationId, 'sender', receiverId, token),
                    notificationService.updateRelation(notificationId, 'receiver', senderId, token),
                ]);
                if (!setSenderResponse || !setReceiverResponse)
                    throw new Error('Failed to update relation');
            }

            // Update Notification Status
            const response = await notificationService.updateNotificationStatus(
                notificationId,
                'pending',
                false,
                token
            );
            if (!response?.success) throw new Error('Error updating friend request status');
            showMessage('success', 'Friend request re-sent');
        },
        [auth, token, showMessage]
    );

    return {
        onFriendRequest,
    };
};

// const checkExistingNotification = useCallback(
//     async (receiverId) => {
//         const notifications = await notificationService.getAllFriendRequests(token);
//         return notifications?.filter(
//             (request) =>
//                 (request.receiver?.[0].objectId === receiverId &&
//                     request.sender[0].objectId === auth.ownerId) ||
//                 (request.receiver?.[0].objectId === auth.ownerId &&
//                     request.sender[0].objectId === receiverId)
//         );
//     },
//     [auth.ownerId, token]
// );

// const onSubmit = async (e) => {
//     e.preventDefault()
//     try {
//         if (!number) {
//             throw new Error('No phone number')
//         }
//         if (number === phone) {
//             throw new Error('You cannot add yourself')
//         }

//         const findReceiver = await dataService.getAttribute('phoneNumber', number)
//         if (!findReceiver || findReceiver.length === 0) {
//             throw new Error('User with this phone number does not exist')
//         }

//         const receiver = findReceiver[0].objectId
//         const findFriend = friends?.some((friend) => friend.objectId === receiver)

//         if (findFriend) {
//             throw new Error('User is already your friend')
//         }
//         // GET NOTIFICATIONS AND FILTER FOR SENDER RECEIVER
//         const allFriendRequestNotifications = await notificationService.getAllFriendRequests(
//             token
//         )
//         if (!allFriendRequestNotifications) {
//             throw new Error('Failed to fetch friend request notifications')
//         }
//         const checkFriendNotification = allFriendRequestNotifications.filter(
//             (request) =>
//                 (request.receiver?.length &&
//                     request.receiver[0].objectId === receiver &&
//                     request.sender[0].objectId === userDataId) ||
//                 (request.receiver?.length &&
//                     request.receiver[0].objectId === userDataId &&
//                     request.sender[0].objectId === receiver)
//         )
//         //CHECK IF NOTIFICATION EXIST
//         if (checkFriendNotification.length === 0) {
//             const response = await notificationService.createNotification(
//                 number,
//                 null,
//                 'friend request',
//                 userDataId,
//                 token
//             )

//             if (!response || !response.success) {
//                 throw new Error('Failed to send friend request')
//             }
//             showMessage('success', 'Friend request sent')
//         } else {
//             const senderID = checkFriendNotification[0]?.sender[0]?.objectId
//             const receiverID = checkFriendNotification[0]?.receiver[0]?.objectId
//             const notificationId = checkFriendNotification[0].objectId
//             const status = checkFriendNotification[0]?.status

//             if (status === 'pending') new Error('You have already sent a friend request')
//             if (status === 'accepted') new Error('You are already friends')
//             if (status === 'declined') {
//                 // CHECK IF FILTERED NOTIFICATION SENDER's ID IS CURRENT USER ID OR NOT
//                 // UPDATE RELATIONS to flip the friend request to the other user
//                 if (receiverID === userDataId) {
//                     const setSenderResponse = await notificationService.updateRelation(
//                         notificationId,
//                         'sender',
//                         receiverID,
//                         token
//                     )
//                     const setReceiverResponse = await notificationService.updateRelation(
//                         notificationId,
//                         'receiver',
//                         senderID,
//                         token
//                     )

//                     console.log('setSenderResponse', setSenderResponse)
//                     console.log('setReceiverResponse', setReceiverResponse)

//                     if (
//                         !setSenderResponse ||
//                         !setReceiverResponse ||
//                         setSenderResponse === 0 ||
//                         setReceiverResponse === 0
//                     ) {
//                         throw new Error('Failed to update relation')
//                     }
//                     const response = await notificationService.updateNotificationStatus(
//                         notificationId,
//                         'pending',
//                         false,
//                         token
//                     )
//                     if (!response) {
//                         throw new Error('Error accepting friend request')
//                     }
//                     showMessage('success', 'Friend request sent')
//                 }

//                 // ELSE ONLY CHANGE THE STATUS FOR SEEN AND STATUS TO PENDING
//                 if (senderID === userDataId) {
//                     const response = await notificationService.updateNotificationStatus(
//                         notificationId,
//                         'pending',
//                         false,
//                         token
//                     )
//                     if (!response || !response.success) {
//                         throw new Error('Error accepting friend request')
//                     }
//                     showMessage('success', 'Friend request sent')
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(error)
//         showMessage('error', error.message)
//     }
//     setNumber('')
// }
