import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import creditCard from "../../../images/credit-card.png";
import "./Sidebar.css";

export const Sidebar = () => {
    const { onLogoutHandler } = useContext(AuthContext);
    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-3 d-md-block sidebar collapse"
        >
            <div className="position-sticky py-4 px-3 sidebar-sticky">
                <ul className="nav flex-column h-100">
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
                            <i className="bi-house-fill me-2"></i>
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
                            <i className="bi-wallet me-2"></i>
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
                            <i className="bi-person me-2"></i>
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
                            <i className="bi-gear me-2"></i>
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
                            <i className="bi-question-circle me-2"></i>
                            Помощен център
                        </NavLink>
                    </li>

                    <li className="nav-item featured-box mt-lg-5 mt-4 mb-4">
                        <img
                            src={creditCard}
                            className="img-fluid"
                            alt="credit card"
                        />

                        <NavLink className="btn custom-btn" to="upgrade">
                            Нов План
                        </NavLink>
                    </li>

                    <li className="nav-item border-top mt-auto pt-2">
                        <NavLink
                            className="nav-link"
                            onClick={onLogoutHandler}
                            to="/"
                        >
                            <i className="bi-box-arrow-left me-2"></i>
                            Изход
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
