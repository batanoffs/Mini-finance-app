import { useContext } from 'react';
import { Table, Tag } from 'antd';

import { AuthContext } from '../../../contexts/AuthContext';
import { tableColumnsConfig } from './tableConfig';
import { useTransactions } from '../../../hooks';

import styles from './table-transactions.module.css';

export const TableTransactions = () => {
    const { transactions, setTransactions, error, isLoading } = useTransactions();
    const { auth } = useContext(AuthContext);

    // Construct the table data params
    const processedTransactionList = transactions
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .map((transaction) => ({
            key: transaction.objectId,
            date: transaction.created,
            description:
                transaction.receiver[0].objectId === auth.objectId
                    ? transaction.sender[0].fullName
                    : transaction.receiver[0].fullName,
            type: transaction.receiver[0].objectId === auth.objectId ? 'Income' : 'Outflow',
            price:
                transaction.receiver[0].objectId === auth.objectId ? (
                    <Tag color={'green'} key={transaction.objectId}>
                        {`+ ${transaction.amount} BGN`}
                    </Tag>
                ) : (
                    <Tag color={'volcano'} key={transaction.objectId}>
                        {`- ${transaction.amount} BGN`}
                    </Tag>
                ),
            status: [transaction.status || 'Successful'],
        }));

    const onChange = (pagination, filters, sorter, extra) => {
        const currentArray = extra.currentDataSource;
        const action = extra.action;

        if (action === 'sort') {
            currentArray.sort((a, b) => {
                if (
                    Number(a.price.props.children.split(' ')[1]) >
                    Number(b.price.props.children.split(' ')[1])
                ) {
                    return sorter.order === 'ascend' ? 1 : -1;
                }
                if (
                    Number(a.price.props.children.split(' ')[1]) <
                    Number(b.price.props.children.split(' ')[1])
                ) {
                    return sorter.order === 'descend' ? -1 : 1;
                }
                return 0;
            });
            setTransactions(currentArray);
        }
    };

    return (
        <div className={styles.customBlock} style={{ padding: '0.5em 1.5em' }}>
            <h5 style={{ paddingBottom: '0.5em', paddingTop: '0.7em' }}>Transaction History</h5>
            <Table
                columns={tableColumnsConfig}
                dataSource={processedTransactionList}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
        </div>
    );
};