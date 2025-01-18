import { useEffect, useContext, useState } from 'react';
import { Table, Tag } from 'antd';

import { AuthContext } from '../../../contexts/AuthContext';
import { transactionService } from '../../../services/transactionService';
import { notificationService } from '../../../services/notificationService';
import { getUserToken } from '../../../utils';
import { formatDateTable } from './formatDateTable';
import { tableColumnsConfig } from './tableConfig';

import styles from './table-transactions.module.css';

export const TableTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const { auth } = useContext(AuthContext);
    const { token } = getUserToken();

    useEffect(() => {
        const getAllTransactions = async () => {
            const [receiverTransactions, requestTransactions] = await Promise.all([
                transactionService.getAllReceiver(auth.objectId, token),
                notificationService.getMoneyRequestNotifications(auth.objectId, token),
                transactionService.getAllSender(auth.objectId, token),
            ]);

            const allTransactions = [...receiverTransactions, ...requestTransactions].sort(
                (a, b) => new Date(b.created) - new Date(a.created)
            );

            const modified = allTransactions.map((transaction, index) => ({
                key: index + '',
                date: formatDateTable(transaction.created)
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')
                    .replace(',', ''),
                time: formatDateTable(transaction.created).split(' ').slice(3).join(' '),
                description:
                    transaction.receiver[0].objectId === auth.objectId
                        ? transaction.sender[0].fullName
                        : transaction.receiver[0].fullName,
                type: transaction.receiver[0].objectId === auth.objectId ? 'income' : 'expense',
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

            setTransactions(modified);
        };

        getAllTransactions();
    }, [auth.objectId, token]);

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log("params", pagination, filters, sorter, extra);
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
                dataSource={transactions}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
        </div>
    );
};
