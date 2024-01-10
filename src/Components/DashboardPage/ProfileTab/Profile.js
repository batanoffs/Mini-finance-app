import { useContext } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { Link } from "react-router-dom";

export const ProfileTab = () => {
    const { name, phone, creditCard, picture, userId, email } =  useContext(UserDataContext);
    const date = new Date(creditCard.created);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const createdDate = `${month} ${day}, ${year}`;
    
    return (
        <>
            <div className="title-group mb-3">
                <h1 className="h2 mb-0">Профил</h1>
            </div>

            <div className="row my-4">
                <div className="col-lg-7 col-12">
                    <div className="custom-block custom-block-profile">
                        <div className="row">
                            <div className="col-lg-12 col-12 mb-3">
                                <h6>Обща информация</h6>
                            </div>

                            <div className="col-lg-3 col-12 mb-4 mb-lg-0">
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

                            <div className="col-lg-9 col-12">
                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Име:</strong>

                                    <span>{name}</span>
                                </p>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Email:</strong>

                                    <span>{email}</span>
                                </p>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Телефон:</strong>

                                    <span>{phone}</span>
                                </p>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Роден на:</strong>

                                    <span>March 5, 1992</span>
                                </p>

                                <p className="d-flex flex-wrap">
                                    <strong>Адрес:</strong>

                                    <span>551 Swanston Street, Melbourne</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="custom-block custom-block-profile bg-white">
                        <h6 className="mb-4">Кредитна карта</h6>

                        <p className="d-flex flex-wrap mb-2">
                            <strong>Номер:</strong>

                            <span>{userId}</span>
                        </p>

                        <p className="d-flex flex-wrap mb-2">
                            <strong>Вид:</strong>

                            <span>Лична</span>
                        </p>

                        <p className="d-flex flex-wrap mb-2">
                            <strong>Създадена на:</strong>

                            <span>{createdDate}</span>
                        </p>

                        <p className="d-flex flex-wrap mb-2">
                            <strong>Валидна до:</strong>

                            <span>July 18, 2032</span>
                        </p>
                    </div>
                </div>

                <div className="col-lg-5 col-12">
                    <div className="custom-block custom-block-contact">
                        <h6 className="mb-4">
                        Имате ли нужда от помощ? Моля направете запитване.
                        </h6>

                        <p>
                            <strong>Свържи се с нас:</strong>
                            <a href="tel: 305-240-9671" className="ms-2">
                                (60) 305-240-9671
                            </a>
                        </p>

                        <Link
                            to="#"
                            className="btn custom-btn custom-btn-bg-white mt-3"
                        >
                            Започни Чат
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
