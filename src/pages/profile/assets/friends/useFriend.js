import { useEffect, useMemo, useState } from 'react';

import { useAuthContext } from '../../../../contexts/AuthContext';
import { dataService } from '../../../../services';
import { useMessage } from '../../../../hooks';
import { getUserToken } from '../../../../utils';

export const useFriends = () => {
    const { auth, setAuth } = useAuthContext();
    const [allFriends, setAllFriends] = useState(auth.friends);
    const [search, setSearch] = useState('');
    const { token } = getUserToken();
    const showMessage = useMessage();

    const activeFriends = useMemo(() => {
        if (!search) return allFriends;
        return allFriends.filter((friend) =>
            friend.fullName.toLowerCase().includes(search.toLowerCase())
        );
    }, [allFriends, search]);

    useEffect(() => {
        dataService
            .getUserData(auth.objectId, ['friends'])
            .then((userData) => {
                setAllFriends(userData.friends);
                setAuth({ ...auth, friends: userData.friends });
            })
            .catch((error) => console.error(error));
    }, []);

    const onRemoveFriend = async (friendId) => {
        try {
            // Check if the friend's id is available
            if (!friendId) throw new Error('Friend not found');

            // Remove the friend from the user's friend list
            const response = await dataService.removeFriend(auth.objectId, friendId, token);

            // Check for errors
            if (!response.success) throw new Error(response.error.message);

            // Update session storage friends and favorite friends list
            const filterFriends = auth.friends.filter((friend) => friend.objectId !== friendId);
            const filterFavoriteFriends = auth.favorite_friends.filter(
                (friend) => friend.objectId !== friendId
            );

            sessionStorage.setItem(
                'auth',
                JSON.stringify({
                    ...auth,
                    friends: filterFriends,
                    favorite_friends: filterFavoriteFriends,
                })
            );

            // Update the state
            setAuth({ ...auth, friends: filterFriends || [] });

            // Update the filtered friends list
            setAllFriends(filterFriends);

            // Show success message
            showMessage('success', 'Friend removed successfully');
        } catch (error) {
            console.error(error);
            showMessage('error', error.message || 'An error occurred');
        }
    };

    const onSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    return {
        friends: activeFriends,
        search,
        onSearch,
        setFriends: setAllFriends,
        onRemoveFriend,
    };
};
