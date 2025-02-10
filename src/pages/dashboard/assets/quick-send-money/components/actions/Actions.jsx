import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useAuthContext } from '../../../../../../contexts/AuthContext';
import { dataService } from '../../../../../../services';
import { useMessage } from '../../../../../../hooks';

import styles from './actions.module.css';

export const Actions = ({ friend, setEditMode }) => {
    const { auth, setAuth } = useAuthContext();

    const showMessage = useMessage();

    const showActionsHandler = (e) => {
        const tooltip = e.currentTarget.nextElementSibling;
        tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    };

    const closeMenuHandler = (e) => {
        e.currentTarget.style.display =
            e.currentTarget.style.display === 'block' ? 'none' : 'block';
    };

    const onConfirmHandler = () => {
        try {
            if (!friend.objectId) throw new Error('Friend not found');

            const response = dataService.removeRelation(auth.objectId, 'favorite_friends', [
                friend.objectId,
            ]);

            if (!response) throw new Error('Removing failed');

            showMessage('success', 'Successfully removed friend from list');
            setAuth({
                ...auth,
                favorite_friends: auth.favorite_friends.filter(
                    (favorite) => favorite.objectId !== friend.objectId
                ),
            });
            setEditMode(false);
        } catch (error) {
            console.error(error);
            showMessage('error', `An error occurred: ${error.message}`);
        }
    };
    
    return (
        <>
            <FontAwesomeIcon
                className={styles.deleteIconBtn}
                icon={faTimes}
                onClick={showActionsHandler}
            />
            <div className={styles.actionButtons} onMouseOut={closeMenuHandler}>
                <ul>
                    <li className={styles.actionButton} onClick={onConfirmHandler}>
                        Delete
                    </li>
                </ul>
            </div>
        </>
    );
};
