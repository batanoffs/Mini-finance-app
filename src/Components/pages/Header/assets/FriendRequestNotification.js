import { notificationService } from "../../../../services/notificationService";
import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import styles from "./notifications.module.css";

export const FriendRequestNotification = ({
    formatDate,
    showMessage,
    notify,
    setnotificationsState,
}) => {
    const { userDataId, token, auth, setAuth } = useContext(AuthContext);

    const acceptFriendHandler = async (e) => {
        const notificationId = e.currentTarget.parentElement.getAttribute("data-key");
        const senderId = e.currentTarget.getAttribute("data-sender");

        if (!notificationId || !senderId) {
            console.error("Missing notification id or sender id", {
                id: notificationId,
                senderId,
            });
            showMessage("error", "Липсва ID");
            return;
        }
        try {
            await notificationService.updateNotificationStatus(
                notificationId,
                "accepted",
                true,
                token
            );
            const result = await notificationService.getNotifications(userDataId);
            setnotificationsState(result);

            const setReceiverFriend = await dataService.setRelation(
                userDataId,
                "friends",
                [senderId]
            );
            const setSenderFriend = await dataService.setRelation(
                senderId,
                "friends",
                [userDataId]
            );
            const getSender = await dataService.getUser(senderId);

            if (setReceiverFriend === 1 && setSenderFriend === 1) {
                setAuth({ ...auth, friends: [...auth.friends, getSender] });
                sessionStorage.setItem(
                    "auth",
                    JSON.stringify({
                        ...auth,
                        friends: [...auth.friends, getSender],
                    })
                );
                showMessage("success", "Успешно добавихте прител");
            } else {
                showMessage("warning", "Вече сте добавили този приятел");
            }
        } catch (error) {
            console.error(
                "Error loading friend request or setting relation",
                { id: notificationId, senderId },
                error
            );
            showMessage("error", error.message);
        }
    };

    const rejectFriendHandler = async (e) => {
        const notificationId = e.currentTarget.parentElement.getAttribute("data-key");

        if (!notificationId) {
            console.error("Missing notification id", notificationId);
            showMessage("error", "Липсва ID");
            return;
        }

        try {
            await notificationService.updateNotificationStatus(
                notificationId,
                "declined",
                true,
                token
            );
            const response = await notificationService.getNotifications(
                userDataId,
                token
            );
            if (response) {
                showMessage("error", "Поканата за приятелство е отхвърлена");
                setnotificationsState(response);
            } else {
                showMessage("error", "Възникна грешка при отхвърляне на покана");
            }
        } catch (error) {
            showMessage("warning", "Възникна грешка при отхвърляне на покана");
            console.error(error);
        }
    };

    return (
        <li
            className={styles.singleNotification}
            key={notify.objectId}
            data-key={notify.objectId}
        >
            <img
                className={styles.profileImage}
                src={notify.sender?.[0]?.avatar}
                alt="avatar"
            />
            <section className={styles.notificationContent}>
                <small>
                    Покана за приятелство от{" "}
                    {notify.sender?.[0]?.fullName ?? "Unknown"}{" "}
                </small>
                <small className={styles.date}>
                    {" "}
                    {formatDate(notify.created)}
                </small>
            </section>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ""}`}
                type="button"
                className={styles.btnAccept}
                onClick={acceptFriendHandler}
            >
                приеми
            </button>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ""}`}
                type="button"
                className={styles.btnRemove}
                onClick={rejectFriendHandler}
            >
                откажи
            </button>
        </li>
    );
};

export const FriendAcceptNotification = ({
    deleteNotificationHandler,
    notify,
    formatDate,
}) => {
    return (
        <li
            className={styles.singleNotification}
            key={`${notify.objectId} ${notify.status} ${notify.seen}`}
            data-key={notify.objectId}
        >
            <section className={styles.notificationContent}>
                <small>
                    {" "}
                    {notify.sender?.[0]?.fullName ?? "Unknown"} прие вашата
                    покана
                </small>
                <small className={styles.date}>
                    {" "}
                    {formatDate(notify.created)}
                </small>
            </section>

            <button
                data-key={notify.objectId}
                className={`${styles.btnRemove} ${styles.btnRemoveRed}`}
                onClick={deleteNotificationHandler}
                type="button"
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </li>
    );
};
