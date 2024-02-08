import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import card from "../../../images/credit-card.png";

export const Sidebar = () => {
    const { onLogoutHandler } = useContext(AuthContext);
    return (
        <nav
            className="sidebarMenu"
        >
            <div className="sidebar-sticky">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? "nav-link pending"
                                    : isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            name="overview"
                            to="overview"
                        >
                            <i className="bi-house-fill"></i>
                            Общ преглед
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? "nav-link pending"
                                    : isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            name="wallet"
                            to="wallet"
                        >
                            <i className="bi-wallet"></i>
                            Портфейл
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? "nav-link pending"
                                    : isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            name="profile"
                            to="profile"
                        >
                            <i className="bi-person"></i>
                            Профил
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? "nav-link pending"
                                    : isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            name="settings"
                            to="settings"
                        >
                            <i className="bi-gear"></i>
                            Настройки
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isPending
                                    ? "nav-link pending"
                                    : isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            name="helpCenter"
                            to="help-center"
                        >
                            <i className="bi-question-circle"></i>
                            Помощен център
                        </NavLink>
                    </li>

                    <li className="nav-item featured-box">
                        <img
                            src={card}
                            className=""
                            alt="credit card"
                        />

                        <NavLink className="custom-btn" to="upgrade">
                            Нов План
                        </NavLink>
                    </li>

                    <li className="nav-item" style={{ position: "absolute", bottom: `1em` }}>
                        <NavLink
                            className="nav-link"
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
