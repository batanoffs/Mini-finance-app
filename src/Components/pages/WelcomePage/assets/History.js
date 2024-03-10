import { transactions } from "../../../../services/transactionService";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import blocks from "../custom-block.module.css";

export const History = () => {
    const [allTransactions, setAllTransactions] = useState([]);
    const { userDataId } = useContext(AuthContext);

    useEffect(() => {
        transactions
            .getTransactions(userDataId)
            .then((result) => setAllTransactions(result))
            .catch((error) => console.log(error));
    }, [userDataId]);
    return (
        <div className={blocks.customBlock}>
            <h5>История на плащания</h5>

            <div className={blocks.customBlock}>
                {allTransactions.length > 0 && ((
                    allTransactions.filter((entry) => entry.transaction_type === "-").map((money) => (
                        <li key={money.objectId} data-key={money.objectId}>
                            <span >
                                {/* TO DO NAME */}
                                Преведени {money.amount}лв. към {money.sender[0].fullName}.
                            </span>
                        </li>
                    ))
                ))}
            </div>
        </div>
    );
};
