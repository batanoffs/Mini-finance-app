import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

//TODO FIX TYPOS in the transactions resultID
const updateBalance = async (ownerId, cardId, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'MoneyTransactions',
                opResultId: 'income',
                payload: {
                    whereClause: `receiver = '${ownerId}'`,
                    properties: ['Sum(amount)'],
                },
            },
            {
                operationType: 'FIND',
                table: 'MoneyTransactions',
                opResultId: 'outcome',
                payload: {
                    whereClause: `sender = '${ownerId}'`,
                    properties: ['Sum(amount)'],
                },
            },
            {
                operationType: 'UPDATE',
                table: 'CardsMockData',
                opResultId: 'updateMoney',
                payload: {
                    objectId: cardId,
                    income: {
                        ___ref: true,
                        opResultId: 'income',
                        resultIndex: 0,
                        propName: 'sum',
                    },
                    outcome: {
                        ___ref: true,
                        opResultId: 'outcome',
                        resultIndex: 0,
                        propName: 'sum',
                    },
                },
            },
        ],
    };

    return await request.post(API.transaction.unit_of_work, body, null, token);
};

const getAllReceiver = async (receiverId, token) => {
    const query = encodeURIComponent(`receiver='${receiverId}'`);
    return await request.get(API.MONEY + `?loadRelations&relationsDepth=1&where=${query}`, token);
};

const getAllSender = async (senderId, token) => {
    const query = encodeURIComponent(`sender='${senderId}'`);
    return await request.get(
        API.data.moneyTransactions + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const requestNotify = async (fullName, amount, sender, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'UserData',
                opResultId: 'findReceiver',
                payload: {
                    whereClause: `fullName = '${fullName}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'UserNotifications',
                opResultId: 'newEntry',
                payload: {
                    event_type: 'money request',
                    amount: amount,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'UserNotifications',
                opResultId: 'notificationReceiver',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'sender',
                    unconditional: [sender],
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'UserNotifications',
                opResultId: 'notificationSender',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'receiver',
                    unconditional: {
                        ___ref: true,
                        opResultId: 'findReceiver',
                    },
                },
            },
        ],
    };
    return await request.post(API.transaction.unit_of_work, body, null, token);
};

// Send Money
const sendMoney = async (fullName, amount, sender, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'UserData',
                opResultId: 'findReceiver',
                payload: {
                    whereClause: `fullName = '${fullName}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'MoneyTransactions',
                opResultId: 'newEntry',
                payload: {
                    amount: amount,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'MoneyTransactions',
                opResultId: 'moneyReceiver',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'receiver',
                    unconditional: {
                        ___ref: true,
                        opResultId: 'findReceiver',
                    },
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'MoneyTransactions',
                opResultId: 'moneySender',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'sender',
                    unconditional: [sender],
                },
            },
        ],
    };

    return await request.post(API.transaction.unit_of_work, body, null, token);
};

// Notify
const notifyMoneyReceived = async (fullName, amount, sender, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'UserData',
                opResultId: 'findReceiver',
                payload: {
                    whereClause: `fullName = '${fullName}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'UserNotifications',
                opResultId: 'notifyEntry',
                payload: {
                    event_type: 'money received',
                    amount: amount,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'UserNotifications',
                opResultId: 'notificationReceiver',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'notifyEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'receiver',
                    unconditional: {
                        ___ref: true,
                        opResultId: 'findReceiver',
                    },
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'UserNotifications',
                opResultId: 'notificationSender',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'notifyEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'sender',
                    unconditional: [sender],
                },
            },
        ],
    };
    return await request.post(API.transaction.unit_of_work, body, null, token);
};

export const transactionService = {
    sendMoney,
    notifyMoneyReceived,
    getAllReceiver,
    getAllSender,
    updateBalance,
    requestNotify,
};
