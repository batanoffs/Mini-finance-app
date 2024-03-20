import { notifications } from "../../../../services/notificationService";
import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FriendRequestNotification, FriendAcceptNotification } from "./FriendRequestNotification";
import { IncomeNotification } from "./IncomeNotification";
import { MoneyRequestNotification } from "./MoneyRequestNotification";
import { NotFoundNotifications } from "./NotFound";
import { App } from "antd";
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

    const showMessage = (type, text) => {
        type === "error"
            ? message.error(text)
            : type === "success"
            ? message.success(text)
            : type === "warning"
            ? message.warning(text)
            : type === "info"
            ? message.info(text)
            : message(text);
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

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("bg-BG", {
            hour: "numeric",
            minute: "numeric",
            year: "2-digit",
            month: "numeric",
            day: "numeric",
        }).format(new Date(date));
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
                    notificationsState.map((notify) =>
                        notify?.event_type === "friend request" &&
                        notify?.status === "pending" ? (
                            <FriendRequestNotification
                                formatDate={formatDate}
                                showMessage={showMessage}
                                deleteNotificationHandler={
                                    deleteNotificationHandler
                                }
                                setnotificationsState={setnotificationsState}
                                notify={notify}
                            />
                        ) : notify?.reciver?.[0]?.objectId === userDataId &&
                          notify?.event_type === "friend request" &&
                          notify?.seen === false ? (
                            <FriendAcceptNotification
                                formatDate={formatDate}
                                showMessage={showMessage}
                                deleteNotificationHandler={
                                    deleteNotificationHandler
                                }
                                notify={notify}
                            />
                        ) : notify?.event_type === "money received" ? (
                            <IncomeNotification
                                formatDate={formatDate}
                                notify={notify}
                                deleteNotificationHandler={
                                    deleteNotificationHandler
                                }
                            />
                        ) : notify?.event_type === "money request" ? (
                            <MoneyRequestNotification
                                formatDate={formatDate}
                                showMessage={showMessage}
                                notify={notify}
                            />
                        ) : (
                            <NotFoundNotifications />
                        )
                    )
                ) : (
                    <NotFoundNotifications />
                )}
            </ul>
        </div>
    );
};
