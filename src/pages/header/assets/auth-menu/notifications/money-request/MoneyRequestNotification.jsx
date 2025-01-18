import { transactionService, notificationService } from '../../../../../../services';
import { useMessage } from '../../../../../../hooks';
import { formatDate } from '../../../../../../utils';

import styles from './MoneyRequestNotification.module.css';

export const MoneyRequestNotification = ({ notify, userDataId, token, setNotificationsState }) => {
    const showMessage = useMessage();
    
    const onTransactionApprove = async (e) => {
        const notificationElement = e.currentTarget.parentElement;
        if (!notificationElement) {
            showMessage('error', 'An error occurred while sending');
            return;
        }
        const notificationId = notificationElement.getAttribute('data-key');
        if (!notificationId) {
            showMessage('error', 'An error occurred while sending');
            return;
        }
        const requesterName = e.currentTarget.getAttribute('data-requester-name');
        if (!requesterName) {
            showMessage('error', 'An error occurred while sending');
            return;
        }
        const amountStr = e.currentTarget.getAttribute('data-amount');
        if (!amountStr) {
            showMessage('error', 'An error occurred while sending');
            return;
        }
        const amount = Number(amountStr);
        if (isNaN(amount)) {
            showMessage('error', 'An error occurred while sending');
            return;
        }
        try {
            const response = await transactionService.sendMoney(
                requesterName,
                amount,
                userDataId,
                token
            );
            if (response.success) {
                await notificationService.updateNotificationStatus(
                    notificationId,
                    'accepted',
                    true,
                    token
                );
                await notificationService.updateSeenStatus(notificationId, true, token);
                const getNotificationsResponse = await notificationService.getNotSeenNotifications(
                    userDataId
                );
                await transactionService.notifyMoneyReceived(
                    requesterName,
                    amount,
                    userDataId,
                    token
                ); // make new notification for transaction approved
                setNotificationsState(getNotificationsResponse);
                showMessage('success', 'The transaction was successful');
            }
        } catch (error) {
            console.error(error);
            showMessage('error', 'An error occurred while sending');
        }
    };

    const onTransactionDecline = async (e) => {
        const notificationId = e.currentTarget.parentElement?.getAttribute('data-key');
        if (!notificationId) {
            console.error('Notification id is null');
            showMessage('error', 'An error occurred while sending');
            return;
        }

        try {
            await notificationService.updateNotificationStatus(
                notificationId,
                'declined',
                true,
                token
            );
            const getNotificationsResponse = await notificationService.getNotSeenNotifications(
                userDataId
            );

            setNotificationsState(getNotificationsResponse);
            showMessage('error', 'The transaction was declined');
        } catch (error) {
            console.error(error);
            showMessage('error', 'An error occurred while sending');
        }
    };

    return (
        <li className={styles.singleNotification} key={notify.objectId} data-key={notify.objectId}>
            <img className={styles.profileImage} src={notify.sender?.[0]?.avatar} alt="avatar" />
            <section className={styles.notificationContent}>
                <small>
                    {notify.sender?.[0]?.fullName ?? 'Unknown'} requested{' '}
                    <b style={{ color: 'darkred' }}>{notify.amount ?? 'Unknown'}BGN</b>
                </small>
                <small className={styles.date}> {formatDate(notify.created)}</small>
            </section>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ''}`}
                data-requester-name={notify.sender?.[0]?.fullName ?? 'Unknown'}
                data-amount={notify.amount ?? 'Unknown'}
                className={styles.btnAccept}
                onClick={onTransactionApprove}
            >
                send
            </button>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ''}`}
                data-requester-name={notify.sender?.[0]?.fullName ?? 'Unknown'}
                className={styles.btnRemove}
                onClick={onTransactionDecline}
            >
                decline
            </button>
        </li>
    );
};
