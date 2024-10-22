import { useEffect, useContext, useState } from 'react'
import { Empty } from 'antd'

import { transactionService } from '../../../services/transactionService'
import { TransactionListElement } from '../../../components/TransactionListElement'
import { AuthContext } from '../../../contexts/AuthContext'

import containers from './containers.module.css'

export const History = () => {
    const [transactionsList, setTransactionsList] = useState([])
    const { userDataId, token } = useContext(AuthContext)

    useEffect(() => {
        transactionService
            .getAllSender(userDataId, token)
            .then(setTransactionsList)
            .catch(console.error)
    }, [userDataId, token])

    return (
        <div className={containers.customBlock}>
            <h5>Transaction History</h5>
            <ul>
                {transactionsList.length > 0 ? (
                    transactionsList
                        .slice()
                        .sort((a, b) => new Date(b.created) - new Date(a.created))
                        .slice(0, 4)
                        .map((entry) => (
                            <TransactionListElement
                                id={entry.objectId}
                                key={entry.objectId}
                                avatar={entry.sender[0].avatar}
                                name={entry.sender[0].fullName}
                                amount={entry.amount}
                                transactionType={entry.transaction_type}
                                date={entry.created}
                            />
                        ))
                ) : (
                    <Empty description="No transaction history found" />
                )}
            </ul>
        </div>
    )
}
