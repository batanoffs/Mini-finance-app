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
    const onFriendAccept = async (notificationId, eventId, eventType) => {
        try {
            // Show success message
            showMessage('warning', 'Not implemented yet. Please try again later. ');
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
            showMessage('warning', 'Not implemented yet. Please try again later. ');
        } catch (error) {
            // Log error message
            console.error('Friend reject error:', error);
            showMessage('error', error.message || 'Failed to reject friend request');
        }
    };

    // Send the requested money to the requester
    const onCashApprove = async (notificationId, eventId, eventType) => {
        try {
            // Show success message
            showMessage('warning', 'Not implemented yet. Please try again later. ');
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
            showMessage('warning', 'Not implemented yet. Please try again later. ');
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
            const updateRes = await notificationService.updateSeen(notificationId);

            // Check if status update was successful
            if (!updateRes) throw new Error('Failed to update notification status');

            // Get all not seen notifications
            const retrieveNotifications = await notificationService.getByUserId(auth.objectId);

            // Update the current notifications state
            setNotifications(retrieveNotifications);

            // Show success message
            showMessage('success', 'Notification deleted successfully');
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
