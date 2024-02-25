// To do: Add Search and Social Icons to data base
// import search from "../../images/social/search.png";
// import spotify from "../../images/social/spotify.png";
// import telegram from "../../images/social/telegram.png";
// import snapchat from "../../images/social/snapchat.png";
// import tiktok from "../../images/social/tiktok.png";
// import youtube from "../../images/social/youtube.png";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faGear, faHandshakeAngle, faArrowRightFromBracket,faBars } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";

import logo from "../../../images/logo/logo4.svg";
import styles from "./site-header.module.css";

export const Header = () => {
    const { isAuthenticated, picture, onLogoutHandler, name } = useContext(AuthContext);
    const navigate = useNavigate();

    const onRedirect = () => {
        if (isAuthenticated()) {
            navigate("/dashboard/overview");
        } else {
            navigate("/");
        }
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                    <img
                        src={logo}
                        onClick={onRedirect}
                        alt="logo"
                        className={styles.logo}
                    />
            </div>
            {!isAuthenticated() && (
                <>
                    <div className={styles.headerMobileDropdown}>
                        <FontAwesomeIcon className={styles.headerDropdownIcon} icon={faBars} />
                        <div
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className={styles.dropdownToggle}
                        >

                            <ul className={styles.dropdownMenu}>

                                <li>
                                    <Link
                                        className={styles.dropdownItem}
                                        to="/login"
                                    >
                                        Вход
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={styles.dropdownItem}
                                        to="/register"
                                    >
                                        Регистрация
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.headerButtons}>
                        <Link
                            to="/login"
                            className={styles.buttonLogin}
                            type="button"
                            style={{
                                borderBottomRightRadius: "0px",
                                borderTopRightRadius: "0px",
                            }}
                        >
                            Вход
                        </Link>
                        <Link
                            to="/register"
                            className={styles.buttonRegister}
                            name="register"
                            type="button"
                        >
                            Нов Акаунт
                        </Link>
                    </div>
                </>
            )}

            {isAuthenticated() && (
                <div className={styles.headerDropdownContainer}>
                    <div className={styles.dropdownNotifications}>
                        <div
                            className={styles.dropdownToggle}
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <FontAwesomeIcon icon={faBell} className={styles.notificationsIcon}/>
                            <span className={styles.notificationDot}>
                                <span className={styles.hidden}>New alerts</span>
                            </span>
                        </div>

                        <ul
                            className={styles.dropdownMenu}
                            aria-labelledby="navbarLightDropdownMenuLink"
                        >

                            <li className="notifications-block border-bottom">
                                <Link className={styles.dropdownItem} to="#">
                                    <div className="notifications-icon-wrap bg-success">
                                        <i className="notifications-icon bi-check-circle-fill"></i>
                                    </div>

                                    <div>
                                        <span>
                                            Your account has been created
                                            successfuly.
                                        </span>

                                        <p>12 days ago</p>
                                    </div>
                                </Link>
                            </li>

                            <li className="notifications-block border-bottom">
                                <Link className={styles.dropdownItem} to="#">
                                    <div className="notifications-icon-wrap bg-info">
                                        <i className="notifications-icon bi-folder"></i>
                                    </div>

                                    <div>
                                        <span>
                                            Please check. We have sent a Daily
                                            report.
                                        </span>

                                        <p>10 days ago</p>
                                    </div>
                                </Link>
                            </li>

                            <li className="notifications-block">
                                <Link className={styles.dropdownItem} to="#">
                                    <div className="notifications-icon-wrap">
                                        <i className="notifications-icon bi-question-circle"></i>
                                    </div>

                                    <div>
                                        <span>
                                            Account verification failed.
                                        </span>

                                        <p>1 hour ago</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.dropdownNotifications}>
                        <div
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className={styles.dropdownToggle}
                        >
                            <img
                                src={picture}
                                className={styles.profileImage}
                                alt={"happy man"}
                            />

                            <ul className={styles.dropdownMenu}>
                                <li>
                                    <div className={styles.dropdownMenuProfileThumb}>
                                        <img
                                            src={picture}
                                            className={styles.profileImage}
                                            alt={"happy man"}
                                        />
                                            <small>{name}</small>
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
                                        onClick={onLogoutHandler}
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
                </div>
            )}
        </header>
    );
};
