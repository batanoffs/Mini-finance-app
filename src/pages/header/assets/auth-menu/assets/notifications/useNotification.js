import { useCallback, useContext, useEffect, useState } from 'react';

import { dataService, notificationService, transactionService } from '../../../../../../services';
import { AuthContext } from '../../../../../../contexts/AuthContext';
import { useMessage } from '../../../../../../hooks';
import { getUserToken } from '../../../../../../utils';
import { NOTIFY } from './constants';

export const useNotification = ({ initialState }) => {
    const [notifications, setNotifications] = useState(initialState);
    const { auth } = useContext(AuthContext);
    const { token } = getUserToken();
    const showMessage = useMessage();

    // Fetch notifications from the server with memoization
    const fetchNotifications = useCallback(async () => {
        notificationService
            .getNotSeenNotifications(auth.ownerId, token)
            .then((result) => setNotifications(result))
            .catch((error) => console.log(error));
    }, [auth.ownerId, token]);

    // Fetch notifications on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Handler to accept friend request
    const onFriendAccept = async (notificationId, sender) => {
        const currentUserId = auth.objectId;
        const senderId = sender.objectId;

        // Track set relations requests states
        let setRelations = {
            first: false,
            second: false,
        };

        try {
            // Validate inputs
            if (!notificationId || !currentUserId || !senderId)
                throw new Error('Missing required data');

            // Set friend relations
            setRelations.first = await dataService.setRelation(currentUserId, 'friends', [
                senderId,
            ]);

            // Validate relation creation
            if (!setRelations.first) throw new Error('Set relation failed');

            // Set friend relations
            setRelations.second = await dataService.setRelation(senderId, 'friends', [
                currentUserId,
            ]);

            // Validate relation creation
            if (!setRelations.first) throw new Error('Set relation failed');

            // Validate friendship creation
            if (setRelations.first !== 1 || setRelations.second !== 1)
                throw new Error('Friendship already exists');

            // Update notification status to accepted
            const updateStatus = await notificationService.updateNotificationStatus(
                notificationId,
                NOTIFY.STATUS.accepted,
                true,
                token
            );

            // Validate notification status update
            if (!updateStatus) throw new Error('Failed to update notification status');

            // Get all not seen notifications
            const retrieveNotifications = await notificationService.getNotSeenNotifications(
                currentUserId,
                token
            );

            // Validate notification retrieval
            if (!retrieveNotifications) throw new Error('Failed to retrieve notifications');

            // Update notifications state
            setNotifications(retrieveNotifications);

            // Show success message
            showMessage('success', 'Friend successfully added');
        } catch (error) {
            // Handle rollback based on operation state
            if (setRelations.first) {
                try {
                    await dataService.setRelation(currentUserId, 'friends', []);
                } catch (rollbackError) {
                    console.error('Rollback failed for first relation:', rollbackError);
                }
            }

            if (setRelations.second) {
                try {
                    await dataService.setRelation(senderId, 'friends', []);
                } catch (rollbackError) {
                    console.error('Rollback failed for second relation:', rollbackError);
                }
            }
            // Log error message
            console.error('Friend accept error:', error);
            showMessage('error', error.message || 'Failed to accept friend request');
        }
    };

    // Handler to reject friend request
    const onFriendReject = async (notificationId) => {
        try {
            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id is null');

            // Update notification status to declined
            await notificationService.updateNotificationStatus(
                notificationId,
                NOTIFY.STATUS.declined,
                true,
                token
            );

            // Get all not seen notifications
            const retrieveNotifications = await notificationService.getNotSeenNotifications(
                auth.objectId,
                token
            );

            // Check if response is null
            if (!retrieveNotifications)
                throw new Error('An error occurred while declining the request');

            // Update the current notifications state
            setNotifications(retrieveNotifications);

            // Show success message
            showMessage('error', 'The friend request has been declined');
        } catch (error) {
            // Log error message
            console.error('Friend reject error:', error);
            showMessage('error', error.message || 'Failed to reject friend request');
        }
    };

    // Send the requested money to the requester
    const onCashApprove = async (notificationId, requesterName, amount) => {
        try {
            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id is null');

            // Check if requester name is null
            if (!requesterName) throw new Error('Requester name not found');

            // Check if amount is null or not a number
            if (!amount || isNaN(amount)) throw new Error('Amount is not valid or missing');

            // On user accept transaction, send the money
            const moneyTransferResponse = await transactionService.sendMoney(
                requesterName,
                amount,
                auth.ownerId,
                token
            );

            // Check if transaction was successful
            if (moneyTransferResponse.success) {
                // Update notification status to accepted
                await notificationService.updateNotificationStatus(
                    notificationId,
                    'accepted',
                    true,
                    token
                );

                // Update notification status to seen
                await notificationService.updateSeenStatus(notificationId, true, token);

                // Send notification to requester that money was received
                await transactionService.notifyMoneyReceived(
                    requesterName,
                    amount,
                    auth.ownerId,
                    token
                );

                // Get all not seen notifications
                const getNotificationsResponse = await notificationService.getNotSeenNotifications(
                    auth.ownerId
                );

                // Update the current notifications state
                setNotifications(getNotificationsResponse);

                // Show success message
                showMessage('success', 'Transaction successful');
            }
        } catch (error) {
            // Log error message
            console.error('Money transaction error:', error);
            showMessage('error', error.message || 'Failed to accept money transaction');
        }
    };

    // Decline sending the requested money to the recipient
    const onCashDecline = async (notificationId) => {
        try {
            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id is null');

            // Update notification status to declined
            const statusUpdateRes = await notificationService.updateNotificationStatus(
                notificationId,
                'declined',
                true,
                token
            );

            // Check if status update was successful
            if (!statusUpdateRes) throw new Error('Failed to update notification status');

            // Get all not seen notifications
            const retrievedNotifications = await notificationService.getNotSeenNotifications(
                auth.ownerId
            );

            // Update the current notifications state
            setNotifications(retrievedNotifications);

            // Show success message
            showMessage('success', 'Transaction declined');
        } catch (error) {
            // Log error message
            console.error('Decline transaction error:', error);
            showMessage('error', error.message || 'Failed to declined transaction');
        }
    };

    // Delete notification from the user list
    const onDelete = async (notificationId) => {
        try {
            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id not found');

            // Update notification status to seen
            const statusUpdateRes = await notificationService.updateSeenStatus(
                notificationId,
                true,
                token
            );

            // Check if status update was successful
            if (!statusUpdateRes) throw new Error('Failed to update notification status');

            // Show success message
            showMessage('success', 'Successfully deleted message');
        } catch (error) {
            // Log error message
            console.error('Delete notification error:', error);
            showMessage('error', error.message || 'Failed to delete notification');
        }
    };

    return {
        onDelete,
        onCashApprove,
        onCashDecline,
        onFriendAccept,
        onFriendReject,
        notifications,
        setNotifications,
    };
};

// ADD FRIEND REQUEST
// // Update notifications state
// setNotifications(result);
// const [
//     updateStatus,
//     getUserNotifications,
//     setReceiverFriend,
//     setSenderFriend,
//     getSender,
// ] = Promise.all([

//     // Update notification status to accepted
//     await notificationService.updateNotificationStatus(
//         notificationId,
//         NOTIFY.STATUS.accepted,
//         true,
//         token
//     ),

//     // Get all not seen notifications
//     await notificationService.getNotSeenNotifications(auth.objectId),

//     // Set relation between the two users
//     await dataService.setRelation(auth.objectId, 'friends', [senderId]),

//     // Check if relation was set successfully
//     await dataService.setRelation(senderId, 'friends', [auth.objectId]),

//     // Get sender data
//     await dataService.getUser(senderId),
// ]);

// // Check if receiver and sender aren't already friends
// if (setReceiverFriend !== 1 && setSenderFriend !== 1)
//     throw new Error('You have already added this friend');

// // Update auth state with new friend
// setAuth({ ...auth, friends: [...auth.friends, getSender] });

// // Get notifications that are not seen
// const result = await notificationService.getNotSeenNotifications(auth.objectId);

// // Update notifications state
// setNotifications(result);
