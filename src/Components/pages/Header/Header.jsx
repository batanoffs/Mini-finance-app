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
import { faGear, faHandshakeAngle, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";

import logo from "../../../images/logo/logo4.svg";
import styles from "./site-header.module.css";

export const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, picture, onLogoutHandler } =
        useContext(AuthContext);
    const onRedirect = () => {
        if (isAuthenticated()) {
            navigate("/dashboard/overview");
        } else {
            navigate("/");
        }
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logo}>
                <div className="navbar-brand">
                    <img
                        src={logo}
                        onClick={onRedirect}
                        alt="logo"
                        className={styles.logo}
                    />
                </div>
            </div>
            {!isAuthenticated() && (
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
            )}

            {isAuthenticated() && (
                <div className={styles.headerDropdownContainer}>
                    <div className={styles.dropdownNotifications}>
                        <Link
                            class={styles.dropdownToggle}
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <FontAwesomeIcon icon={faBell} className={styles.notificationsIcon}/>
                            <span class={styles.notificationDot}>
                                <span class={styles.hidden}>New alerts</span>
                            </span>
                        </Link>

                        <ul
                            class={styles.dropdownMenu}
                            aria-labelledby="navbarLightDropdownMenuLink"
                        >

                            <li class="notifications-block border-bottom">
                                <Link class={styles.dropdownItem} to="#">
                                    <div class="notifications-icon-wrap bg-success">
                                        <i class="notifications-icon bi-check-circle-fill"></i>
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

                            <li class="notifications-block border-bottom">
                                <Link class={styles.dropdownItem} to="#">
                                    <div class="notifications-icon-wrap bg-info">
                                        <i class="notifications-icon bi-folder"></i>
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

                            <li class="notifications-block">
                                <Link class={styles.dropdownItem} to="#">
                                    <div class="notifications-icon-wrap">
                                        <i class="notifications-icon bi-question-circle"></i>
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
                        <Link
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
                                    <div
                                        class={styles.dropdownMenuProfileThumb}
                                    >
                                        <img
                                            src={picture}
                                            className={styles.profileImage}
                                            alt={"happy man"}
                                        />

                                        <div>
                                            <small>Thomas</small>
                                            <Link to="#">thomas@site.com</Link>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <Link
                                        class={styles.dropdownItem}
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
                                        class={styles.dropdownItem}
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
                                        class={styles.dropdownItem}
                                        to="/dashboard/help-center"
                                    >
                                        <FontAwesomeIcon
                                            className={styles.sidebarIcons}
                                            icon={faHandshakeAngle}
                                        />
                                        Помощен център
                                    </Link>
                                </li>

                                <li class="border-top">
                                    <Link
                                        class={styles.dropdownItem}
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
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
