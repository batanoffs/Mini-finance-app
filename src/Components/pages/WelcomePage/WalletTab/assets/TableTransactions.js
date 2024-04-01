import { Table, Tag } from "antd";
import { useEffect, useContext, useState } from "react";
import blocks from "../../custom-block.module.css";
import { transactionService } from "../../../../../services/transactionService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { formatDate } from "../../../../../utils/formatDate";
import { notificationService } from "../../../../../services/notificationService";

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
        title: "Име",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Вид",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Сума",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Статус",
        key: "status",
        dataIndex: "status",
        render: (_, { status }) => (
            <>
                {status.map((tag) => {
                    let color;
                    if (tag === "Успешен") {
                        color = "green";
                    }
                    if (tag === "pending") {
                        color = "blue";
                    }
                    if (tag === "rejected") {
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
    },
];

export const TableTransactions = () => {
    const { userDataId, token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getAllTransactions = async () => {
            const [receiverTransactions, requestTransactions] = await Promise.all([
                transactionService.getAllReceiver(userDataId, token),
                notificationService.getMoneyRequestNotifications(userDataId, token),
            ]);

            const allTransactions = [
                ...receiverTransactions,
                ...requestTransactions,
            ].sort((a, b) => new Date(b.created) - new Date(a.created));

            const modified = allTransactions.map((transaction, index) => ({
                key: index + "",
                date: formatDate(transaction.created).slice(0, 8),
                time: formatDate(transaction.created).slice(14, 18),
                description:
                    transaction.receiver[0].objectId === userDataId
                        ? transaction.sender[0].fullName
                        : transaction.receiver[0].fullName,
                type:
                    transaction.receiver[0].objectId === userDataId
                        ? "income"
                        : "outcome",
                price: `${transaction.amount} BGN`,
                status: [transaction.status || "Успешен"],
            }));

            setTransactions(modified);
        };

        getAllTransactions();
    }, [userDataId, token]);

    return (
        <div className={blocks.customBlock} style={{ padding: "0.5em 1.5em" }}>
            <h5 style={{ paddingBottom: "0.5em", paddingTop: "0.7em" }}>
                Движения по сметка
            </h5>
            <Table columns={columns} dataSource={transactions} />
        </div>
    );
};
