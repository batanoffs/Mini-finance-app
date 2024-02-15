import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet,faGear,faHandshakeAngle,faHouse } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import card from "../../../../images/credit-card.png";
import styles from "./sidebar.module.css";

export const Sidebar = () => {
    const { onLogoutHandler } = useContext(AuthContext);
    return (
        <nav
            className={styles.sidebarMenu}
        >
            <div className={styles.sidebarSticky}>
                <ul className={styles.nav}>
                    <li>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? `${styles.navLink} ${styles.pending}`
                                    : isActive
                                    ? `${styles.navLink} ${styles.active}`
                                    : `${styles.navLink}`
                            }
                            name="overview"
                            to="overview"
                        >
                            <FontAwesomeIcon icon={faHouse} />
                            Общ преглед
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? `${styles.navLink} ${styles.pending}`
                                    : isActive
                                    ? `${styles.navLink} ${styles.active}`
                                    : `${styles.navLink}`
                            }
                            name="wallet"
                            to="wallet"
                        >
                            <FontAwesomeIcon icon={faWallet} />
                            Портфейл
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? `${styles.navLink} ${styles.pending}`
                                    : isActive
                                    ? `${styles.navLink} ${styles.active}`
                                    : `${styles.navLink}`
                            }
                            name="profile"
                            to="profile"
                        >
                            <FontAwesomeIcon icon={faAddressCard} />
                            Профил
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? `${styles.navLink} ${styles.pending}`
                                    : isActive
                                    ? `${styles.navLink} ${styles.active}`
                                    : `${styles.navLink}`
                            }
                            name="settings"
                            to="settings"
                        >
                            <FontAwesomeIcon icon={faGear} />
                            Настройки
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? `${styles.navLink} ${styles.pending}`
                                    : isActive
                                    ? `${styles.navLink} ${styles.active}`
                                    : `${styles.navLink}`
                            }
                            name="helpCenter"
                            to="help-center"
                        >
                            <FontAwesomeIcon icon={faHandshakeAngle} />
                            Помощен център
                        </NavLink>
                    </li>

                    <li className={styles.featureBox}>
                        <img
                            src={card}
                            alt="credit card"
                        />

                        <NavLink className="custom-btn" to="upgrade">
                            Нов План
                        </NavLink>
                    </li>

                    <li style={{ position: "absolute", bottom: `1em` }}>
                        <NavLink
                            className={styles.navLink}
                            onClick={onLogoutHandler}
                            to="/"
                        >
                            <i className="bi-box-arrow-left"></i>
                            Изход
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
