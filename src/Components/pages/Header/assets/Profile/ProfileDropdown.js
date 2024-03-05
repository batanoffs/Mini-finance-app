import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHandshakeAngle, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import styles from "../../site-header.module.css";

export const ProfileDropdown = (props) => {
    
    const [dropMenu, setDropMenu] = useState(false);
    return (
        <div className={styles.dropdownNotifications}>
            <div
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className={styles.dropdownToggle}
            >
                <img
                    src={props.picture}
                    className={styles.profileImage}
                    alt={"happy man"}
                />

                <ul className={styles.dropdownMenu}>
                    <li>
                        <div className={styles.dropdownMenuProfileThumb}>
                            <img
                                src={props.picture}
                                className={styles.profileImage}
                                alt={"happy man"}
                            />
                                <small>{props.name}</small>
                        </div>
                    </li>

                    <li>
                        <Link
                            className={styles.dropdownItem}
                            to="/dashboard/profile"
                        >
                            <FontAwesomeIcon
                                className={styles.sidebarIcons}
                                icon={faAddressCard}
                            />
                            Профил
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={styles.dropdownItem}
                            to="/dashboard/settings"
                        >
                            <FontAwesomeIcon
                                className={styles.sidebarIcons}
                                icon={faGear}
                            />
                            Настройки
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={styles.dropdownItem}
                            to="/dashboard/help-center"
                        >
                            <FontAwesomeIcon
                                className={styles.sidebarIcons}
                                icon={faHandshakeAngle}
                            />
                            Помощен център
                        </Link>
                    </li>

                    <li className="border-top">
                        <Link
                            className={styles.dropdownItem}
                            onClick={props.onLogoutHandler}
                            to=""
                        >
                            <FontAwesomeIcon
                                className={styles.sidebarIcons}
                                icon={faArrowRightFromBracket}
                            />
                            Изход
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}