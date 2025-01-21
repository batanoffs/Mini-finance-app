import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { RenderMessage } from './RenderMessage';
import { formatDate } from '../../../../../../utils';
import { NOTIFY } from '../constants';

import styles from './notification.module.css';

export const NotificationItem = ({
    notification,
    onDelete,
    ownerId,
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

    // Check if notification requires confirmation in order to render the appropriate buttons
    const needToConfirm = event === NOTIFY.TYPE.frRequest || event === NOTIFY.TYPE.cashRequest;

    // Event handlers
    const acceptHandler = (e) => {
        console.log('Accepting friend request');

        if (event === NOTIFY.TYPE.frRequest) {
            onFriendAccept(e);
        } else if (event === NOTIFY.TYPE.cashRequest) {
            onCashApprove(e);
        }
    };

    const rejectHandler = (e) => {
        console.log('Rejecting friend request');

        if (event === NOTIFY.TYPE.frRequest) {
            onFriendReject(e);
        } else if (event === NOTIFY.TYPE.cashRequest) {
            onCashDecline(e);
        }
    };

    return (
        <li
            className={styles.singleNotification}
            key={`${notification.objectId} ${notification.status} ${notification.seen}`}
            data-key={notification.objectId}
        >
            <div className={styles.notificationContent}>
                <RenderMessage styles={styles} notification={notification} ownerId={ownerId} />
                <small className={styles.date}>{date}</small>
            </div>

            {needToConfirm ? (
                <>
                    <button
                        data-sender={senderId}
                        data-requester-name={senderName}
                        className={styles.btnAccept}
                        onClick={acceptHandler}
                        value={'Accept'}
                    />
                    <button
                        data-sender={senderId}
                        data-requester-name={senderName}
                        className={styles.btnRemove}
                        onClick={rejectHandler}
                        value={'Reject'}
                    />
                </>
            ) : (
                <button
                    data-key={notification.objectId}
                    className={styles.btnRemove}
                    onClick={onDelete}
                    defaultValue={'Delete'}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            )}
        </li>
    );
};
