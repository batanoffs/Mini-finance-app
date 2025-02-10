import { useCallback, useEffect, useState } from 'react';

import { dataService, transactionService } from '../../../../../../services';

export const useMakeTransactions = (
    type,
    currentUserId,
    currentUserFullName,
    setShowModal,
    token,
    showMessage,
    values,
    setValues
) => {
    const [friendSuggestions, setFriendsSuggestions] = useState([]);

    const fetchFriends = useCallback(async () => {
        try {
            if (!currentUserId) throw new Error('No user found');

            const response = await dataService.getAllFriends(currentUserId);

            if (!response) throw new Error(response.error || 'Error during fetching');

            const friendsList = response.friends;

            const filterFriends = friendsList
                .filter((friend) => friend?.fullName)
                .map((friend) => ({
                    name: friend.fullName,
                    avatar: friend.avatar,
                    objectId: friend.objectId,
                }));

            setFriendsSuggestions(filterFriends);
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
                    currentUserFullName,
                    currentUserId,
                    amount,
                    receiverId,
                    token
                );

                if (!response.success) throw new Error(response.error.message);
            }

            if (type === 'send') {
                const response = await transactionService.send(
                    currentUserFullName,
                    receiverId,
                    amount,
                    currentUserId,
                    token
                );

                if (!response.success) throw new Error(response.error.message);
            }

            // Only close modal and reset form on success
            setShowModal(type);
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
            setShowModal(type);
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

    return {
        values,
        friendSuggestions,
        setValues,
        setUserInputHandler,
        onTransaction,
        onClose,
    };
};
