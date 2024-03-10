import styles from "./LastTransactions.module.css";
import blocks from "../custom-block.module.css";
import { Link } from "react-router-dom";
import { transactions } from "../../../../services/transactionService";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

export const LastTransactions = () => {
    const [allTransactions, setAllTransactions] = useState([]);
    const { userDataId } = useContext(AuthContext);

    useEffect(() => {
        transactions
            .getTransactions(userDataId)
            .then((result) => setAllTransactions(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    return (
        <div className={`${blocks.customBlock} ${blocks.cusomBlockExchange}`}>
            <h5>Последни транзакции</h5>
            <ul>
                {allTransactions.slice(0, 3).map((entry) => (
                    <li key={entry.objectId} data-key={entry.objectId}>
                        <div className={styles.transactionsBoxWrapper}>
                            <div
                                className={
                                    styles.transactionsProfileWrapper
                                }
                            >
                                <img
                                    src={entry.sender[0].avatar}
                                    className={blocks.profileImage}
                                    alt={"avatar"}
                                />

                                <div>
                                    <p>
                                        <strong>{entry.sender[0].fullName}</strong>
                                    </p>

                                    <small>{(entry.transaction_type === "+"
                                            ? "изпрати"
                                            : "получи")}</small>
                                </div>
                            </div>

                            <div className={styles.transactionsAmountInfo}>
                                <small>
                                    {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                    }).format(new Date(entry.created))}
                                </small>
                                <strong
                                    style={{
                                        display: "block",
                                        textAlign: "right",
                                        ...(entry.transaction_type === "+"
                                            ? {
                                                  color: "green",
                                              }
                                            : {
                                                  color: "darkred",
                                              }),
                                    }}
                                >
                                    <span>{entry.transaction_type}</span>{" "}
                                    {entry.amount}лв
                                </strong>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <Link className="custom-btn" to="/dashboard/wallet">
                    Виж всички транзакции
                </Link>
            </div>
        </div>
    );
};