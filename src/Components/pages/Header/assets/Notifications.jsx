import { notifications } from "../../../../services/notificationService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { dataService } from "../../../../services/userDataService";
import styles from "./notifications.module.css";

export const Notifications = () => {
    const { userDataId, token } = useContext(AuthContext);
    const [notificationsState, setnotificationsState] = useState([]);

    useEffect(() => {
        notifications
            .getNotifications(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    const acceptHandler = async (e) => {
        const parentElement = e.currentTarget.parentElement;
        const id = parentElement && parentElement.getAttribute("data-key");
        const senderId = e.currentTarget.getAttribute("data-sender");

        if (!id || !senderId) {
            console.error("Missing data to accept notification", {
                id,
                senderId,
            });
            return;
        }

        try {
            await notifications.updateNotification(id, "accepted");
            await notifications
                .getNotifications(userDataId)
                .then((result) => setnotificationsState(result))
                .catch((error) => console.log(error));

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

            if (setReceiverFriend === 1 && setSenderFriend === 1) {
                window.alert("Успешно добавихте приятел");
                await notifications.createNotification(
                    null,
                    senderId,
                    "friend accept",
                    userDataId,
                    token
                );
            } else {
                window.alert("Вече сте добавили този приятел");
            }
        } catch (error) {
            console.error(
                "Error while accepting notification",
                { id, senderId },
                error
            );
        }
    };

    const rejectHandler = async (e) => {
        const id = e.currentTarget.parentElement.getAttribute("data-key");
        await notifications.updateNotification(id, "declined");
        await notifications
            .getNotifications(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));

        window.alert("Поканата за приятелство е отхвърлена");
    };

    const okey = async (e) => {
        const notificationElement = e.currentTarget.parentElement;
        if (!notificationElement) {
            console.error("notification element is null");
            return;
        }

        const id = notificationElement.getAttribute("data-key");
        if (!id) {
            console.error("notification id is null");
            return;
        }

        try {
            await notifications.deleteNotification(id);
            const result = await notifications.getNotifications(userDataId);
            setnotificationsState(result);
        } catch (error) {
            console.error("error while deleting notification", error);
        }
    };

    return (
        <div className={styles.dropdownNotifications}>
            <FontAwesomeIcon
                icon={faBell}
                className={styles.notificationsIcon}
            />

            {notificationsState.length > 0 && (
                <span className={styles.notificationDot} />
            )}

            <ul className={styles.dropdownMenu}>
                {notificationsState.length > 0 ? (
                    notificationsState
                        .filter(
                            (alert) =>
                                alert?.event_type === "friend request" ||
                                alert?.event_type === "friend accept" ||
                                alert?.event_type === "money received"
                        )
                        .map((alert) =>
                            alert?.event_type === "friend request" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={alert.objectId}
                                    data-key={alert.objectId}
                                >
                                    <small>
                                        Покана за приятелство от{" "}
                                        {alert.sender?.[0]?.fullName ??
                                            "Unknown"}
                                    </small>

                                    <FontAwesomeIcon
                                        data-sender={`${
                                            alert.sender?.[0]?.objectId ?? ""
                                        }`}
                                        onClick={acceptHandler}
                                        className={`${styles.accept}`}
                                        icon={faCheck}
                                    />

                                    <FontAwesomeIcon
                                        onClick={rejectHandler}
                                        className={styles.reject}
                                        icon={faXmark}
                                    />
                                </li>
                            ) : alert?.event_type === "money received" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={alert.objectId}
                                    data-key={alert.objectId}
                                >
                                    <div>
                                        <small>
                                            Получихте{" "}
                                            <bold style={{ color: "green" }}>
                                                {alert.amount ?? "Unknown"}лв
                                            </bold>{" "}
                                            от{" "}
                                            {alert.sender?.[0]?.fullName ??
                                                "Unknown"}
                                            {" "}
                                        </small>
                                    </div>
                                    <button
                                        onClick={okey}
                                        className={styles.btnRemove}
                                    >
                                        изтриване
                                    </button>
                                </li>
                            ) : alert?.event_type === "friend accept" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={alert.objectId}
                                    data-key={alert.objectId}
                                >
                                    <small>
                                        {alert.sender?.[0]?.fullName ??
                                            "Unknown"}
                                        прие вашата покана
                                    </small>

                                    <small
                                        onClick={okey}
                                        className={styles.remove}
                                    >
                                        изтриване
                                    </small>
                                </li>
                            ) : (
                                <li className="notifications-block border-bottom">
                                    <small>Нямате известия</small>
                                </li>
                            )
                        )
                ) : (
                    <li className="notifications-block border-bottom">
                        <small>Нямате известия</small>
                    </li>
                )}
            </ul>
        </div>
    );
};
