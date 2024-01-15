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

export const Header = ({ picture }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <header className="header-container">
            <div className="header-logo">
                <Link className="navbar-brand"  to="/">
                    <label style={{ cursor: "pointer" }} className="bi-box"> Mini Finance App</label>
                </Link>
            </div>
            {!isAuthenticated() && (
                <div className="header-buttons">
                    <Link to="login" className="link" type="button">
                        Вход
                    </Link>
                    <Link
                        to="register"
                        className="button"
                        name="register"
                        type="button"
                    >
                        Нов Банков Акаунт
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
                                    <span className="">
                                        Нотификация
                                    </span>
                                </span>
                            </Link>
                        </div>

                        {/* <div className="dropdown">
                            <Link
                                className="nav-link"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi-three-dots-vertical"></i>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-social">
                                <div className="container">
                                    <div className="row">
                                        <div className="">
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                            >
                                                <img
                                                    src={search}
                                                    className="profile-image"
                                                    alt={"Google search"}
                                                />
                                                <span className="d-block">
                                                    Google
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="">
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                            >
                                                <img
                                                    src={spotify}
                                                    className="profile-image"
                                                    alt="Spotify"
                                                />
                                                <span className="d-block">
                                                    Spotify
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="">
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                            >
                                                <img
                                                    src={telegram}
                                                    className="profile-image"
                                                    alt="telegram"
                                                />
                                                <span className="d-block">
                                                    Telegram
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="">
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                            >
                                                <img
                                                    src={snapchat}
                                                    className="profile-image"
                                                    alt="snapchat"
                                                />
                                                <span className="d-block">
                                                    Snapchat
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="">
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                            >
                                                <img
                                                    src={tiktok}
                                                    className="profile-image"
                                                    alt="tiktok"
                                                />
                                                <span className="d-block">
                                                    Tiktok
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="">
                                            <Link
                                                className="dropdown-item"
                                                to="#"
                                            >
                                                <img
                                                    src={youtube}
                                                    className="profile-image"
                                                    alt="youtube"
                                                />
                                                <span className="d-block">
                                                    Youtube
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

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
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="dropdown-menu-profile-thumb">
                                        <img
                                            src={picture}
                                            className="profile-image"
                                            alt={"happy man"}
                                        />

                                        <div className=" ">
                                            <small>Thomas</small>
                                            <Link to="#">thomas@site.com</Link>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="profile.html"
                                    >
                                        <i className="bi-person"></i>
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="setting.html"
                                    >
                                        <i className="bi-gear"></i>
                                        Settings
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="help-center.html"
                                    >
                                        <i className="bi-question-circle "></i>
                                        Help
                                    </Link>
                                </li>

                                <li className="border-top">
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                    >
                                        <i className="bi-box-arrow-left "></i>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
            )}
        </header>
    );
};
