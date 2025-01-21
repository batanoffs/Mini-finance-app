import { notificationService, transactionService } from '../../../../../services';
import { useMessage } from '../../../../../hooks';
import { getUserToken } from '../../../../../utils';
import { useState } from 'react';
import { NOTIFY } from './constants';

export const useNotification = ({ auth, initialState }) => {
    const [notifications, setNotifications] = useState(initialState);
    const { token } = getUserToken();
    const showMessage = useMessage();

    // Handler to accept friend request
    const onFriendAccept = async (e) => {
        try {
            // Get notification id and sender id
            const notificationId = e.currentTarget.parentElement.getAttribute('data-key');
            const senderId = e.currentTarget.getAttribute('data-sender');

            // Check if notification id or sender id is null
            if (!notificationId || !senderId) throw new Error('Missing notification or sender id');

            // Update notification status to accepted
            await notificationService.updateNotificationStatus(
                notificationId,
                NOTIFY.STATUS.accepted,
                true,
                token
            );

            // Get notifications that are not seen
            const result = await notificationService.getNotSeenNotifications(auth.objectId);

            // Update notifications state
            setNotifications(result);

            // Set relation between the two users
            const setReceiverFriend = await dataService.setRelation(auth.objectId, 'friends', [
                senderId,
            ]);

            // Check if relation was set successfully
            const setSenderFriend = await dataService.setRelation(senderId, 'friends', [
                auth.objectId,
            ]);

            // Get sender data
            const getSender = await dataService.getUser(senderId);

            // Check if receiver and sender aren't already friends
            if (setReceiverFriend !== 1 && setSenderFriend !== 1) {
                // Show message already added
                showMessage('warning', 'You have already added this friend');

                return;
            }

            // Update auth state with new friend
            setAuth({ ...auth, friends: [...auth.friends, getSender] });

            // Update session storage with new friend
            sessionStorage.setItem(
                'auth',
                JSON.stringify({
                    ...auth,
                    friends: [...auth.friends, getSender],
                })
            );

            // Show success message
            showMessage('success', 'You have successfully added a friend');
        } catch (error) {
            // Check if error is instance of Error
            if (error instanceof Error) {
                // Log error message
                console.error(error);

                // Show error message
                showMessage('error', `Error while accepting the friend request: ${error.message}`);
            } else {
                // Log error
                console.error(error);

                // Show error message
                showMessage('error', 'Unknown error occurred while sending');
            }
        }
    };

    // Handler to reject friend request
    const onFriendReject = async (e) => {
        try {
            // Get notification id
            const notificationId = e.currentTarget.parentElement.getAttribute('data-key');

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
            const response = await notificationService.getNotSeenNotifications(
                auth.objectId,
                token
            );

            // Check if response is null
            if (!response) throw new Error('An error occurred while declining the request');

            // Update the current notifications state
            setNotifications(response);

            // Show success message
            showMessage('error', 'The friend request has been declined');
        } catch (error) {
            // Check if error is instance of Error
            if (error instanceof Error) {
                // Log error message
                console.error(error.message);

                // Show error message
                showMessage(
                    'error',
                    `An error occurred while declining the request': ${error.message}`
                );
            } else {
                // Log error
                console.error(error);

                // Show error message
                showMessage('error', 'Unknown error occurred while sending');
            }
        }
    };

    // Send the requested money to the requester
    const onCashApprove = async (e) => {
        try {
            // Get notification id
            const notificationId = e.currentTarget.parentElement.getAttribute('data-key');

            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id is null');

            // Get requester name
            const requesterName = e.currentTarget.getAttribute('data-requester-name');

            // Check if requester name is null
            if (!requesterName) throw new Error('Requester name not found');

            // Get amount
            const amount = Number(e.currentTarget.getAttribute('data-amount'));

            // Check if amount is null or not a number
            if (!amount || isNaN(amount)) throw new Error('Amount is not valid or missing');

            // On user accept transaction, send the money
            const response = await transactionService.sendMoney(
                requesterName,
                amount,
                auth.ownerId,
                token
            );

            // Check if transaction was successful
            if (response.success) {
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
                showMessage('success', 'The transaction was successful');
            }
        } catch (error) {
            // Check if error is instance of Error
            if (error instanceof Error) {
                // Log error message
                console.error(error.message);

                // Show error message
                showMessage('error', `Error while accepting the transaction: ${error.message}`);
            } else {
                // Log error
                console.error(error);

                // Show error message
                showMessage('error', 'Unknown error occurred while sending');
            }
        }
    };

    // Decline sending the requested money to the recipient
    const onCashDecline = async (e) => {
        try {
            // Get notification id
            const notificationId = e.currentTarget.parentElement?.getAttribute('data-key');

            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id is null');

            // Update notification status to declined
            await notificationService.updateNotificationStatus(
                notificationId,
                'declined',
                true,
                token
            );

            // Get all not seen notifications
            const getNotificationsResponse = await notificationService.getNotSeenNotifications(
                auth.ownerId
            );

            // Update the current notifications state
            setNotifications(getNotificationsResponse);

            // Show success message
            showMessage('success', 'Event declined successfully');
        } catch (error) {
            // Check if error is instance of Error
            if (error instanceof Error) {
                // Log error message
                console.error(error.message);

                // Show error message
                showMessage('error', `Error while declined the transaction: ${error.message}`);
            } else {
                // Log error
                console.error(error);

                // Show error message
                showMessage('error', 'Unknown error occurred while sending');
            }
        }
    };

    // Delete notification from the user list
    const onDelete = async (e) => {
        try {
            // Get notification id
            const notificationId = e.currentTarget.getAttribute('data-key');

            // Check if notification id is null
            if (!notificationId) throw new Error('Notification id is null');

            // Update notification status to seen
            await notificationService.updateSeenStatus(notificationId, true, token);

            // Show success message
            showMessage('success', 'Successfully deleted message');
        } catch (error) {
            // Check if error is instance of Error
            if (error instanceof Error) {
                // Log error message
                console.error(error.message);

                // Show error message
                showMessage('error', `Error while deleting notification: ${error.message}`);
            } else {
                // Log error
                console.error(error);

                // Show error message
                showMessage('error', 'Unknown error occurred while deleting notification');
            }
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
