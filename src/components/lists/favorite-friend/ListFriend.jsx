import styles from './list-friend.module.css'

export const ListFriend = ({ children, onClick, friend }) => {
    //TODO on hover display fullName above avatar
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
    )
}
