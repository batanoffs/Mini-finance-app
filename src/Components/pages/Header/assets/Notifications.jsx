import { notifications } from "../../../../services/notificationService";
import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Button, Space, App } from 'antd';
import styles from "./notifications.module.css";

export const Notifications = () => {
    const { userDataId, token } = useContext(AuthContext);
    const [notificationsState, setnotificationsState] = useState([]);
    const { message } = App.useApp();

    useEffect(() => {
        notifications
            .getNotifications(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    console.log("all notifys", notificationsState);

    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

    const updateNotifyHandler = async (e) => {
        const id = e.currentTarget.getAttribute("data-key");
        if (!id) {
            console.error("notification id is null");
            return;
        }

        try {
            await notifications.updateSeenStatus(id, true, token);
            const result = await notifications.getNotifications(userDataId);
            setnotificationsState(result);
            showMessage("success", "Успешно изтрито съобщение");
        } catch (error) {
            console.error("error while deleting notification", error);
            showMessage("error", "Грешка при изтриване");
        }
    };

    const acceptHandler = async (e) => {
        const parentElement = e.currentTarget.parentElement.parentElement.parentElement;
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
            await notifications.updateFriendRequestStatus(
                id,
                "accepted",
                true,
                token
            );

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

            console.log(setReceiverFriend, setSenderFriend);
            if (setReceiverFriend === 1 && setSenderFriend === 1) {
                showMessage("success", "Успешно добавихте прител");
            } else {
                showMessage("warning", "Вече сте добавили този приятел");
            }
        } catch (error) {
            
            console.error(
                "Error loading friend request or setting relation",
                { id, senderId },
                error
            );
            showMessage("error", "Грешка при зареждане");
        }
    };

    const rejectHandler = async (e) => {
        const id = e.currentTarget.parentElement.getAttribute("data-key");
        await notifications.updateFriendRequestStatus(id, "declined", token);
        await notifications
            .getNotifications(userDataId, token)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));

        showMessage("error", "Поканата за приятелство е отхвърлена");
    };

    // const receiverCheck = notificationsState.filter(
    //     (notify) =>
    //         notify?.sender?.[0]?.objectId === userDataId &&
    //         notify?.status === "accepted" &&
    //         notify?.event_type === "friend request" &&
    //         notify?.seen === false
    // );
    // console.log("receiverCheck", receiverCheck);

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
                            (notify) =>
                                notify?.event_type === "friend request" ||
                                notify?.event_type === "money received"
                        )
                        .map((notify) =>
                            notify?.event_type === "friend request" &&
                            notify?.status === "pending" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={notify.objectId}
                                    data-key={notify.objectId}
                                >
                                    <img className={styles.profileImage} src={notify.sender?.[0]?.avatar} alt="avatar" />
                                    <small>
                                        Покана за приятелство от{" "}
                                        {notify.sender?.[0]?.fullName ??
                                            "Unknown"}
                                    </small>
                                    <Space>
                                        <Button
                                            data-sender={`${
                                                notify.sender?.[0]?.objectId ??
                                                ""
                                            }`}
                                            type="primary"
                                            className={styles.btnRemove}
                                            onClick={acceptHandler}
                                        >
                                            приеми
                                        </Button>
                                    </Space>
                                    <Space>
                                        <Button
                                            data-sender={`${
                                                notify.sender?.[0]?.objectId ??
                                                ""
                                            }`}
                                            type="primary"
                                            className={styles.btnRemove}
                                            onClick={rejectHandler}
                                        >
                                            откажи
                                        </Button>
                                    </Space>
                                </li>
                            ) : notify?.reciver?.[0]?.objectId === userDataId &&
                              notify?.event_type === "friend request" &&
                              notify?.seen === false ? (
                                <li
                                    className={styles.singleNotification}
                                    key={`${notify.objectId} ${notify.status} ${notify.seen}`}
                                    data-key={notify.objectId}
                                >
                                    <small>
                                        {notify.sender?.[0]?.fullName ??
                                            "Unknown"}{" "}
                                        прие вашата покана
                                    </small>

                                    
                                    <Space>
                                        <Button
                                            data-key={notify.objectId}
                                            className={styles.btnRemove}
                                            onClick={updateNotifyHandler}
                                            type="primary"
                                        >
                                            Изтриване
                                        </Button>
                                    </Space>
                                </li>
                            ) : notify?.event_type === "money received" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={notify.objectId}
                                    data-key={notify.objectId}
                                >
                                    <div>
                                        <small>
                                            Получихте{" "}
                                            <b style={{ color: "green" }}>
                                                {notify.amount ?? "Unknown"}лв
                                            </b>{" "}
                                            от{" "}
                                            {notify.sender?.[0]?.fullName ??
                                                "Unknown"}{" "}
                                        </small>
                                    </div>
                                    
                                    <Space style={{ margin: "auto 0 auto auto" }}>
                                        <Button
                                        type="primary"
                                            data-key={notify.objectId}
                                            className={styles.btnRemove}
                                            onClick={updateNotifyHandler}
                                        >
                                            Изтриване
                                        </Button>
                                    </Space>
                                </li>
                            ) : (
                                <li key="empty" className="notifications-block border-bottom">
                                    <small>Нямате известия</small>
                                </li>
                            )
                        )
                ) : (
                    <li key="empty" className="notifications-block border-bottom">
                        <small>Нямате известия</small>
                    </li>
                )}
            </ul>
        </div>
    );
};
