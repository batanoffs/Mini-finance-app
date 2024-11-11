import { Link } from 'react-router-dom'
import { Empty } from 'antd'

import { ListTransaction } from '../../../../../../components/lists'
import { useTransactions } from '../../../../../../hooks'
import { EmptyCard } from '../../../../../../components/cards'

import styles from './last-transactions.module.css'

export const LastTransactions = () => {
    const transactions = useTransactions('receiver')

    return (
        <EmptyCard
            title="Last Transactions"
            color="primary"
            options={{
                menu: (
                    <Link className="custom-btn" to="/dashboard/wallet">
                        View All Transactions
                    </Link>
                ),
            }}
        >
            <ul>
                {transactions.length > 0 ? (
                    transactions
                        .slice(0, 5)
                        .sort((a, b) => new Date(b.created) - new Date(a.created))
                        .map((entry) => (
                            <ListTransaction
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
                    <Empty
                        style={{ fontFamily: 'var(--body-font-family)', marginBottom: '20px' }}
                        description="No transactions"
                    />
                )}
            </ul>
        </EmptyCard>
    )
}
