import { notifications } from "../../../../services/notificationService";
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
        const parentElement =
            e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId =
            parentElement && parentElement.getAttribute("data-key");
        const senderId = e.currentTarget.getAttribute("data-sender");

        if (!notificationId || !senderId) {
            console.error("Missing data to accept notification", {
                id: notificationId,
                senderId,
            });
            return;
        }
        try {
            await notifications.updateFriendRequestStatus(
                notificationId,
                "accepted",
                true,
                token
            );
            const result = await notifications.getNotifications(userDataId);
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
        const parentElement =
            e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId =
            parentElement && parentElement.getAttribute("data-key");
        try {
            await notifications.updateFriendRequestStatus(
                notificationId,
                "declined",
                true,
                token
            );
            const result = await notifications.getNotifications(
                userDataId,
                token
            );
            setnotificationsState(result);
            showMessage("error", "Поканата за приятелство е отхвърлена");
        } catch (error) {
            console.log(error);
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
