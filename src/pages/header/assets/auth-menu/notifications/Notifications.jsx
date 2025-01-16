import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import { AuthContext } from '../../../../../contexts/AuthContext';
import { useMessage } from '../../../../../hooks/useMessage';
import { notificationService } from '../../../../../services/notificationService';
import { NOTIFY_TYPE, NOTIFY_STATUS } from './constants';
import {
    MoneyRequestNotification,
    IncomeNotification,
    NotFoundNotifications,
    FriendAcceptNotification,
    FriendRequestNotification,
} from './index';

import styles from './notifications.module.css';

export const Notifications = () => {
    const { auth, token } = useContext(AuthContext);
    const [notificationsState, setNotificationsState] = useState([]);
    const showMessage = useMessage();

    useEffect(() => {
        notificationService
            .getNotSeenNotifications(auth.ownerId)
            .then((result) => setNotificationsState(result))
            .catch((error) => console.log(error));
    }, [auth.ownerId]);

    const deleteNotificationHandler = async (e) => {
        const notificationId = e.currentTarget.getAttribute('data-key');
        if (!notificationId) {
            throw new Error('Notification id is null');
        }
        try {
            await notificationService.updateSeenStatus(notificationId, true, token);
            const result = await notificationService.getNotSeenNotifications(auth.ownerId);
            setNotificationsState(result);
            showMessage('success', 'Successfully deleted message');
        } catch (error) {
            console.error('Error while deleting notification', error);
            showMessage('error', error.message);
        }
    };

    return (
        <div className={styles.dropdownNotifications}>
            <FontAwesomeIcon icon={faBell} className={styles.notificationsIcon} />

            {notificationsState.length > 0 && <span className={styles.notificationDot} />}

            <ul className={styles.dropdownMenu}>
                {notificationsState.length > 0 ? (
                    notificationsState.map((notify) =>
                        notify?.event_type === NOTIFY_TYPE.FRIEND_REQUEST &&
                        notify?.status === NOTIFY_STATUS.PENDING ? (
                            <FriendRequestNotification
                                deleteNotificationHandler={deleteNotificationHandler}
                                setNotificationsState={setNotificationsState}
                                notify={notify}
                                key={notify.objectId}
                            />
                        ) : notify?.reciver?.[0]?.objectId === auth.ownerId &&
                          notify?.event_type === NOTIFY_TYPE.FRIEND_REQUEST &&
                          notify?.seen === false ? (
                            <FriendAcceptNotification
                                deleteNotificationHandler={deleteNotificationHandler}
                                notify={notify}
                                key={notify.objectId}
                            />
                        ) : notify?.event_type === NOTIFY_TYPE.MONEY_RECEIVED ? (
                            <IncomeNotification
                                notify={notify}
                                deleteNotificationHandler={deleteNotificationHandler}
                                key={notify.objectId}
                            />
                        ) : notify?.event_type === NOTIFY_TYPE.MONEY_REQUEST ? (
                            <MoneyRequestNotification
                                notify={notify}
                                userDataId={auth.ownerId}
                                token={token}
                                setNotificationsState={setNotificationsState}
                                key={notify.objectId}
                            />
                        ) : (
                            <NotFoundNotifications />
                        )
                    )
                ) : (
                    <NotFoundNotifications />
                )}
            </ul>
        </div>
    );
};
