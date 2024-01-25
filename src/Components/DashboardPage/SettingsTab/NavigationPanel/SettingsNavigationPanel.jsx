import { NavLink } from "react-router-dom";
import "../tab-bar.css";
export const SettingsNavigationPanel = () => {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <NavLink
                    to={"profile"}
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "nav-link pending"
                            : isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="true"
                >
                    Профил
                </NavLink>
            </li>

            <li className="nav-item" role="presentation">
                <NavLink
                    to={"password"}
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "nav-link pending"
                            : isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                    id="password-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#password-tab-pane"
                    role="tab"
                    aria-controls="password-tab-pane"
                    aria-selected="false"
                >
                    Парола
                </NavLink>
            </li>

            <li className="nav-item" role="presentation">
                <NavLink
                    to={"notifications"}
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "nav-link pending"
                            : isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                    id="notification-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#notification-tab-pane"
                    role="tab"
                    aria-controls="notification-tab-pane"
                    aria-selected="false"
                >
                    Известия
                </NavLink>
            </li>

            <li className="nav-item" role="presentation">
                <NavLink
                    to={"credit-card"}
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "nav-link pending"
                            : isActive
                            ? "nav-link active"
                            : "nav-link"
                    }
                    id="credit-card-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#credit-card-tab-pane"
                    role="tab"
                    aria-controls="credit-card-tab-pane"
                    aria-selected="false"
                >
                    Карта
                </NavLink>
            </li>
        </ul>
    );
};
