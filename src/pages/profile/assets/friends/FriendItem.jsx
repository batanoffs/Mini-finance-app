import { faMoneyBill, faPiggyBank, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './friend-item.module.css';
import { ButtonTooltip } from '../../../../components/buttons';

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
                    aria-label={`Call ${friend.fullName} at ${formatPhoneNumber(
                        friend.phoneNumber
                    )}`}
                >
                    {formatPhoneNumber(friend.phoneNumber)}
                </a>
            </div>

            <div className={styles.friendButtons} role="group" aria-label="Friend actions">
                <ButtonTooltip
                    size='small'
                    type="request"
                    text="Request money"
                    icon={faMoneyBill}
                    onClick={() => {}}
                />
                <ButtonTooltip
                    size='small'
                    type="send"
                    text="Send money"
                    icon={faPiggyBank}
                    onClick={() => {}}
                />
                <ButtonTooltip
                    size='small'
                    text="Remove friend"
                    icon={faTrashAlt}
                    onClick={handleRemoveFriend}
                />
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
        phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveFriend: PropTypes.func.isRequired,
};
