import { useCallback, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';
import { dataService, notificationService } from '../../../../services';
import { useMessage } from '../../../../hooks';
import { getUserToken } from '../../../../utils';

export const useFriends = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [friends, setFriends] = useState(auth.friends);
    const [search, setSearch] = useState('');
    const { token } = getUserToken();
    const showMessage = useMessage();

    // Fetch current user's friends
    const fetchFriends = useCallback(async () => {
        const userData = await dataService.getUserData(auth.objectId, ['friends']);
        setFriends(userData[0].friends);
    }, [auth.ownerId]);

    useEffect(() => {
        fetchFriends();
    }, []);

    const onRemoveFriend = async (e) => {
        try {
            // Get the friend's id
            const friendId = e.currentTarget.parentElement.parentElement.getAttribute('data-key');
            if (!friendId) throw new Error('Friend not found');

            // Get all friend request notifications
            const frRequestNotifications = await notificationService.getAllFriendRequests(token);
            if (!frRequestNotifications)
                throw new Error('Failed to fetch friend request notifications');

            // Check if the friend request notification exists
            const checkNotification = frRequestNotifications.filter((request) => {
                const receiverId = request.receiver[0].objectId;
                const senderId = request.sender[0].objectId;
                return (
                    (request.receiver?.length &&
                        receiverId === friendId &&
                        senderId === auth.objectId) ||
                    (request.receiver?.length &&
                        receiverId === auth.objectId &&
                        senderId === friendId)
                );
            });

            // If the notification exists, delete it
            await notificationService.deleteNotification(checkNotification[0].objectId);

            // Remove the friend from the user's friend list
            await dataService.removeRelation(auth.objectId, 'friends', [friendId]);

            // Remove the user from the friend's friend list
            await dataService.removeRelation(friendId, 'friends', [auth.objectId]);

            // Update the user's friend list
            const filterFriends = auth.friends.filter((friend) => friend.objectId !== friendId);

            // Update the user's friend list in the context and session storage
            setAuth({ ...auth, friends: filterFriends || [] });
            sessionStorage.setItem('auth', JSON.stringify({ ...auth, friends: filterFriends }));

            // Show success message
            showMessage('success', 'Friend removed successfully');
        } catch (error) {
            showMessage('error', error.message);
            console.error(error);
        }
    };

    const onSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (!value === '') {
            const filteredList = friends.filter((friend) =>
                friend.fullName.toLowerCase().includes(value.toLowerCase())
            );
            setFriends(filteredList);
        }
    };

    return {
        friends,
        search,
        onSearch,
        setFriends,
        onRemoveFriend,
    };
};
