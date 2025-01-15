import { Empty } from 'antd';

import { ListTransaction } from '../../../../components/lists';
import { useTransactions } from '../../../../hooks/useTransactions';
import { EmptyCard } from '../../../../components/cards';

// import styles from './history.module.css'

export const History = () => {
    const transactions = useTransactions('sender');

    return (
        <EmptyCard title="Transaction History" color="secondary">
            <ul>
                {transactions.length > 0 ? (
                    transactions
                        .slice()
                        .sort((a, b) => new Date(b.created) - new Date(a.created))
                        .slice(0, 4)
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
                    <Empty description="No transaction history found" />
                )}
            </ul>
        </EmptyCard>
    );
};
