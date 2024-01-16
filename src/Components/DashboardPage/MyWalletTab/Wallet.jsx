import { Link } from "react-router-dom";
import { BankingActionButtons } from "../OverviewTab/BankingActionButtons.jsx";
import { Transactions } from "../OverviewTab/Transactions.jsx";
import { UserDataContext } from "../../../contexts/UserDataContext.jsx";
import { useContext } from "react";
import { CreditCard } from "../OverviewTab/CreditCard.jsx";
import "./wallet.css";

export const MyWalletTab = () => {
    const { name, creditCard, balance, picture, phone, email } =
        useContext(UserDataContext);
    return (
        <div className="wallet">
            <div className="column " style={{ margin: "3em" }}>
                <div className="title">
                    <h4 className="h4 mb-4">Портфейл</h4>
                </div>
                <div className="stats">
                    <div className="custom-block bg-white">
                        <h6 className="mb-4">Движения по сметка</h6>

                        <div className="table-responsive">
                            <table className="account-table table">
                                <thead>
                                    <tr>
                                        <th scope="col">Дата</th>

                                        <th scope="col">Време</th>

                                        <th scope="col">Описание</th>

                                        <th scope="col">Вид Плащане</th>

                                        <th scope="col">Сума</th>

                                        <th scope="col">Наличност</th>

                                        <th scope="col">Статус</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th scope="row">"Юли" 5, 2023</th>

                                        <th scope="row">10:00</th>

                                        <th scope="row">Пазаруване</th>

                                        <th scope="row">C2C Transfer</th>

                                        <th className="text-danger" scope="row">
                                            <span className="me-1">-</span>
                                            $100.00
                                        </th>

                                        <th scope="row">$5,500.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-danger">
                                                Изчакване
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">July 2, 2023</th>

                                        <th scope="row">10:42 AM</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-1">+</span>
                                            $250
                                        </th>

                                        <th scope="row">$5,600.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-success">
                                                Успешен
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">June 28, 2023</th>

                                        <th scope="row">8:20 PM</th>

                                        <th scope="row">Таксуване</th>

                                        <th scope="row">Държавана сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-2">+</span>$50
                                        </th>

                                        <th scope="row">$5,350.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-success">
                                                Успешен
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">June 24, 2023</th>

                                        <th scope="row">10:48 PM</th>

                                        <th scope="row">Shopee</th>

                                        <th scope="row">QR код</th>

                                        <th className="text-danger" scope="row">
                                            <span className="me-2">-</span>$380
                                        </th>

                                        <th scope="row">$5,300.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-dark">
                                                Отказан
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">June 12, 2023</th>

                                        <th scope="row">12:30 AM</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-2">+</span>$250
                                        </th>

                                        <th scope="row">$4,920.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-success">
                                                Success
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">May 31, 2023</th>

                                        <th scope="row">2:40 PM</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-2">+</span>$50
                                        </th>

                                        <th scope="row">$4,920.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-success">
                                                Success
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">May 22, 2023</th>

                                        <th scope="row">8:50 AM</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-2">+</span>$50
                                        </th>

                                        <th scope="row">$4,920.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-success">
                                                Success
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">May 20, 2023</th>

                                        <th scope="row">6:45 PM</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th className="text-danger" scope="row">
                                            <span className="me-2">-</span>$500
                                        </th>

                                        <th scope="row">$4,920.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-danger">
                                                Pending
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">Април 28, 2023</th>

                                        <th scope="row">11:20</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-2">+</span>$856
                                        </th>

                                        <th scope="row">$4,920.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-success">
                                                Успешен
                                            </span>
                                        </th>
                                    </tr>

                                    <tr>
                                        <th scope="row">Април 16, 2023</th>

                                        <th scope="row">11:00 PM</th>

                                        <th scope="row">Доставка храна</th>

                                        <th scope="row">Мобилна сметка</th>

                                        <th
                                            className="text-success"
                                            scope="row"
                                        >
                                            <span className="me-2">+</span>$50
                                        </th>

                                        <th scope="row">$4,920.00</th>

                                        <th scope="row">
                                            <span className="badge text-bg-danger">
                                                Изчакване
                                            </span>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center mb-0">
                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        to={"#"}
                                        aria-label="Previous"
                                    >
                                        <span aria-hidden="true">Предишна</span>
                                    </Link>
                                </li>

                                <li
                                    className="page-item active"
                                    aria-current="page"
                                >
                                    <Link className="page-link" to={"#"}>
                                        1
                                    </Link>
                                </li>

                                <li className="page-item">
                                    <Link className="page-link" to={"#"}>
                                        2
                                    </Link>
                                </li>

                                <li className="page-item">
                                    <Link className="page-link" to={"#"}>
                                        3
                                    </Link>
                                </li>

                                <li className="page-item">
                                    <Link className="page-link" to={"#"}>
                                        4
                                    </Link>
                                </li>

                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        to={"#"}
                                        aria-label="Next"
                                    >
                                        <span aria-hidden="true">Следваща</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* <div className="col-lg-5 col-12">
                            <div className="custom-block custom-block-transations">
                                <h5 className="mb-4">Последни транзакции</h5>

                                <div className="d-flex flex-wrap align-items-center mb-4">
                                    <div className="d-flex align-items-center">
                                        <img src={person3} className="profile-image img-fluid" alt="person"/>

                                        <div>
                                            <p>
                                                <Link to={"#"}>Daniel Jones</Link>
                                            </p>

                                            <small className="text-muted">C2C Transfer</small>
                                        </div>
                                    </div>

                                    <div className="ms-auto">
                                        <small>05/12/2023</small>
                                        <strong className="d-block text-danger"><span className="me-1">-</span> $250</strong>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap align-items-center mb-4">
                                    <div className="d-flex align-items-center">
                                        <img src={person2} className="profile-image img-fluid" alt="person"/>

                                        <div>
                                            <p>
                                                <Link to={"#"}>Public Bank</Link>
                                            </p>

                                            <small className="text-muted">Mobile Reload</small>
                                        </div>
                                    </div>

                                    <div className="ms-auto">
                                        <small>22/8/2023</small>
                                        <strong className="d-block text-success"><span className="me-1">+</span> $280</strong>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img src={person1} className="profile-image img-fluid" alt="person"/>

                                        <div>
                                            <p><Link to={"#"}>Store</Link></p>

                                            <small className="text-muted">Получено</small>
                                        </div>
                                    </div>

                                    <div className="ms-auto">
                                        <small>22/8/2023</small>
                                        <strong className="d-block text-success"><span className="me-1">+</span> $280</strong>
                                    </div>
                                </div>
                            </div>

                        </div> */}
            </div>
            <div className="content-container">
                <div className="column">
                    <CreditCard
                        creditCard={creditCard}
                        name={name}
                        balance={balance}
                    />

                    <BankingActionButtons />
                </div>
                <div className="column">
                    <Transactions />
                </div>
            </div>
        </div>
    );
};
