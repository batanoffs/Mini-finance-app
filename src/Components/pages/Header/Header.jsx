import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { Notifications } from "./assets/Notifications/Notifications";
import { ProfileDropdown } from "./assets/Profile/ProfileDropdown";
import styles from "./site-header.module.css";

// import logo from "../../../images/logo/logo4.svg";

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
                    src="https://notablepen.backendless.app/api/files/app/AppData/home/logo4.svg"
                    onClick={onRedirect}
                    alt="logo"
                    className={styles.logo}
                />
            </div>
            {!isAuthenticated() && (
                <>
                    <div className={styles.headerMobileDropdown}>
                        <FontAwesomeIcon
                            className={styles.headerDropdownIcon}
                            icon={faBars}
                        />
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
                                        Нов Акаунт
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
                    <Notifications />
                    <ProfileDropdown
                        onLogoutHandler={onLogoutHandler}
                        name={name}
                        picture={picture}
                    />
                </div>
            )}
        </header>
    );
};
