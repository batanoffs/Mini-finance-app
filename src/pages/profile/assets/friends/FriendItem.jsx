import { faMoneyBill, faPiggyBank, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './friends.module.css';

export const FriendItem = ({ friends, onRemoveFriend }) => {
    
    const friendRemoveHandler = (e) => {
        onRemoveFriend(e);
    };

    return friends.map((friend) => (
        <li key={friend.objectId} data-key={friend.objectId} className={styles.entryWrapper}>
            <img src={friend.avatar} className={styles.profileImage} alt="friend avatar" />

            <div className={styles.friendInfo}>
                <strong>{friend.fullName}</strong>
                <p>{friend.country}</p>
                <a href={`tel:${friend.phoneNumber}`}>{friend.phoneNumber}</a>
            </div>

            <div className={styles.friendButtons}>
                <button className={styles.friendButton} data-text="Request money">
                    <FontAwesomeIcon className={styles.icon} icon={faMoneyBill} />
                </button>
                <button className={styles.friendButton} data-text="Send money">
                    <FontAwesomeIcon className={styles.icon} icon={faPiggyBank} />
                </button>
                <button
                    className={styles.friendButton}
                    data-text="Remove friend"
                    onClick={friendRemoveHandler}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faTrashAlt} />
                </button>
            </div>
        </li>
    ));
};
