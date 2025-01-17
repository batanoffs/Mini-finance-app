import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useMessage } from './useMessage';
import { dataService } from '../services/userDataService';
import { notificationService } from '../services/notificationService';

export const useAddFriend = () => {
    const [number, setNumber] = useState('');
    const [error, setError] = useState(false);
    const { token, auth } = useContext(AuthContext);
    const showMessage = useMessage();

    const handleError = useCallback(
        (message) => {
            setError(true);
            showMessage('error', message);
        },
        [showMessage]
    );

    const validateRequest = useCallback(async () => {
        if (!number) return 'No phone number provided';
        if (number === auth.phoneNumber) return 'You cannot add yourself';

        const receiverData = await dataService.getAttribute('phoneNumber', number);
        if (!receiverData?.length) return 'User with this phone number does not exist';

        const receiverId = receiverData[0].objectId;
        if (auth.friends?.some((friend) => friend.objectId === receiverId)) {
            return 'User is already your friend';
        }
        return { receiverId };
    }, [number, auth.phoneNumber, auth.friends]);

    const checkExistingNotification = useCallback(
        async (receiverId) => {
            const notifications = await notificationService.getAllFriendRequests(token);
            return notifications?.filter(
                (request) =>
                    (request.receiver?.[0].objectId === receiverId &&
                        request.sender[0].objectId === auth.ownerId) ||
                    (request.receiver?.[0].objectId === auth.ownerId &&
                        request.sender[0].objectId === receiverId)
            );
        },
        [auth.ownerId, token]
    );

    const sendFriendRequest = useCallback(
        async (receiverId) => {
            const response = await notificationService.createNotification(
                number,
                null,
                'friend request',
                auth.ownerId,
                token
            );
            if (!response?.success) throw new Error('Failed to send friend request');
            showMessage('success', 'Friend request sent');
        },
        [number, auth.ownerId, token, showMessage]
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
        [auth.ownerId, token, showMessage]
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const validation = await validateRequest();
            if (typeof validation === 'string') throw new Error(validation);

            const { receiverId } = validation;
            const existingNotifications = await checkExistingNotification(receiverId);

            if (!existingNotifications?.length) {
                await sendFriendRequest(receiverId);
            } else {
                const [
                    {
                        sender: [{ objectId: senderId }],
                        receiver: [{ objectId: receiverId }],
                        status,
                    },
                ] = existingNotifications;
                if (status === 'pending') throw new Error('You have already sent a friend request');
                if (status === 'accepted') throw new Error('You are already friends');
                if (status === 'declined') {
                    await handleDeclinedRequest(existingNotifications[0], receiverId, senderId);
                }
            }
        } catch (error) {
            handleError(error.message);
        } finally {
            setNumber('');
        }
    };

    const onChangeNumber = (e) => setNumber(e.target.value);

    const onFocusClearErrorHandler = (e) => {
        e.target.style.border = `1px solid var(--primary-hover-color)`;
        setError(false);
    };

    return [
        onSubmit,
        onFocusClearErrorHandler,
        onChangeNumber,
        number,
        error,
        showMessage,
    ];
};

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
