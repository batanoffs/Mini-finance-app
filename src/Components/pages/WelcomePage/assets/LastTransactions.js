import styles from "./LastTransactions.module.css";
import blocks from "../custom-block.module.css";
import { formatDate } from "../../../../utils/formatDate";
import { Empty } from 'antd';
import { Link } from "react-router-dom";
import { transactionService } from "../../../../services/transactionService";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

export const LastTransactions = () => {
    const [allTransactions, setAllTransactions] = useState([]);
    const { userDataId } = useContext(AuthContext);

    useEffect(() => {
        transactionService.getAllReceiver(userDataId)
            .then((result) => setAllTransactions(result))
            .catch((error) => console.log(error));
    }, [userDataId]);

    return (
        <div className={`${blocks.customBlock} ${blocks.cusomBlockExchange}`}>
            <h5>Последни транзакции</h5>
            <ul>
                {allTransactions.length > 0 ? allTransactions
                    .slice(0, 5)
                    .sort((a, b) => new Date(b.created) - new Date(a.created))
                    .map((entry) => (
                        <li key={entry.objectId} data-key={entry.objectId} className={styles.transactionsBoxWrapper}>
                                <img
                                    src={entry.sender[0].avatar}
                                    className={blocks.profileImage}
                                    alt={"avatar"}
                                    />
                                <div className={styles.detailsWrapper}>
                                    <div className={styles.detailsBox}>
                                        <strong>
                                            {entry.sender[0].fullName}
                                        </strong>
                                        <strong
                                        style={{
                                            display: "block",
                                            textAlign: "right",
                                            color: "green",
                                        }}
                                        >
                                            {entry.transaction_type} {entry.amount}лв
                                        </strong>
                                    </div>

                                    <div className={styles.detailsBox}>
                                        <small>
                                            {entry.transaction_type ="изпрати"}
                                        </small>
                                        <small>
                                            {formatDate(entry.created)}
                                        </small>
                                    </div>
                                </div>
                        </li>
                    )) : <Empty style={{ fontFamily: "var(--body-font-family)", marginBottom: "20px" }} description="Няма транзакции" />}
            </ul>
            <div>
                <Link className="custom-btn" to="/dashboard/wallet">
                    Всички транзакции
                </Link>
            </div>
        </div>
    );
};
