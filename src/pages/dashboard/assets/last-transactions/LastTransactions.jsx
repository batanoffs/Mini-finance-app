import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import { AuthContext } from '../../../../contexts/AuthContext';
import { ListTransaction } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';
import { useTransactions } from '../../../../hooks';

import styles from './last-transactions.module.css';

export const LastTransactions = () => {
    const { transactions, isLoading, error } = useTransactions();
    const { auth } = useContext(AuthContext);

    // Handle empty/invalid cases first
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        return <Empty style={styles.empty} description="No transactions" />;
    }

    // Sort by date and take the latest 10
    const sortedByDate = transactions
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 10);

    return (
        <EmptyCard
            title="Last Transactions"
            color="primary"
            options={{
                menu: (
                    <Link className={styles.customBtn} to="/dashboard/wallet">
                        View All
                    </Link>
                ),
            }}
        >
            <ul>
                {sortedByDate.map((entry) => {
                    const isIncoming = entry.receiver[0].objectId === auth.objectId;

                    return (
                        <ListTransaction
                            key={entry.objectId || index}
                            avatar={entry.sender.length > 0 ? entry.sender[0].avatar : null}
                            name={entry.sender.length > 0 ? entry.sender[0].fullName : 'Unknown'}
                            amount={entry.amount}
                            date={entry.created}
                            isIncoming={isIncoming}
                        />
                    );
                })}
            </ul>
        </EmptyCard>
    );
};
