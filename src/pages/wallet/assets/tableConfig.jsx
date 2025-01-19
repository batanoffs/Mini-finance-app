import { Tag } from 'antd';

import { formatDateTable } from './formatDateTable';

export const tableColumnsConfig = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        render: (date) => formatDateTable(date),
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
                value: 'Income',
            },
            {
                text: 'Outflow',
                value: 'Outflow',
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
                    let color;
                    if (tag === 'Successful') {
                        color = 'green';
                    } else if (tag === 'pending') {
                        color = 'blue';
                    } else if (tag === 'rejected') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];
