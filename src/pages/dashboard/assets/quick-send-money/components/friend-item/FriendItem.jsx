import styles from './friend-item.module.css';

export const FriendItem = ({ children, onClick, friend }) => {
    //TODO on hover display fullName above avatar
    if (!friend) return null;
    
    return (
        <li className={styles.list} key={friend.objectId} data-key={friend.fullName}>
            <img
                src={friend.avatar}
                className={styles.avatar}
                data-key={friend.fullName}
                alt={'avatar'}
                onClick={onClick}
            />
            {children}
        </li>
    );
};
