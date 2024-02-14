import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
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
                            <i className="bi-house-fill"></i>
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
                            <i className="bi-wallet"></i>
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
                            <i className="bi-person"></i>
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
                            <i className="bi-gear"></i>
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
                            <i className="bi-question-circle"></i>
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
