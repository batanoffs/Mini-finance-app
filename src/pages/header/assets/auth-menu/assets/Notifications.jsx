import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import { NotificationItem } from './notification-item/NotificationItem';
import { Empty } from './empty-notification/Empty';
import { AuthContext } from '../../../../../contexts/AuthContext';
import { notificationService } from '../../../../../services';
import { useNotification } from './useNotification';
import { getUserToken } from '../../../../../utils';

import styles from './notifications.module.css';

export const Notifications = () => {
    const { auth } = useContext(AuthContext);
    const { token } = getUserToken();
    const {
        notifications,
        setNotifications,
        onDelete,
        onCashApprove,
        onCashDecline,
        onFriendAccept,
        onFriendReject,
    } = useNotification(auth, []);

    useEffect(() => {
        notificationService
            .getNotSeenNotifications(auth.ownerId, token)
            .then((result) => setNotifications(result))
            .catch((error) => console.log(error));
    }, []);

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
                            ownerId={auth.ownerId}
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
