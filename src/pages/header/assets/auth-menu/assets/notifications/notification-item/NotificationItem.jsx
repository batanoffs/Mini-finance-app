import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { RenderMessage } from './RenderMessage';
import { formatDate } from '../../../../../../../utils';
import { NOTIFY } from '../constants';

import styles from './notification-item.module.css';

export const NotificationItem = ({
    notification,
    onDelete,
    onFriendReject,
    onFriendAccept,
    onCashDecline,
    onCashApprove,
}) => {
    if (!notification) return null;
    // Destructure notification object
    const date = formatDate(notification?.created);
    const type = notification?.type;
    const notificationId = notification?.objectId;
    const relatedId = notification?.related_entity_id;
    const relatedName = notification?.related_entity_name;
    const message = notification?.message;

    // Check if notification requires confirmation in order to render the appropriate buttons
    const needToConfirm = type === 'friend-request' || message?.includes('requested');

    // Event handlers
    const onAcceptNotification = () => {
        // Check the event type and call the appropriate handler
        if (type === 'friend-request') return onFriendAccept(notificationId, sender);
        if (type === 'transaction' && message.incudes('requested'))
            return onCashApprove(notificationId, relatedId, relatedName);
    };

    const onRejectNotification = () => {
        // Check the event type and call the appropriate handler
        if (type === 'friend-request') return onFriendReject(notificationId);
        if (type === 'transaction' && message.incudes('requested'))
            return onCashDecline(notificationId);
    };

    // TODO - remove only notifications, events which need actions must not have this option
    const onDeleteNotification = () => {
        onDelete(notificationId);
    };

    return (
        <li
            className={styles.singleNotification}
            key={`${notification.objectId} ${notification.status} ${notification.seen}`}
            data-key={notification.objectId}
        >
            <div className={styles.notificationContent}>
                <RenderMessage notification={notification} />
                <small className={styles.date}>{date}</small>
            </div>

            <div className={styles.btnContainer}>
                {needToConfirm ? (
                    <div className={styles.btnGroup}>
                        <button
                            data-key={notification.objectId}
                            data-sender={senderId}
                            data-requester-name={senderName}
                            className={styles.btnAccept}
                            onClick={onAcceptNotification}
                        >
                            Accept
                        </button>
                        <button
                            data-key={notification.objectId}
                            data-sender={senderId}
                            data-requester-name={senderName}
                            className={styles.btnRemove}
                            onClick={onRejectNotification}
                        >
                            Reject
                        </button>
                    </div>
                ) : (
                    <button
                        data-key={notification.objectId}
                        className={styles.btnRemove}
                        onClick={onDeleteNotification}
                        defaultValue={'Delete'}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                )}
            </div>
        </li>
    );
};
