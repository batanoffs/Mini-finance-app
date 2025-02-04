import { useEffect, useState } from 'react';

import { notificationService } from '../../../../../../services';
import { useAuthContext } from '../../../../../../contexts/AuthContext';
import { useMessage } from '../../../../../../hooks';
import { getUserToken } from '../../../../../../utils';

export const useNotification = ({ initialState }) => {
    const [notifications, setNotifications] = useState(initialState);
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    // Fetch notifications on component mount
    useEffect(() => {
        notificationService
            .getByUserId(auth.objectId)
            .then((result) => setNotifications(result))
            .catch((error) => {
                console.log(error);
                showMessage('error', 'Failed to fetch notifications - under maintenance');
            });
    }, []);

    // Handler to accept friend request
    const onFriendAccept = async (notificationId, sender) => {
        try {
            // Show success message
            showMessage('warning', 'Not implemented yet');
        } catch (error) {
            // Log error message
            console.error('Friend accept error:', error);
            showMessage('error', error.message || 'Failed to accept friend request');
        }
    };

    // Handler to reject friend request
    const onFriendReject = async (notificationId) => {
        try {
            // Show success message
            showMessage('warning', 'Not implemented yet');
        } catch (error) {
            // Log error message
            console.error('Friend reject error:', error);
            showMessage('error', error.message || 'Failed to reject friend request');
        }
    };

    // Send the requested money to the requester
    const onCashApprove = async (notificationId, receiverFullName, amount) => {
        try {
            // Show success message
            showMessage('warning', 'Not implemented yet');
        } catch (error) {
            // Log error message
            console.error('Transaction failed:', error);
            showMessage('error', error.message || 'Failed to accept money transaction');
        }
    };

    // Decline sending the requested money to the recipient
    const onCashDecline = async (notificationId) => {
        try {
            // Show success message
            showMessage('warning', 'Not implemented yet');
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
