import { notifications } from "../../../../services/notificationService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { dataService } from "../../../../services/userDataService";
import styles from "../site-header.module.css";

export const Notifications = () => {
    const { userDataId } = useContext(AuthContext);
    const [ notificationsState, setnotificationsState] = useState([]);

    useEffect(() => {
        notifications
            .getFriendRequest(userDataId)
            .then((result) => setnotificationsState(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    const acceptHandler = async (e) => {
        const id = e.currentTarget.parentElement.getAttribute("data-key");
        const senderId = e.currentTarget.getAttribute("data-sender");
        await notifications.updateNotification(id, "accepted");
        await notifications.getFriendRequest(userDataId)
        .then((result) => setnotificationsState(result))
        .catch((error) => console.log(error));
     
        
        const setFriend = await dataService.setRelation(userDataId, "friends", [senderId]);
        if (setFriend === 1) {
            window.alert("Успешно добавихте приятел");
        } else {
            window.alert("Вече сте добавили този приятел");
        }
    };

    const rejectHandler = async (e) => {
        const id = e.currentTarget.parentElement.getAttribute("data-key");
        await notifications.updateNotification(id, "declined");
        await notifications.getFriendRequest(userDataId)
        .then((result) => setnotificationsState(result))
        .catch((error) => console.log(error));

        window.alert("Поканата за приятелство е отхвърлена");
    };

    return (
        <div className={styles.dropdownNotifications}>
            <FontAwesomeIcon icon={faBell} className={styles.notificationsIcon} />

            { notificationsState.length > 0 && <span className={styles.notificationDot}/> }

            <ul className={styles.dropdownMenu}>
                {notificationsState.length > 0 ? (
                    notificationsState.map((alert) => (
                        <li key={alert.objectId} data-key={alert.objectId}>
                            <span >
                                {/* TO DO NAME */}
                                Покана за приятелство от {alert.sender[0].fullName}
                            </span>

                            <FontAwesomeIcon
                                data-sender={`${alert.sender[0].objectId}`}
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
                    ))
                ) : (
                    <li className="notifications-block border-bottom">
                        <span>Нямате известия</span>
                    </li>
                )}
            </ul>
        </div>
    );
};


