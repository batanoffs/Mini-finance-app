// To do: Add Search and Social Icons to data base
// import search from "../../images/social/search.png";
// import spotify from "../../images/social/spotify.png";
// import telegram from "../../images/social/telegram.png";
// import snapchat from "../../images/social/snapchat.png";
// import tiktok from "../../images/social/tiktok.png";
// import youtube from "../../images/social/youtube.png";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../images/logo/logo4.svg";

export const Header = () => {
    
    const { isAuthenticated, picture } = useContext(AuthContext);
    return (
        <header className="header-container">
            <div className="header-logo">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            </div>
            {!isAuthenticated() && (
                <div className="header-buttons">
                    <Link
                        to="/login"
                        className="button-login"
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
                        className="button-register"
                        name="register"
                        type="button"
                    >
                        Нов Акаунт
                    </Link>
                </div>
            )}

            {isAuthenticated() && (
                <div className="header-dropdown-container">
                    <div className="dropdown-notifications">
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
                                className="profile-image"
                                alt={"happy man"}
                            />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
