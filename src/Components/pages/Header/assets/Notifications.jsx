import { notifications } from "../../../../services/notificationService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import styles from "../site-header.module.css";

export const Notifications = () => {
    const { userDataId } = useContext(AuthContext);
    const [alerts, setAlerts] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!hasLoaded) {
            notifications
                .getFriendRequest(userDataId)
                .then((result) => {
                    setAlerts(result);
                    setHasLoaded(true);
                    console.log(userDataId);
                })
                .catch((error) => console.log(error));
        }
    }, [hasLoaded, userDataId]);

    const acceptHandler = async () => {
        //TO DO

        // const response = await notifications.updateNotification();
        console.log("accepted");
        console.log(userDataId);
    };

    const rejectHandler = () => {
        //TO DO
        console.log("rejected");
    };

    return (
        <div className={styles.dropdownNotifications}>
            <FontAwesomeIcon icon={faBell} className={styles.notificationsIcon} />

            { alerts.length > 0 && <span className={styles.notificationDot}/> }

            <ul className={styles.dropdownMenu}>
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <li key={alert.objectId}>
                            <span>
                                {/* TO DO NAME */}
                                Покана за приятелство от Иво Киров{" "}
                            </span>

                            <FontAwesomeIcon
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
