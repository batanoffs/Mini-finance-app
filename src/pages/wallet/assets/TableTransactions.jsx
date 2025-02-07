import { Table, Tag } from 'antd';

import { useAuthContext } from '../../../contexts/AuthContext';
import { tableColumnsConfig } from './tableConfig';
import { useTransactions } from '../../../hooks';

import styles from './table-transactions.module.css';

export const TableTransactions = () => {
    const { transactions, setTransactions, error, isLoading } = useTransactions();
    const { auth } = useAuthContext();

    // Process transactions with amount field for sorting
    const processedTransactionList = transactions
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .map((transaction) => {
            const isIncome = transaction.receiver[0].objectId === auth.objectId;
            const amount = transaction.amount;
            return {
                key: transaction.objectId,
                date: transaction.created,
                description: isIncome ? transaction.sender[0].fullName : transaction.receiver[0].fullName,
                type: isIncome ? 'Income' : 'Outflow',
                amount: isIncome ? amount : -amount, // Store raw amount for sorting
                price: (
                    <Tag color={isIncome ? 'green' : 'volcano'} key={transaction.objectId}>
                        {`${isIncome ? '+' : '-'} ${amount} BGN`}
                    </Tag>
                ),
                status: [transaction.status],
            };
        });

    return (
        <div className={styles.customBlock} style={{ padding: '0.5em 1.5em' }}>
            <h5 style={{ paddingBottom: '0.5em', paddingTop: '0.7em' }}>Transaction History</h5>
            <Table
                columns={tableColumnsConfig}
                dataSource={processedTransactionList}
            />
        </div>
    );
};
