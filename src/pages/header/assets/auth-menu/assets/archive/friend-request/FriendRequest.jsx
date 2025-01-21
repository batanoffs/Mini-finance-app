import { useContext } from 'react';

import { notificationService, dataService } from '../../../../../../../services';
import { AuthContext } from '../../../../../../../contexts/AuthContext';
import { formatDate, getUserToken } from '../../../../../../../utils';
import { useMessage } from '../../../../../../../hooks';
import { NOTIFY } from '../../constants';

import styles from './friend-request.module.css';

export const FriendRequest = ({ notify, setNotificationsState }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const { token } = getUserToken();
    const showMessage = useMessage();

    // Handler to accept friend request
    const acceptFriendHandler = async (e) => {
        const notificationId = e.currentTarget.parentElement.getAttribute('data-key');

        const senderId = e.currentTarget.getAttribute('data-sender');

        if (!notificationId || !senderId) {
            console.error('Missing notification id or sender id', {
                id: notificationId,
                senderId,
            });
            showMessage('error', 'ID is missing');
            return;
        }

        try {
            await notificationService.updateNotificationStatus(
                notificationId,
                NOTIFY.STATUS.accept,
                true,
                token
            );

            const result = await notificationService.getNotSeenNotifications(auth.objectId);

            setNotificationsState(result);

            const setReceiverFriend = await dataService.setRelation(auth.objectId, 'friends', [
                senderId,
            ]);

            const setSenderFriend = await dataService.setRelation(senderId, 'friends', [
                auth.objectId,
            ]);

            const getSender = await dataService.getUser(senderId);

            if (setReceiverFriend === 1 && setSenderFriend === 1) {
                setAuth({ ...auth, friends: [...auth.friends, getSender] });

                sessionStorage.setItem(
                    'auth',
                    JSON.stringify({
                        ...auth,
                        friends: [...auth.friends, getSender],
                    })
                );

                showMessage('success', 'You have successfully added a friend');
            } else {
                showMessage('warning', 'You have already added this friend');
            }
        } catch (error) {
            console.error(
                'Error loading friend request or setting relation',
                { id: notificationId, senderId },
                error
            );
            showMessage('error', error.message);
        }
    };

    // Handler to reject friend request
    const rejectFriendHandler = async (e) => {
        const notificationId = e.currentTarget.parentElement.getAttribute('data-key');

        if (!notificationId) {
            console.error('Missing notification id', notificationId);
            showMessage('error', 'ID is missing');
            return;
        }

        try {
            await notificationService.updateNotificationStatus(
                notificationId,
                NOTIFY.STATUS.decline,
                true,
                token
            );

            const response = await notificationService.getNotSeenNotifications(
                auth.objectId,
                token
            );

            if (response) {
                showMessage('error', 'The friend request has been declined');
                setNotificationsState(response);
            } else {
                showMessage('error', 'An error occurred while declining the request');
            }
        } catch (error) {
            showMessage('warning', 'An error occurred while declining the request');
            console.error(error);
        }
    };

    return (
        <li className={styles.singleNotification} key={notify.objectId} data-key={notify.objectId}>
            <img className={styles.profileImage} src={notify.sender?.[0]?.avatar} alt="avatar" />
            <section className={styles.notificationContent}>
                <small>Friend request from {notify.sender?.[0]?.fullName ?? 'Unknown'} </small>
                <small className={styles.date}> {formatDate(notify.created)}</small>
            </section>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ''}`}
                type="button"
                className={styles.btnAccept}
                onClick={acceptFriendHandler}
            >
                accept
            </button>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ''}`}
                type="button"
                className={styles.btnRemove}
                onClick={rejectFriendHandler}
            >
                reject
            </button>
        </li>
    );
};
