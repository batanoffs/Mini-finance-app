// To do: Add Search and Social Icons to data base
import search from "../../images/social/search.png";
import spotify from "../../images/social/spotify.png";
import telegram from "../../images/social/telegram.png";
import snapchat from "../../images/social/snapchat.png";
import tiktok from "../../images/social/tiktok.png";
import youtube from "../../images/social/youtube.png";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import './header.css';

export const Header = ({ picture }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <header className="navbar sticky-top flex-md-nowrap">
            <div className="col-md-3 col-lg-4 me-0 px-3 fs-6">
                <Link className="navbar-brand" to="dashboard">
                    <label className="bi-box"> Mini Finance App</label>
                </Link>
            </div>

            <button
                className="navbar-toggler position-absolute d-md-none collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            {!isAuthenticated() && (
                 <div className="header-buttons">
                 <Link to="login" className="link"  type="button">
                     ВХОД
                 </Link>
                 <button className="button" name="register" type="button">
                    Нов Банков Акаунт
                 </button>
             </div>
            )}
            
           


            {/* <form
                className="custom-form header-form ms-lg-1 ms-md-1 me-lg-auto me-md-auto order-2 order-lg-0 order-md-0"
                action="#"
                method="get"
            >
                <input
                    className="form-control"
                    name="search"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                />
            </form> */}

            {isAuthenticated() && (
                <div className="navbar-nav me-lg-2">
                    <div className="nav-item text-nowrap d-flex align-items-center">
                        <div className="dropdown ps-3">
                            <Link
                                className="nav-link dropdown-toggle text-center"
                                to="notifications"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                id="navbarLightDropdownMenuLink"
                            >
                                <i className="bi-bell"></i>
                                <span className="position-absolute start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">
                                        Нотификация
                                    </span>
                                </span>
                            </Link>
                        </div>

                        <div className="dropdown ps-1">
                            <Link
                                className="nav-link dropdown-toggle text-center"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi-three-dots-vertical"></i>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-social bg-white shadow">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-4">
                                            <Link
                                                className="dropdown-item text-center"
                                                to="#"
                                            >
                                                <img
                                                    src={search}
                                                    className="profile-image img-fluid"
                                                    alt={"Google search"}
                                                />
                                                <span className="d-block">
                                                    Google
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-4">
                                            <Link
                                                className="dropdown-item text-center"
                                                to="#"
                                            >
                                                <img
                                                    src={spotify}
                                                    className="profile-image img-fluid"
                                                    alt="Spotify"
                                                />
                                                <span className="d-block">
                                                    Spotify
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-4">
                                            <Link
                                                className="dropdown-item text-center"
                                                to="#"
                                            >
                                                <img
                                                    src={telegram}
                                                    className="profile-image img-fluid"
                                                    alt="telegram"
                                                />
                                                <span className="d-block">
                                                    Telegram
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-4">
                                            <Link
                                                className="dropdown-item text-center"
                                                to="#"
                                            >
                                                <img
                                                    src={snapchat}
                                                    className="profile-image img-fluid"
                                                    alt="snapchat"
                                                />
                                                <span className="d-block">
                                                    Snapchat
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-4">
                                            <Link
                                                className="dropdown-item text-center"
                                                to="#"
                                            >
                                                <img
                                                    src={tiktok}
                                                    className="profile-image img-fluid"
                                                    alt="tiktok"
                                                />
                                                <span className="d-block">
                                                    Tiktok
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-4">
                                            <Link
                                                className="dropdown-item text-center"
                                                to="#"
                                            >
                                                <img
                                                    src={youtube}
                                                    className="profile-image img-fluid"
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
                        </div>

                        <div className="dropdown px-3">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={picture}
                                    className="profile-image img-fluid"
                                    alt={"happy man"}
                                />
                            </Link>
                            <ul className="dropdown-menu bg-white shadow">
                                <li>
                                    <div className="dropdown-menu-profile-thumb d-flex">
                                        <img
                                            src={picture}
                                            className="profile-image img-fluid me-3"
                                            alt={"happy man"}
                                        />

                                        <div className="d-flex flex-column">
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
                                        <i className="bi-person me-2"></i>
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="setting.html"
                                    >
                                        <i className="bi-gear me-2"></i>
                                        Settings
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="help-center.html"
                                    >
                                        <i className="bi-question-circle me-2"></i>
                                        Help
                                    </Link>
                                </li>

                                <li className="border-top mt-3 pt-2 mx-4">
                                    <Link
                                        className="dropdown-item ms-0 me-0"
                                        to="#"
                                    >
                                        <i className="bi-box-arrow-left me-2"></i>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
