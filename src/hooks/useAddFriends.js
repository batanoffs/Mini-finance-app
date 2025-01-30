import { useAuthContext } from '../contexts/AuthContext';
import { useMessage } from './useMessage';
import { dataService, friendRequestService } from '../services';
import { getUserToken } from '../utils';

export const useAddFriend = () => {
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    const onFriendRequest = async (formData) => {
        try {
            // Get the user's phone number and the friend's phone number
            const friendsPhoneNumber = formData.phone;
            const authUserId = auth.objectId;
            const userPhoneNumber = auth.phoneNumber;

            // Check if the user provided a phone number
            if (!friendsPhoneNumber) throw new Error('No phone number provided');

            // Check if the user is trying to add themselves
            if (friendsPhoneNumber === userPhoneNumber) throw new Error('You cannot add yourself');

            // Check if already friends
            const response = await dataService.checkUserFriend(authUserId, friendsPhoneNumber);

            // Validate the response
            if (response.length > 0)
                throw new Error(response.error.message || 'This user is already your friend');

            // Create the friend request
            const createResponse = await friendRequestService.create(
                friendsPhoneNumber,
                authUserId,
                token
            );

            // Validate the response - improve the error object
            if (!createResponse.success)
                throw new Error(createResponse.error.message || 'Failed to send friend request');

            // Show a success message
            showMessage('success', 'Friend request sent');
        } catch (error) {
            // Handle the error
            console.error(error);
            showMessage('error', error.message || 'Failed to send friend request');
        }
    };

    // Return the function to send friend request
    return {
        onFriendRequest,
    };
};
