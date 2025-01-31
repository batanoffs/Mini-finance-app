import { useCallback, useEffect, useState } from 'react';

import { useMessage } from './useMessage';
import { useAuthContext } from '../contexts/AuthContext';
import { dataService, transactionService } from '../services/';
import { getUserToken } from '../utils';

// Map friends data to a more readable format
function filterFriends(friends) {
    if (friends?.length === 0) return [];

    return friends.map((friend) => ({
        name: friend.fullName,
        avatar: friend.avatar,
        objectId: friend.objectId,
    }));
}

export const useMakeTransactions = (type, toggleModal, initialState = {}) => {
    const [values, setValues] = useState({
        ...initialState,
        selectedFriendId: '',
    });
    const { auth } = useAuthContext();
    const [friends, setFriends] = useState(filterFriends(auth.friends));
    const { token } = getUserToken();
    const showMessage = useMessage();

    const fetchFriends = useCallback(async () => {
        try {
            if (!auth.objectId) throw new Error('No user found');

            const response = await dataService.getAllFriends(auth.objectId);

            if (!response || !response.friends) throw new Error('No friends found');

            const friendsList = response.friends;

            const filterFriends = friendsList
                .filter((friend) => friend?.fullName)
                .map((friend) => ({
                    name: friend.fullName,
                    avatar: friend.avatar,
                    objectId: friend.objectId,
                }));

            setFriends(filterFriends);
        } catch (error) {
            console.error(error);
            showMessage('error', 'Error during fetching');
        }
    }, []);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    const setUserInputHandler = (event) => {
        if (!event?.target) {
            return;
        }

        const { name, value } = event.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onTransaction = async (fullName, receiverId, amount) => {
        try {
            if (!fullName || !receiverId || !amount) throw new Error('Please fill in all fields');

            if (isNaN(amount) || amount <= 0) throw new Error('Please enter a valid amount');

            if (type === 'request') {
                const response = await transactionService.request(
                    fullName,
                    receiverId,
                    amount,
                    auth.objectId,
                    token
                );

                if (!response.success) throw new Error(response.error.message);
            }

            if (type === 'send') {
                const response = await transactionService.send(
                    auth.fullName,
                    receiverId,
                    amount,
                    auth.objectId,
                    token
                );

                if (!response.success) throw new Error(response.error.message);
            }

            // Only close modal and reset form on success
            toggleModal(type);
            setValues(() => ({
                amount: '',
                friends: '',
                selectedFriendId: '',
            }));
            showMessage('success', `Successfully ${type} the money`);
        } catch (error) {
            console.error(error);
            showMessage('error', `Error during ${type}: ${error.message || 'Unknown error'}`);
        }
    };

    const onClose = () => {
        try {
            toggleModal(type);
            setValues(() => ({
                amount: '',
                friends: '',
                selectedFriendId: '',
            }));
        } catch (error) {
            console.error(error);
            showMessage('error', error.message || `Error during closing`);
        }
    };

    return { values, friends, setValues, setUserInputHandler, onTransaction, onClose };
};
