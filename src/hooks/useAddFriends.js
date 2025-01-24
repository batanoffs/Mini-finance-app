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
            // Get the target user's phone number
            const phone = formData.phone;

            // Check if the user provided a phone number
            if (!phone) throw new Error('No phone number provided');

            // Check if the user is trying to add themselves
            if (phone === auth.phoneNumber) throw new Error('You cannot add yourself');

            // Get the receiver's user data
            const friend = await dataService.getUserDataByAttribute('phoneNumber', phone);

            // Check if the user exists
            if (!friend || friend.length === 0) throw new Error('User with this phone number does not exist');

            // Get the receiver's id
            const friendId = friend[0].objectId;

            // Check if the user is already your friend
            const validateFriend = auth.friends?.some((friend) => friend.objectId === friendId);

            // Validate if the user is already a friend
            if (validateFriend) throw new Error('This user is already your friend');

            // TODO - could be improved just by query logic to the backend
            // Get all friend requests notifications
            const userFriendRequests = await notificationService.getAllFriendRequests(token);

            // Find if friend request has been sent before
            const filterFriendRequests = userFriendRequests?.filter(
                ({ receiver, sender }) =>
                    (receiver?.[0].objectId === friendId && sender[0]?.objectId === auth.ownerId) 
                ||
                    (receiver?.[0].objectId === auth.ownerId && sender[0]?.objectId === friendId)
            );

            // TODO -------------------------------------------------------

            // If no friend request has been sent before, send the request
            if (filterFriendRequests?.length === 0) {

                // Send the friend request
                const response = await notificationService.createNotification(
                    friendId,
                    'friend request',
                    auth.objectId,
                    token
                );

                // Validate the response
                if (!response?.success)
                    throw new Error(response.message || 'Failed to send friend request');

                // Show success message
                showMessage('success', 'Friend request sent');
            }

            const status = filterFriendRequests[0]?.status;

            // Validate friend request status
            if (status === 'pending') throw new Error('You have already sent a friend request');
            if (status === 'accepted') throw new Error('You are already friends');

            // If the receiver declined the request
            if (status === 'declined') {
                // Flip the request to the sender
                return await handleDeclinedRequest(filterFriendRequests);
            }

        } catch (error) {
            // Handle the error
            console.error(error.message || error);
            showMessage('error', 'Failed to send friend request');
        }
    };

    // Handle the declined request
    const handleDeclinedRequest = useCallback(
        async (notification) => {
            // Get ids from the notification
            const senderId = notification[0]?.sender[0]?.objectId;
            const receiverId = notification[0]?.receiver[0]?.objectId;
            const notificationId = notification[0].objectId;

            // If friend request has been sent before, check the status
            if (notification.receiver[0].objectId === auth.ownerId) {
                // Update Relations and Flip Request for the Declined Case
                const [setSenderResponse, setReceiverResponse] = await Promise.all([
                    notificationService.updateRelation(notificationId, 'sender', receiverId, token),
                    notificationService.updateRelation(notificationId, 'receiver', senderId, token),
                ]);

                // Validate the response
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

            // Validate the response
            if (!response?.success) throw new Error('Error updating friend request status');

            // Show success message
            showMessage('success', 'Friend request re-sent');
        },
        [auth, token, showMessage]
    );

    // Return the function to send friend request
    return {
        onFriendRequest,
    };
};