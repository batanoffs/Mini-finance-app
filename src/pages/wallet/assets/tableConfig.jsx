import { Tag, Space, Typography } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';

import { formatDateTable } from './formatDateTable';

export const tableColumnsConfig = [
    {
        title: (
            <Space>
                <Typography.Text strong>Date</Typography.Text>
                <SortAscendingOutlined />
            </Space>
        ),
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        render: (date) => formatDateTable(date),
    },
    {
        title: <Typography.Text strong>Name</Typography.Text>,
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: <Typography.Text strong>Type</Typography.Text>,
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
        title: (
            <Space>
                <Typography.Text strong>Amount</Typography.Text>
                <SortAscendingOutlined />
            </Space>
        ),
        dataIndex: 'price',
        key: 'price',
        defaultSortOrder: 'descend',
        sorter: {
            compare: (a, b) => a.amount - b.amount,
            multiple: 1
        },
    },
    {
        title: <Typography.Text strong>Status</Typography.Text>,
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
