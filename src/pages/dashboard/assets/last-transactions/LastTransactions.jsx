import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import { ListTransaction } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';
import { useTransactions } from '../../../../hooks';

const SortTransactions = ({ transactions }) => {
    if (transactions.length === 0) {
        return (
            <Empty
                style={{ fontFamily: 'var(--body-font-family)', marginBottom: '20px' }}
                description="No transactions"
            />
        );
    }

    return transactions
        .slice(0, 10)
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .map((entry, index) => (
            <ListTransaction
                key={entry.id || index}
                avatar={entry.sender.length > 0 ? entry.sender[0].avatar : null}
                name={entry.sender.length > 0 ? entry.sender[0].fullName : 'Unknown'}
                amount={entry.amount}
                transactionType={entry.transaction_type}
                date={entry.created}
            />
        ));
};

export const LastTransactions = () => {
    const transactions = useTransactions('receiver');

    return (
        <EmptyCard
            title="Last Transactions"
            color="primary"
            options={{
                menu: (
                    <Link className="custom-btn" to="/dashboard/wallet">
                        View All
                    </Link>
                ),
            }}
        >
            <ul>
                <SortTransactions transactions={transactions} />
            </ul>
        </EmptyCard>
    );
};
