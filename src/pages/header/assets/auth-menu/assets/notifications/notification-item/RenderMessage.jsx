import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { NOTIFY } from '../constants';

import styles from './render-message.module.css';

export const RenderMessage = ({ notification }) => {
    const { auth } = useAuthContext();

    // Define variables for notification data
    const senderName = notification.sender?.[0]?.fullName ?? 'Unknown';
    const receiverId = notification?.receiver?.[0]?.objectId ?? null;
    const event = notification.event_type;
    const status = notification.status;
    const seen = notification.seen;
    const avatar = notification.sender?.[0]?.avatar;
    const amount = notification.amount ?? 'Unknown';

    // event === frRequest && receiverId === auth.ownerId && seen === false
    const FriendAccept = <small>{senderName + 'has accepted your friend request'}</small>;

    // event === frRequest && status === pending
    const FriendRequest = (
        <>
            <img className={styles.profileImage} src={avatar} alt="avatar" />
            <small>Friend request from {senderName} </small>
        </>
    );

    // event === cashReceived
    const CashIncome = (
        <small>
            Received <b style={{ color: 'green' }}>{amount}BGN</b> from {senderName}
        </small>
    );

    // event === cashRequest
    const CashRequest = (
        <>
            <img className={styles.profileImage} src={avatar} alt="avatar" />
            <small>
                {senderName} requested <b style={{ color: 'darkred' }}>{amount}BGN</b>
            </small>
        </>
    );

    if (event === NOTIFY.TYPE.frRequest && receiverId === auth.ownerId && seen === false) {
        return FriendAccept;
    }

    if (event === NOTIFY.TYPE.frRequest && status === NOTIFY.STATUS.pending) {
        return FriendRequest;
    }

    if (event === NOTIFY.TYPE.cashReceived) {
        return CashIncome;
    }

    if (event === NOTIFY.TYPE.cashRequest) {
        return CashRequest;
    }

    return <div> Error </div>;
};
