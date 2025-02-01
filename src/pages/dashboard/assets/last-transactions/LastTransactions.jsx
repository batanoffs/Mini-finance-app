import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import { useAuthContext } from '../../../../contexts/AuthContext';
import { ListTransaction } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';
import { useTransactions } from '../../../../hooks';

import styles from './last-transactions.module.css';

export const LastTransactions = () => {
    const { transactions, isLoading, error } = useTransactions('completed');
    const { auth } = useAuthContext();

    if (isLoading) {
        return (
            <EmptyCard title="Last Transactions" color="primary">
                <Empty style={styles.empty} description="Loading..." />
            </EmptyCard>
        );
    }

    if (error) {
        return (
            <EmptyCard title="Last Transactions" color="primary">
                <Empty style={styles.empty} description={error} />
            </EmptyCard>
        );
    }

    // Handle empty/invalid cases first
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        return (
            <EmptyCard title="Last Transactions" color="primary">
                <Empty style={styles.empty} description="No transactions" />
            </EmptyCard>
        );
    }

    return (
        <EmptyCard
            title="Last Transactions"
            color="primary"
            options={{
                menu: (
                    <Link className={styles.customBtn} to="/dashboard/wallet">
                        More...
                    </Link>
                ),
            }}
        >
            <ul>
                {transactions?.slice(0, 10).map((entry) => {
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
