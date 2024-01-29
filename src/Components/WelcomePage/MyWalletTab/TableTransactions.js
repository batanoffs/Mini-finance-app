import React from "react";
import { Pagination } from "antd";

export const Table = () => {
    const onChange = (page) => {
        console.log(page);
    };
    return (
        <div className="custom-block bg-white">
            <h5 className="mb-4">Движения по сметка</h5>

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

                            <th className="text-success" scope="row">
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

                            <th className="text-success" scope="row">
                                <span className="me-2">+</span>
                                $50
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
                                <span className="me-2">-</span>
                                $380
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

                            <th className="text-success" scope="row">
                                <span className="me-2">+</span>
                                $250
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

                            <th className="text-success" scope="row">
                                <span className="me-2">+</span>
                                $50
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

                            <th className="text-success" scope="row">
                                <span className="me-2">+</span>
                                $50
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
                                <span className="me-2">-</span>
                                $500
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

                            <th className="text-success" scope="row">
                                <span className="me-2">+</span>
                                $856
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

                            <th className="text-success" scope="row">
                                <span className="me-2">+</span>
                                $50
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
                <nav aria-label="Page navigation example">
                    <Pagination
                        className="pagination"
                        onChange={onChange}
                        defaultCurrent={1}
                        total={50}
                    />
                </nav>
            </div>
        </div>
    );
};
