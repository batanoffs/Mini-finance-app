import { notifications } from "../../../../services/notificationService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { dataService } from "../../../../services/userDataService";
import { Button, message, Space } from "antd";
import styles from "./notifications.module.css";

export const Notifications = () => {
    const { userDataId, token } = useContext(AuthContext);
    const [notificationsState, setnotificationsState] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        notifications
            .getNotifications(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    console.log(notificationsState);

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
            messageApi.open({
                type: "success",
                content: "Нотификацията е изтрита!",
            });
        } catch (error) {
            console.error("error while deleting notification", error);
            messageApi.open({
                type: "error",
                content: "Грешка при изтриване.",
            });
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
            await notifications.updateFriendRequestStatus(id, "accepted", token);
            await notifications
                .getNotifications(userDataId)
                .then((result) => setnotificationsState(result))
                .catch((error) => console.log(error));

            const setReceiverFriend = await dataService.setRelation(
                userDataId,
                "friends",
                [senderId],
            );
            const setSenderFriend = await dataService.setRelation(
                senderId,
                "friends",
                [userDataId],
            );

            console.log(setReceiverFriend, setSenderFriend);
            if (setReceiverFriend === 1 && setSenderFriend === 1) {
                messageApi.open({
                    type: "success",
                    content: "Успешно добавихте прител",
                });
            } else {                
                messageApi.open({
                    type: "warning",
                    content: "Вече сте добавили този приятел",
                });
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
        await notifications.updateFriendRequestStatus(id, "declined",token);
        await notifications
            .getNotifications(userDataId, token)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));

        window.alert("Поканата за приятелство е отхвърлена");
    };

    const receiverCheck = notificationsState.filter((notify) => notify?.sender?.[0]?.objectId === userDataId && notify?.status === "accepted" && notify?.event_type === "friend request" && notify?.seen === false);
    console.log("receiverCheck", receiverCheck);

    return (
        <div className={styles.dropdownNotifications}>
            <FontAwesomeIcon
                icon={faBell}
                className={styles.notificationsIcon}
            />

            {notificationsState.length > 0 && (
                <span className={styles.notificationDot} />
            )}
            {receiverCheck.length > 0 && (
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
                                    <small>
                                        Покана за приятелство от{" "}
                                        {notify.sender?.[0]?.fullName ??
                                            "Unknown"}
                                    </small>
                                    <Space>
                                        <Button
                                            data-sender={`${notify.sender?.[0]?.objectId ?? ""}`}
                                            type="submit"
                                            className={styles.btnRemove}
                                            onClick={acceptHandler}
                                        >
                                            приеми
                                        </Button>
                                    </Space>
                                    <Space>
                                        <Button
                                            data-sender={`${notify.sender?.[0]?.objectId ?? ""}`}
                                            type="submit"
                                            className={styles.btnRemove}
                                            onClick={rejectHandler}
                                        >
                                            откажи
                                        </Button>
                                    </Space>
                                </li>
                            ) : notify?.reciver?.[0]?.objectId === userDataId && notify?.event_type === "friend request" &&
                              notify?.seen === false ? (
                                <li
                                    className={styles.singleNotification}
                                    key={`${notify.objectId} ${notify.status} ${notify.seen}`}
                                    data-key={notify.objectId}
                                >
                                    <small>
                                        {notify.sender?.[0]?.fullName ??
                                            "Unknown"}
                                        {" "}прие вашата покана
                                    </small>

                                    {contextHolder}
                                    <Space>
                                        <Button
                                            data-key={notify.objectId}
                                            className={styles.btnRemove}
                                            onClick={updateNotifyHandler}
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
                                            <bold style={{ color: "green" }}>
                                                {notify.amount ?? "Unknown"}лв
                                            </bold>{" "}
                                            от{" "}
                                            {notify.sender?.[0]?.fullName ??
                                                "Unknown"}{" "}
                                        </small>
                                    </div>
                                    {contextHolder}
                                    <Space>
                                        <Button
                                            data-key={notify.objectId}
                                            className={styles.btnRemove}
                                            onClick={updateNotifyHandler}
                                        >
                                            Изтриване
                                        </Button>
                                    </Space>
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

