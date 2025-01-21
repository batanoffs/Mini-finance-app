import styles from './empty.module.css';

export const Empty = () => {
    return (
        <li key="empty" className="notifications-block border-bottom">
            <small>No notifications</small>
        </li>
    );
};
