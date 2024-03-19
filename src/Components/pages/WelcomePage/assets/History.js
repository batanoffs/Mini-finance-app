import { transactions } from "../../../../services/transactionService";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Empty } from 'antd';
import blocks from "../custom-block.module.css";
import styles from "./LastTransactions.module.css"

export const History = () => {
    const [transactionsList, setTransactionsList] = useState([]);
    const { userDataId } = useContext(AuthContext);

    useEffect(() => {
        transactions
            .getAllSender(userDataId)
            .then(setTransactionsList)
            .catch(console.error);
    }, [userDataId]);

    return (
        <div className={blocks.customBlock}>
            <h5>История на плащания</h5>
            <ul>
                {transactionsList.length > 0 ? transactionsList
                    .slice()
                    .sort((a, b) => new Date(b.created) - new Date(a.created))
                    .slice(0, 4)
                    .map((transaction) => (
                        <li key={transaction.objectId} data-key={transaction.objectId}>
                            <div className={styles.transactionsBoxWrapper}>
                                <div className={styles.transactionsProfileWrapper}>
                                    <img
                                        src={transaction.receiver[0].avatar}
                                        className={blocks.profileImage}
                                        alt="avatar"
                                    />
                                    <div>
                                        <p>
                                            <strong>
                                                {transaction.receiver[0].fullName}
                                            </strong>
                                        </p>

                                        <small> получил</small>
                                    </div>
                                </div>
                                <div className={styles.transactionsAmountInfo}>
                                    <strong style={{ display: "block", textAlign: "right", color: "darkred" }}>
                                        <span> - </span>{" "}
                                        {transaction.amount}лв
                                    </strong>
                                    <small>
                                        {new Intl.DateTimeFormat("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        }).format(new Date(transaction.created))}
                                    </small>
                                </div>
                            </div>
                        </li>
                    )) : <Empty description="Липсва история" />}
            </ul>
        </div>
    );
};

