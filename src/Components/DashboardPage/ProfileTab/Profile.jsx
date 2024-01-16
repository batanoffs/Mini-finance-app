import { useContext } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { Link } from "react-router-dom";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Contact } from "../SettingsTab/NavigationTabs/CallUs";

export const ProfileTab = () => {
    const { name, phone, creditCard, picture, userId, email } =
        useContext(UserDataContext);
    const date = new Date(creditCard.created);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const createdDate = `${month} ${day}, ${year}`;

    return (
        <div className="content-container">
            <div className="column">
                <div className="title-group">
                    <h4>Профил</h4>
                </div>
                <div className="custom-block custom-block-profile">
                    <div className="row">
                        <div>
                            <h6>Обща информация</h6>
                        </div>

                        <div>
                            <div className="custom-block-profile-image-wrap">
                                <img
                                    src={picture}
                                    className="custom-block-profile-image img-fluid"
                                    alt=""
                                />

                                <Link
                                    to="/dashboard/settings"
                                    className="bi-pencil-square custom-block-edit-icon"
                                ></Link>
                            </div>
                        </div>

                        <div>
                            <p>
                                <strong>Име:</strong>

                                <span>{name}</span>
                            </p>

                            <p>
                                <strong>Email:</strong>

                                <span>{email}</span>
                            </p>

                            <p>
                                <strong>Телефон:</strong>

                                <span>{phone}</span>
                            </p>

                            <p>
                                <strong>Роден на:</strong>

                                <span>March 5, 1992</span>
                            </p>

                            <p>
                                <strong>Адрес:</strong>

                                <span>551Swanston Street</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="custom-block custom-block-profile">
                    <h6>Дебитна карта</h6>
                    <div>
                        <Cards
                            number={creditCard.cardNumber}
                            expiry={creditCard.expiryDate}
                            cvc={creditCard.cvc}
                            name={name}
                        />
                    </div>
                    <div>
                        <p>
                            <strong>Номер:</strong>

                            <span>{userId}</span>
                        </p>

                        <p>
                            <strong>Вид:</strong>

                            <span>Лична</span>
                        </p>

                        <p>
                            <strong>Създадена на:</strong>

                            <span>{createdDate}</span>
                        </p>

                        <p>
                            <strong>Валидна до:</strong>

                            <span>July 18, 2032</span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="column">
                <Contact />
            </div>
        </div>
    );
};
