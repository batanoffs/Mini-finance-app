import { useState } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import { useMessage } from './useMessage';
import { dataService, friendRequestService } from '../services';
import { getUserToken } from '../utils';

export const useAddFriend = () => {
    const [value, setValue] = useState('');
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    const changeHandler = (phone) => {
        setValue(phone || '');
    };

    const onFriendRequest = async () => {
        try {
            // Get the user's phone number and the friend's phone number
            const friendPhone = value;
            const authUserId = auth.objectId;
            const currentUserName = auth.fullName;
            const userPhoneNumber = auth.phoneNumber;

            // Check if the user provided a phone number
            if (!friendPhone) throw new Error('No phone number provided');

            if (!auth || !auth.objectId || !auth.phoneNumber)
                throw new Error('User not authenticated');

            // Check if the user is trying to add themselves
            if (friendPhone === userPhoneNumber) throw new Error('You cannot add yourself');

            // Check if already friends
            const isYourFriend = auth.friends.find((x) => x.phoneNumber === friendPhone);

            if (isYourFriend) throw new Error('This user is already your friend');

            // Find the user by input phone number
            const friend = await dataService.getByAttr(friendPhone);

            // If no user found throw an error
            if (!friend || !friend.length > 0)
                throw new Error(`User with phone number ${friendPhone} does not exist`);

            //TODO - check if the same friend request exists in the database

            // Create the friend request and notification
            const createResponse = await friendRequestService.create(
                friend[0].objectId,
                authUserId,
                currentUserName,
                token
            );

            // Validate the response - improve the error object
            if (!createResponse.success)
                throw new Error(createResponse.error.message || 'Failed to send friend request');

            // Clear input and show success message
            setValue('');
            showMessage('success', 'Friend request sent');
        } catch (error) {
            // Handle the error
            console.error(error);
            showMessage('error', error.message || 'Failed to send friend request');
        }
    };

    return {
        onFriendRequest,
        value,
        changeHandler,
    };
};
