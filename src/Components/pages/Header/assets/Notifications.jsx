import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import { FriendRequestNotification, FriendAcceptNotification } from "./FriendRequestNotification";
import { MoneyRequestNotification } from "./MoneyRequestNotification";
import { IncomeNotification } from "./IncomeNotification";
import { NotFoundNotifications } from "./NotFound";

import { notificationService } from "../../../../services/notificationService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useMessage } from "../../../../hooks/useMessage";

import styles from "./notifications.module.css";

export const Notifications = () => {
    const { userDataId, token } = useContext(AuthContext);
    const [notificationsState, setnotificationsState] = useState([]);
    const showMessage = useMessage();

    useEffect(() => {
        notificationService
            .getNotSeenNotifications(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    const deleteNotificationHandler = async (e) => {
        const notificationId = e.currentTarget.getAttribute("data-key");
        if (!notificationId) {
            throw new Error("Notification id is null");
        }
        try {
            await notificationService.updateSeenStatus(notificationId, true, token);
            const result = await notificationService.getNotSeenNotifications(userDataId);
            setnotificationsState(result);
            showMessage("success", "Успешно изтрито съобщение");
        } catch (error) {
            console.error("error while deleting notification", error);
            showMessage("error", error.message);
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
                    notificationsState.map((notify) =>
                        notify?.event_type === "friend request" &&
                        notify?.status === "pending" ? (
                            <FriendRequestNotification
                                deleteNotificationHandler={
                                    deleteNotificationHandler
                                }
                                setnotificationsState={setnotificationsState}
                                notify={notify}
                                key={notify.objectId}
                            />
                        ) : notify?.reciver?.[0]?.objectId === userDataId &&
                          notify?.event_type === "friend request" &&
                          notify?.seen === false ? (
                            <FriendAcceptNotification
                                deleteNotificationHandler={
                                    deleteNotificationHandler
                                }
                                notify={notify}
                                key={notify.objectId}
                            />
                        ) : notify?.event_type === "money received" ? (
                            <IncomeNotification
                                notify={notify}
                                deleteNotificationHandler={
                                    deleteNotificationHandler
                                }
                                key={notify.objectId}
                            />
                        ) : notify?.event_type === "money request" ? (
                            <MoneyRequestNotification
                                notify={notify}
                                userDataId={userDataId}
                                token={token}
                                setnotificationsState={setnotificationsState}
                                key={notify.objectId}
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
