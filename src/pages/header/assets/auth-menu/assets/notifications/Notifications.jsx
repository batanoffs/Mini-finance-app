import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import { NotificationItem } from './notification-item/NotificationItem';
import { Empty } from './empty-notification/Empty';
import { useNotification } from './useNotification';

import styles from './notifications.module.css';

export const Notifications = () => {
    const {
        notifications,
        onDelete,
        onCashApprove,
        onCashDecline,
        onFriendAccept,
        onFriendReject,
    } = useNotification([]);

    return (
        <div className={styles.dropdownNotifications}>
            {notifications?.length > 0 && <span className={styles.notificationDot} />}

            <FontAwesomeIcon icon={faBell} className={styles.notificationsIcon} />

            <ul className={styles.dropdownMenu}>
                {notifications?.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.objectId}
                            notification={notification}
                            onFriendReject={onFriendReject}
                            onFriendAccept={onFriendAccept}
                            onCashDecline={onCashDecline}
                            onCashApprove={onCashApprove}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </ul>
        </div>
    );
};
