import { useEffect, useContext, useState } from 'react'
import { Table, Tag } from 'antd'

import { AuthContext } from '../../../../../contexts/AuthContext'
import { transactionService } from '../../../../../services/transactionService'
import { notificationService } from '../../../../../services/notificationService'
import { formatDateTable } from '../../../../../utils/formatDate'

import containers from '../../../assets/containers.module.css'

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Name',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [
            {
                text: 'Income',
                value: 'income',
            },
            {
                text: 'Expense',
                value: 'expense',
            },
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
        title: 'Amount',
        dataIndex: 'price',
        key: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                {status.map((tag) => {
                    let color
                    if (tag === 'Successful') {
                        color = 'green'
                    }
                    if (tag === 'pending') {
                        color = 'blue'
                    }
                    if (tag === 'rejected') {
                        color = 'volcano'
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    )
                })}
            </>
        ),
    },
]

export const TableTransactions = () => {
    const { userDataId, token } = useContext(AuthContext)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const getAllTransactions = async () => {
            const [receiverTransactions, requestTransactions] = await Promise.all([
                transactionService.getAllReceiver(userDataId, token),
                notificationService.getMoneyRequestNotifications(userDataId, token),
                transactionService.getAllSender(userDataId, token),
            ])

            const allTransactions = [...receiverTransactions, ...requestTransactions].sort(
                (a, b) => new Date(b.created) - new Date(a.created)
            )

            const modified = allTransactions.map((transaction, index) => ({
                key: index + '',
                date: formatDateTable(transaction.created)
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')
                    .replace(',', ''),
                time: formatDateTable(transaction.created).split(' ').slice(3).join(' '),
                description:
                    transaction.receiver[0].objectId === userDataId
                        ? transaction.sender[0].fullName
                        : transaction.receiver[0].fullName,
                type: transaction.receiver[0].objectId === userDataId ? 'income' : 'expense',
                price:
                    transaction.receiver[0].objectId === userDataId ? (
                        <Tag color={'green'} key={transaction.objectId}>
                            {`+ ${transaction.amount} BGN`}
                        </Tag>
                    ) : (
                        <Tag color={'volcano'} key={transaction.objectId}>
                            {`- ${transaction.amount} BGN`}
                        </Tag>
                    ),
                status: [transaction.status || 'Successful'],
            }))

            setTransactions(modified)
        }

        getAllTransactions()
    }, [userDataId, token])

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log("params", pagination, filters, sorter, extra);
        const currentArray = extra.currentDataSource
        const action = extra.action

        if (action === 'sort') {
            currentArray.sort((a, b) => {
                if (
                    Number(a.price.props.children.split(' ')[1]) >
                    Number(b.price.props.children.split(' ')[1])
                ) {
                    return sorter.order === 'ascend' ? 1 : -1
                }
                if (
                    Number(a.price.props.children.split(' ')[1]) <
                    Number(b.price.props.children.split(' ')[1])
                ) {
                    return sorter.order === 'descend' ? -1 : 1
                }
                return 0
            })
            setTransactions(currentArray)
        }
    }

    return (
        <div className={containers.customBlock} style={{ padding: '0.5em 1.5em' }}>
            <h5 style={{ paddingBottom: '0.5em', paddingTop: '0.7em' }}>Account movements</h5>
            <Table
                columns={columns}
                dataSource={transactions}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
        </div>
    )
}
