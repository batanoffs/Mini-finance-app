import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { RenderMessage } from './RenderMessage';
import { formatDate } from '../../../../../../../utils';
import { NOTIFICATION } from '../constants';

import styles from './notification-item.module.css';

export const NotificationItem = ({
    notification,
    onDelete,
    onFriendReject,
    onFriendAccept,
    onCashDecline,
    onCashApprove,
}) => {
    // Validate notification object
    if (!notification) return null;

    // Destructure notification object
    const {
        message,
        related_entity_id,
        related_entity_name,
        userId,
        created,
        type,
        is_seen,
        objectId,
    } = notification;

    // Validate props
    if (
        (!message,
        !related_entity_id,
        !related_entity_name,
        !userId,
        !created,
        !type,
        !is_seen,
        !objectId)
    )
        return null;

    // Define more understandable variables
    const eventId = related_entity_id;
    const eventType = related_entity_name;
    const notificationId = objectId;
    const isEvent = {
        friendRequest: type === NOTIFICATION.TYPE.FRIEND_REQUEST,
        moneyRequest: type === NOTIFICATION.TYPE.TRANSACTION && message?.includes('requested'),
    };

    // Check if notification requires confirmation in order to render the appropriate buttons
    const needToConfirm = isEvent.friendRequest || isEvent.moneyRequest;

    // Handlers for user confirmation
    const onAcceptNotification = () => {
        // TODO: fix issues with sender variable not defined
        if (isEvent.friendRequest) return onFriendAccept(notificationId, eventId, eventType);
        if (isEvent.moneyRequest) return onCashApprove(notificationId, eventId, eventType);
    };

    // Handlers for user rejection
    const onRejectNotification = () => {
        if (isEvent.friendRequest) return onFriendReject(notificationId);
        if (isEvent.moneyRequest) return onCashDecline(notificationId);
    };

    // TODO - remove only notifications, events which need actions must not have this option
    const onDeleteNotification = () => {
        onDelete(notificationId);
    };

    return (
        <li className={styles.singleNotification} key={`${notificationId} ${is_seen}`}>
            <div className={styles.notificationContent}>
                <small>{message}</small>
                <small className={styles.date}>{formatDate(created)}</small>
            </div>

            <div className={styles.btnContainer}>
                {needToConfirm ? (
                    <div className={styles.btnGroup}>
                        <button className={styles.btnAccept} onClick={onAcceptNotification}>
                            Accept
                        </button>
                        <button className={styles.btnRemove} onClick={onRejectNotification}>
                            Reject
                        </button>
                    </div>
                ) : (
                    <button
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
