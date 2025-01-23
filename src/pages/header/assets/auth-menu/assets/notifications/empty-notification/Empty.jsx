import styles from './empty.module.css';

//todo update empty color p
export const Empty = () => {
    return (
        <li key="empty" className="notifications-block border-bottom">
            <p>No notifications found.</p>
        </li>
    );
};
