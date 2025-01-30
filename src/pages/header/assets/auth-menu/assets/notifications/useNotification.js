import { useEffect, useState } from 'react';

import { dataService, notificationService, transactionService } from '../../../../../../services';
import { useAuthContext } from '../../../../../../contexts/AuthContext';
import { useMessage } from '../../../../../../hooks';
import { getUserToken } from '../../../../../../utils';
import { NOTIFY } from './constants';

export const useNotification = ({ initialState }) => {
    const [notifications, setNotifications] = useState(initialState);
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    // // Fetch notifications on component mount
    useEffect(() => {
        notificationService
            .getByUserId(auth.objectId)
            .then((result) => setNotifications(result))
            .catch((error) => console.log(error));
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
    const onCashApprove = async (notificationId, receiverFullName, amount) => {
        // Track operation states
        const states = {
            moneyTransferred: false,
            notificationAccepted: false,
            notificationSeen: false,
            receiverNotified: false,
        };

        try {
            // Input validation
            if (!notificationId || !receiverFullName || !amount || isNaN(amount)) {
                throw new Error('Invalid input parameters');
            }

            // TODO - fix error:
            // TODO - "Unable to create relation. Child object with id is not found in the related table."
            // Execute money transfer
            const moneyTransferResponse = await transactionService.send(
                receiverFullName,
                amount,
                auth.objectId,
                token
            );

            // Check if transaction was successful
            if (!moneyTransferResponse.success)
                throw new Error(moneyTransferResponse.error.message);

            states.moneyTransferred = true;

            // Update notifications
            const [notificationUpdates, notifications] = await Promise.all([
                Promise.all([
                    notificationService
                        .updateNotificationStatus(
                            notificationId,
                            NOTIFY.STATUS.accepted,
                            true,
                            token
                        )
                        .then(() => (states.notificationAccepted = true)),

                    notificationService
                        .updateSeenStatus(notificationId, true, token)
                        .then(() => (states.notificationSeen = true)),

                    transactionService
                        .notifyMoneyReceived(receiverFullName, amount, auth.ownerId, token)
                        .then(() => (states.receiverNotified = true)),
                ]),
                notificationService.getNotSeenNotifications(auth.ownerId),
            ]);

            if (!notifications) throw new Error('Failed to retrieve notifications');

            // Update the current notifications state
            setNotifications(notifications);

            // Show success message
            showMessage('success', 'Transaction successful');
        } catch (error) {
            // Rollback money transfer
            if (states.moneyTransferred) {
                try {
                    // TODO - Implement rollback for money transfer
                    console.log('Rollback money transfer not implemented');
                } catch (rollbackError) {
                    console.error('Failed to rollback transaction:', rollbackError);
                }
            }

            // Rollback notification states
            if (states.notificationAccepted || states.notificationSeen) {
                try {
                    await Promise.all([
                        states.notificationAccepted &&
                            notificationService.updateNotificationStatus(
                                notificationId,
                                NOTIFY.STATUS.pending,
                                false,
                                token
                            ),
                        states.notificationSeen &&
                            notificationService.updateSeenStatus(notificationId, false, token),
                    ]);
                } catch (rollbackError) {
                    console.error('Failed to rollback notifications:', rollbackError);
                }
            }

            // Log error message
            console.error('Transaction failed:', error);
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
                NOTIFY.STATUS.declined,
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

            // Get all not seen notifications
            const retrieveNotifications = await notificationService.getNotSeenNotifications(
                auth.ownerId,
                token
            );

            // Update the current notifications state
            setNotifications(retrieveNotifications);

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
