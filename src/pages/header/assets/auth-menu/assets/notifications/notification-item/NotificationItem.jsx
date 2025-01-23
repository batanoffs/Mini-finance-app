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
    // Destructure notification object
    const date = formatDate(notification.created);
    const event = notification.event_type;
    const senderName = notification.sender?.[0]?.fullName ?? 'Unknown';
    const senderId = notification.sender?.[0]?.objectId ?? null;
    const sender = notification.sender?.[0];
    const notificationId = notification.objectId;
    const cashAmount = notification.amount;

    // Check if notification requires confirmation in order to render the appropriate buttons
    const needToConfirm = event === NOTIFY.TYPE.frRequest || event === NOTIFY.TYPE.cashRequest;

    // Event handlers
    const onAcceptNotification = () => {
        // Check the event type and call the appropriate handler
        if (event === NOTIFY.TYPE.frRequest) return onFriendAccept(notificationId, sender);
        if (event === NOTIFY.TYPE.cashRequest) return onCashApprove(notificationId, senderName, cashAmount);
    };

    const onRejectNotification = () => {
        // Check the event type and call the appropriate handler
        if (event === NOTIFY.TYPE.frRequest) return onFriendReject(notificationId);
        if (event === NOTIFY.TYPE.cashRequest) return onCashDecline(notificationId);
    };

    const onDeleteNotification = () => onDelete(notificationId);

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
