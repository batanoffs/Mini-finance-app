import { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ContactInfo } from "../assets/ContactInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Cards from "react-credit-cards-2";
import styles from "../welcome-page-layout.module.css";
import blocks from "../custom-block.module.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export const ProfileTab = () => {
    const { adress, country, name, phone, virtualcard, picture, email } =
        useContext(AuthContext);
    const date = new Date(virtualcard.created);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const createdDate = `${month} ${day}, ${year}`;

    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <div
                    className={`${blocks.customBlock} ${blocks.customBlockProfile}`}
                >
                    <h5>Виртуална карта</h5>
                    <div>
                        <Cards
                            number={virtualcard.number}
                            expiry={virtualcard.expiration}
                            cvc={virtualcard.cvv}
                            name={name}
                        />
                    </div>
                    <div>
                        <p>
                            <strong>Номер:</strong>

                            <span>{virtualcard.cardId}</span>
                        </p>

                        <p>
                            <strong>Вид:</strong>

                            <span>{virtualcard.brand}</span>
                        </p>

                        <p>
                            <strong>Създадена на:</strong>

                            <span>{createdDate}</span>
                        </p>

                        <p>
                            <strong>Валидна до:</strong>

                            <span>{virtualcard.expiryDate}</span>
                        </p>
                    </div>
                </div>
                <div
                    className={`${blocks.customBlock} ${blocks.customBlockProfile}`}
                >
                    <div>
                        <div>
                            <h5>Обща информация</h5>
                        </div>

                        <div>
                            <div className={blocks.customBlockProfileImageWrap}>
                                <img
                                    src={picture}
                                    className={blocks.customBlockProfileImage}
                                    alt=""
                                />

                                <Link
                                    to="mini-finance/dashboard/settings"
                                    className={blocks.customBlockEditIcon}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </Link>
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
                                <strong>Държава:</strong>

                                <span>{country}</span>
                            </p>

                            <p>
                                <strong>Адрес:</strong>

                                <span>{adress}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    );
};
