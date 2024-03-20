import { notifications } from "../../../../services/notificationService";
import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Button, App } from 'antd';
import styles from "./notifications.module.css";

export const Notifications = () => {
    const { userDataId, token, auth, setAuth } = useContext(AuthContext);
    const [notificationsState, setnotificationsState] = useState([]);
    const { message } = App.useApp();

    useEffect(() => {
        notifications
            .getNotifications(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

        console.table(notificationsState);
    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

    const deleteNotificationHandler = async (e) => {
        const notificationId = e.currentTarget.getAttribute("data-key");
        if (!notificationId) {
            throw new Error("Notification id is null");
        }
        try {
            await notifications.updateSeenStatus(notificationId, true, token);
            const result = await notifications.getNotifications(userDataId);
            setnotificationsState(result);
            showMessage("success", "Успешно изтрито съобщение");
        } catch (error) {
            console.error("error while deleting notification", error);
            showMessage("error", error.message);
        }
    };

    const acceptHandler = async (e) => {
        const parentElement = e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId = parentElement && parentElement.getAttribute("data-key");
        const senderId = e.currentTarget.getAttribute("data-sender");

        if (!notificationId || !senderId) {
            console.error("Missing data to accept notification", { id: notificationId, senderId});
            return;
        }
        try {
            await notifications.updateFriendRequestStatus(notificationId, "accepted", true, token);
            const result = await notifications.getNotifications(userDataId);
            setnotificationsState(result);

            const setReceiverFriend = await dataService.setRelation(userDataId, "friends", [senderId]);
            const setSenderFriend = await dataService.setRelation(senderId, "friends", [userDataId]);
            const getSender = await dataService.getUser(senderId);
            
            if (setReceiverFriend === 1 && setSenderFriend === 1) {
                setAuth({...auth, friends: [...auth.friends, getSender]});
                sessionStorage.setItem("auth", JSON.stringify({ ...auth, friends: [...auth.friends, getSender] }));
                showMessage("success", "Успешно добавихте прител");
            } else {
                showMessage("warning", "Вече сте добавили този приятел");
            }
        } catch (error) {
            console.error("Error loading friend request or setting relation",{ id: notificationId, senderId }, error);
            showMessage("error", error.message);
        }
    };

    const rejectHandler = async (e) => {
        const parentElement = e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId = parentElement && parentElement.getAttribute("data-key");
        try {
            await notifications.updateFriendRequestStatus(notificationId, "declined", true, token);
            const result = await notifications.getNotifications(userDataId, token);
            setnotificationsState(result);
            showMessage("error", "Поканата за приятелство е отхвърлена");
        } catch (error) {
            console.log(error);
        }
    };

    const onTransactionApprove = async (e) => {
        const parentElement = e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId = parentElement && parentElement.getAttribute("data-key");
        try {
            //TODO
            console.log("Transaction approved!");

        } catch (error) {
            console.log(error);
        }
    };

    const onTransactionDecline = async (e) => {
        const parentElement = e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId = parentElement && parentElement.getAttribute("data-key");
        try {
            //TODO
            console.log("Transaction declined!");

        } catch (error) {
            console.log(error);
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
                        .map((notify) =>
                            notify?.event_type === "friend request" &&
                            notify?.status === "pending" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={notify.objectId}
                                    data-key={notify.objectId}
                                >
                                    <img className={styles.profileImage} src={notify.sender?.[0]?.avatar} alt="avatar" />
                                    <small> Покана за приятелство от{" "}{notify.sender?.[0]?.fullName ?? "Unknown"} </small>
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
                                </li>
                            ) : notify?.reciver?.[0]?.objectId === userDataId &&
                              notify?.event_type === "friend request" &&
                              notify?.seen === false ? (
                                <li
                                    className={styles.singleNotification}
                                    key={`${notify.objectId} ${notify.status} ${notify.seen}`}
                                    data-key={notify.objectId}
                                >
                                    <small> {notify.sender?.[0]?.fullName ?? "Unknown"}{" "}прие вашата покана</small>
                                    <Button
                                        data-key={notify.objectId}
                                        className={styles.btnRemove}
                                        onClick={deleteNotificationHandler}
                                        type="primary"
                                    >
                                        изтриване
                                    </Button>
                                </li>
                            ) : notify?.event_type === "money received" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={notify.objectId}
                                    data-key={notify.objectId}
                                >
                                    <div>
                                        <small>Получихте{" "}
                                            <b style={{ color: "green" }}>
                                                {notify.amount ?? "Unknown"}лв
                                            </b>{" "}
                                            от{" "} {notify.sender?.[0]?.fullName ?? "Unknown"}
                                        </small>
                                    </div>
                                    <Button
                                        type="primary"
                                        data-key={notify.objectId}
                                        className={styles.btnRemove}
                                        onClick={deleteNotificationHandler}
                                    >
                                        изтриване
                                    </Button>
                                </li>
                            ) : notify?.event_type === "money request" ? (
                                <li
                                    className={styles.singleNotification}
                                    key={notify.objectId}
                                    data-key={notify.objectId}
                                >
                                    <img className={styles.profileImage} src={notify.sender?.[0]?.avatar} alt="avatar" />
                                    <small>{notify.sender?.[0]?.fullName ?? "Unknown"} {" "}поиска {" "}
                                        <b style={{ color: "darkred" }}>
                                            {notify.amount ?? "Unknown"}лв
                                        </b>{" "}от Вас
                                    </small>
                                    <Button
                                        data-sender={`${
                                            notify.sender?.[0]?.objectId ??
                                            ""
                                        }`}
                                        type="primary"
                                        className={styles.btnRemove}
                                        onClick={onTransactionApprove}
                                    >
                                        изпрати
                                    </Button>
                                    <Button
                                        data-sender={`${ notify.sender?.[0]?.objectId ?? "" }`}
                                        type="primary"
                                        className={styles.btnRemove}
                                        onClick={onTransactionDecline}
                                    >
                                        откажи
                                    </Button>
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
