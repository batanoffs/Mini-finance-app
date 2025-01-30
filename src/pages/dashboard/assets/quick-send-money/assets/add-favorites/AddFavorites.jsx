import { useContext, useState } from 'react';

import { AuthContext } from '../../../../../../contexts/AuthContext';
import { dataService } from '../../../../../../services';
import { useMessage } from '../../../../../../hooks';
import { Autocomplete } from '../../../../../../components/inputs';

import styles from './add-friends.module.css';

export const AddToFavorites = ({ toggleModal }) => {
    const { auth, setAuth } = useContext(AuthContext);

    const [userInput, setUserInput] = useState({});
    const showMessage = useMessage();

    const onSubmit = async (event) => {
        event.preventDefault();
        const inputName = userInput.friends;

        try {
            const findFriend = auth.friends.filter((friend) => friend.fullName === inputName);
            const body = [findFriend[0].objectId];

            if (!findFriend) throw new Error('This user is not your friend!');
            if (!findFriend.length) throw new Error('This user is not your friend!');
            if (!userInput) throw new Error('Please enter a name!');
            if (!auth.objectId) throw new Error('Something went wrong');

            const response = await dataService.setRelation(
                auth.objectId,
                'favorite_friends',
                body,
            );

            if (response !== 1) {
                toggleModal('favFriends');
                throw new Error('Something went wrong!');
            }

            if (response === 1) {
                setAuth({ ...auth, favorite_friends: [...auth.favorite_friends, findFriend[0]] });
                sessionStorage.setItem(
                    'auth',
                    JSON.stringify({
                        ...auth,
                        favorite_friends: [...auth.favorite_friends, findFriend[0]],
                    })
                );
                toggleModal('favFriends');
                showMessage('success', `${findFriend[0].fullName} has been added to favorites!`);
            }
        } catch (error) {
            showMessage('error', error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Autocomplete
                name="favorite-name"
                id="favorite-name"
                userInput={userInput}
                setUserInput={setUserInput}
                suggestions={auth?.friends?.map(friend => ({
                    name: friend.fullName,
                    avatar: friend.avatar,
                    objectId: friend.objectId
                }))}
            />
            {/* Display a short validation message if no friend is selected */}
            {!userInput.friends && (
                <p className={styles.error}>Please select a friend before submitting.</p>
            )}
            <input
                className={`custom-btn-fill ${styles.button}`}
                type="submit"
                value="Add to favorites"
                disabled={!userInput.friends}
            />
        </form>
    );
};
