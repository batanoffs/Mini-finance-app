import React from "react";
import { Space, Table, Tag } from "antd";
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
export const TransactionsTable = () => {
    return (
        <div className="custom-block" style={{ padding: "0.5em 1.5em" }}>
            <h5 style={{ paddingBottom: "0.5em", paddingTop: "0.7em"}}>Движения по сметка</h5>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};
