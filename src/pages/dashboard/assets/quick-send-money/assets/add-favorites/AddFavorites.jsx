import { useState } from 'react';

import { useAuthContext } from '../../../../../../contexts/AuthContext';
import { dataService } from '../../../../../../services';
import { useMessage } from '../../../../../../hooks';
import { Autocomplete, FormInput } from '../../../../../../components/inputs';

import styles from './add-friends.module.css';

export const AddToFavorites = ({ toggleModal }) => {
    const { auth, setAuth } = useAuthContext();

    const [userInput, setUserInput] = useState({ friends: '' });
    const showMessage = useMessage();

    const onSubmit = async (event) => {
        event.preventDefault();
        const inputName = userInput.friends;

        try {
            if (!inputName?.trim()) {
                throw new Error('Please enter a name!');
            }
            if (!auth.objectId) {
                throw new Error('Something went wrong');
            }

            const findFriend = auth.friends?.find((friend) => friend.fullName === inputName);
            if (!findFriend) {
                throw new Error('This user is not your friend!');
            }

            const response = await dataService.setRelation(auth.objectId, 'favorite_friends', [
                findFriend.objectId,
            ]);

            if (response !== 1) {
                throw new Error('Something went wrong!');
            }

            // Update auth context and session storage
            const updatedFavorites = [...auth.favorite_friends, findFriend];
            const updatedAuth = { ...auth, favorite_friends: updatedFavorites };

            setAuth(updatedAuth);
            sessionStorage.setItem('auth', JSON.stringify(updatedAuth));

            toggleModal('favFriends');
            showMessage('success', `${findFriend.fullName} has been added to favorites!`);
        } catch (error) {
            showMessage('error', error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Autocomplete
                name="friends"
                id="friends"
                userInput={userInput}
                setUserInput={setUserInput}
                suggestions={auth?.friends?.map((friend) => ({
                    name: friend.fullName,
                    avatar: friend.avatar,
                    objectId: friend.objectId,
                }))}
            />
            {/* Display a short validation message if no friend is selected */}
            {!userInput.friends && (
                <p className={styles.error}>Please select a friend before submitting.</p>
            )}

            <FormInput type="submit" value="Add to favorites" disabled={!userInput.friends} />
        </form>
    );
};
