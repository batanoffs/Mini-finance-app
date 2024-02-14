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
import logo from "../../../images/logo/logo4.svg";
import styles from "./site-header.module.css";

export const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, picture } = useContext(AuthContext);
    const onRedirect = () => {
        if (isAuthenticated()) {
            navigate("/dashboard/overview");
        } else {
            navigate("/");
        }
    }
    return (
        <header className={styles.header_container}>
            <div className={styles.header_logo}>
                <div className="navbar-brand">
                    <img src={logo}  onClick={onRedirect} alt="logo" className={styles.logo} />
                </div>
            </div>
            {!isAuthenticated() && (
                <div className={styles.header_buttons}>
                    <Link
                        to="/login"
                        className={styles.button_login}
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
                        className={styles.button_register}
                        name="register"
                        type="button"
                    >
                        Нов Акаунт
                    </Link>
                </div>
            )}

            {isAuthenticated() && (
                <div className={styles.header_dropdown_container}>
                    <div className={styles.dropdown_notifications}>
                        <Link
                            className="nav-link"
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="navbarLightDropdownMenuLink"
                        >
                            <i className="bi-bell"></i>
                            <span className="">
                                <span className="">Нотификация</span>
                            </span>
                        </Link>
                    </div>

                    <div className="dropdown-profile">
                        <Link
                            className="nav-link"
                            to="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={picture}
                                className={styles.profile_image}
                                alt={"happy man"}
                            />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
