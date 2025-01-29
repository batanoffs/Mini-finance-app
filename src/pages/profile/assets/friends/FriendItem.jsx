import { faMoneyBill, faPiggyBank, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import styles from './friend-item.module.css';

export const FriendItem = ({ friend, onRemoveFriend }) => {
    const handleRemoveFriend = () => {
        onRemoveFriend(friend.objectId);
    };

    const formatPhoneNumber = (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };
    
    return (
        <li className={styles.entryWrapper}>
            <img 
                src={friend.avatar} 
                className={styles.profileImage} 
                alt={`${friend.fullName}'s avatar`}
            />

            <div className={styles.friendInfo}>
                <strong>{friend.fullName}</strong>
                <p>{friend.country}</p>
                <a 
                    href={`tel:${friend.phoneNumber}`}
                    aria-label={`Call ${friend.fullName} at ${formatPhoneNumber(friend.phoneNumber)}`}
                >
                    {formatPhoneNumber(friend.phoneNumber)}
                </a>
            </div>

            <div className={styles.friendButtons} role="group" aria-label="Friend actions">
                <button 
                    type="button"
                    className={styles.friendButton} 
                    aria-label={`Request money from ${friend.fullName}`}
                    data-text="Request money"
                >
                    <FontAwesomeIcon className={styles.icon} icon={faMoneyBill} aria-hidden="true" />
                </button>
                <button 
                    type="button"
                    className={styles.friendButton} 
                    aria-label={`Send money to ${friend.fullName}`}
                    data-text="Send money"
                >
                    <FontAwesomeIcon className={styles.icon} icon={faPiggyBank} aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className={styles.friendButton}
                    aria-label={`Remove ${friend.fullName} from friends`}
                    data-text="Remove friend"
                    onClick={handleRemoveFriend}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faTrashAlt} aria-hidden="true" />
                </button>
            </div>
        </li>
    );
};

FriendItem.propTypes = {
    friend: PropTypes.shape({
        objectId: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }).isRequired,
    onRemoveFriend: PropTypes.func.isRequired
};
