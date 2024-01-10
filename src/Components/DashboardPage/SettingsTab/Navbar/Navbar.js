import { Link } from "react-router-dom"
import creditCard from "../../../../images/credit-card.png"
import { useContext } from "react"
import { AuthContext } from "../../../../contexts/AuthContext"
import "../tab-bar.css";
import "../nav.css";

export const Navbar = () => {
    const { onLogoutHandler } = useContext(AuthContext)
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-3 d-md-block sidebar collapse">
                    <div className="position-sticky py-4 px-3 sidebar-sticky">
                        <ul className="nav flex-column h-100">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="">
                                    <i className="bi-house-fill me-2"></i>
                                    Общ преглед
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="wallet">
                                    <i className="bi-wallet me-2"></i>
                                    Портфейл
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="profile">
                                    <i className="bi-person me-2"></i>
                                    Профил
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="settings">
                                    <i className="bi-gear me-2"></i>
                                    Настройки
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="help-center">
                                    <i className="bi-question-circle me-2"></i>
                                    Помощен център
                                </Link>
                            </li>

                            <li className="nav-item featured-box mt-lg-5 mt-4 mb-4">
                                <img src={creditCard} className="img-fluid" alt="credit card"/>

                                <Link className="btn custom-btn" to="upgrade">Нов План</Link>
                            </li>

                            <li className="nav-item border-top mt-auto pt-2">
                                <Link className="nav-link" onClick={onLogoutHandler} to="/">
                                    <i className="bi-box-arrow-left me-2"></i>
                                    Изход
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
    )
}