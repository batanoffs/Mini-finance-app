import { notifications } from "../../../../../services/notificationService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "../../site-header.module.css";

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

    return (
        <ul
            className={styles.dropdownMenu}
            aria-labelledby="navbarLightDropdownMenuLink"
        >
            {alerts.map((alert) => (
                <li
                    key={alert.objectId}
                    className="notifications-block border-bottom"
                >
                    <Link className={styles.dropdownItem} to="#">
                        <div className="notifications-icon-wrap bg-success">
                            <i className="notifications-icon bi-check-circle-fill"></i>
                        </div>

                        <div>
                            <span>Покана за приятелство от {alert.sender}</span>

                            <button
                                className="button-primary"
                                style={{ backgroundColor: "lightgreen" }}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                                className="button-primary"
                                style={{ backgroundColor: "red" }}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
