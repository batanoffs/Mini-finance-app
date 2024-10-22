import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'

import { TransactionListElement } from '../../../components/TransactionListElement'
import { transactionService } from '../../../services/transactionService'
import { AuthContext } from '../../../contexts/AuthContext'

import containers from './containers.module.css'

export const LastTransactions = () => {
    const [allTransactions, setAllTransactions] = useState([])
    const { userDataId, token } = useContext(AuthContext)

    useEffect(() => {
        transactionService
            .getAllReceiver(userDataId, token)
            .then((result) => setAllTransactions(result))
            .catch((error) => console.log(error))
    }, [userDataId, token])

    return (
        <div className={`${containers.customBlock} ${containers.customBlockExchange}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Last Transactions</h5>
                <Link className="custom-btn" to="/dashboard/wallet">
                    View All Transactions
                </Link>
            </div>
            <ul>
                {allTransactions.length > 0 ? (
                    allTransactions
                        .slice(0, 5)
                        .sort((a, b) => new Date(b.created) - new Date(a.created))
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
                    <Empty
                        style={{ fontFamily: 'var(--body-font-family)', marginBottom: '20px' }}
                        description="No transactions"
                    />
                )}
            </ul>
        </div>
    )
}
