import { Table, Tag } from "antd";
import React from "react";
import blocks from "../../custom-block.module.css";

const columns = [
    
    {
        title: "Дата",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Време",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Описание",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Вид плащане",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Сума",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Наличност",
        dataIndex: "balance",
        key: "balance",
    },
    {
        title: "Статус",
        key: "status",
        dataIndex: "status",
        render: (_, { status }) => (
            <>
                {status.map((tag) => {
                    let color = tag.length > 7 ? "geekblue" : "green";
                    if (tag === "Отказан") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    }
];

const data = [
    {
        key: "1",
        date: "July 5, 2023",
        time: "10:42 AM",
        description: "Пазаруване",
        price: "- $100",
        balance: "$5000.00",
        status: ["Изчакване"],
    },
    {
        key: "2",
        date: "July 2, 2023",
        time: "8:20 PM",
        description: "Доставка храна",
        price: "- $100",
        balance: "$5000.00",
        status: ["Успешен"],
    },
    {
        key: "3",
        date: "June 28, 2023",
        time: "10:48 PM",
        description: "Таксуване",
        price: "- $100",
        balance: "$5000.00",
        status: ["Отказан"],
    },
];
export const TableTransactions = () => {
    return (
        <div className={blocks.customBlock} style={{ padding: "0.5em 1.5em" }}>
            <h5 style={{ paddingBottom: "0.5em", paddingTop: "0.7em"}}>Движения по сметка</h5>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};


/* <div className="custom-block bg-white">
<h5 >Движения по сметка</h5>

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

                <th className="error" scope="row">
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

                <th className="error" scope="row">
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

                <th className="error" scope="row">
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
</div> */