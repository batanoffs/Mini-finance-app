import { useCallback, useContext, useEffect, useState } from 'react';

import { useMessage } from './useMessage';
import { AuthContext } from '../contexts/AuthContext';
import { dataService, transactionService } from '../services/';
import { getUserToken } from '../utils';

export const useMakeTransactions = (type, toggleModal, initialState = {}) => {
    const [values, setValues] = useState({
        ...initialState,
        selectedFriendId: '',
    });
    const { auth } = useContext(AuthContext);
    const [friends, setFriends] = useState(() => {
        // Initialize with any existing friends from auth
        if (auth.friends?.length > 0) {
            return auth.friends
                .filter((f) => f?.fullName)
                .map((friend) => ({
                    name: friend.fullName,
                    avatar: friend.avatar,
                    objectId: friend.objectId,
                }));
        }
        return [];
    });
    const { token } = getUserToken();
    const showMessage = useMessage();

    const fetchFriends = useCallback(async () => {
        if (!auth.objectId) return;

        try {
            const response = await dataService.getRelation(auth.objectId, 'friends');
            const friendsList = response?.friends || [];

            const filterFriends = friendsList
                .filter((friend) => friend?.fullName)
                .map((friend) => ({
                    name: friend.fullName,
                    avatar: friend.avatar,
                    objectId: friend.objectId,
                }));

            setFriends(filterFriends);
        } catch (error) {
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
            if (!fullName || !receiverId || !amount) {
                throw new Error('Please fill in all fields');
            }

            if (isNaN(Number(amount)) || Number(amount) <= 0) {
                throw new Error('Please enter a valid amount');
            }

            let response;

            if (type === 'request') {
                response = await transactionService.requestNotify(
                    fullName,
                    Number(amount),
                    auth.objectId,
                    token
                );
            }

            if (type === 'send') {
                response = await transactionService.sendMoney(
                    fullName,
                    receiverId,
                    Number(amount),
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
            // Just show error message, keep modal open
            showMessage('error', `Error during ${type}: ${error.message}`);
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
