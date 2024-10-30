import { Empty } from 'antd'
import { TransactionListElement } from '../../../components/TransactionListElement'

import containers from './containers.module.css'
import { useTransactions } from '../../../hooks/useTransactions'

export const History = () => {
    const transactions = useTransactions('sender')

    return (
        <div className={containers.customBlock}>
            <h5>Transaction History</h5>
            <ul>
                {transactions.length > 0 ? (
                    transactions
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
