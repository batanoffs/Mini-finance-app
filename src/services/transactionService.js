import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

//TODO FIX TYPOS in the transactions resultID
const updateBalance = async (ownerId, cardId, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'cash-transactions',
                opResultId: 'income',
                payload: {
                    whereClause: `receiver = '${ownerId}'`,
                    properties: ['Sum(amount)'],
                },
            },
            {
                operationType: 'FIND',
                table: 'cash-transactions',
                opResultId: 'outcome',
                payload: {
                    whereClause: `sender = '${ownerId}'`,
                    properties: ['Sum(amount)'],
                },
            },
            {
                operationType: 'UPDATE',
                table: 'mock-cards',
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

const getAllTransactions = async (ownerId, token) => {
    const query = encodeURIComponent(`receiver='${ownerId}' OR sender='${ownerId}'`);
    return await request.get(API.data.cashTransactions + `?loadRelations&relationsDepth=1&where=${query}`, token);
};

const getReceivedTransactions = async (receiverId, token) => {
    const query = encodeURIComponent(`receiver='${receiverId}'`);
    return await request.get(API.data.cashTransactions + `?loadRelations&relationsDepth=1&where=${query}`, token);
};

const getSentTransactions = async (senderId, token) => {
    const query = encodeURIComponent(`sender='${senderId}'`);
    return await request.get(
        API.data.cashTransactions + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const requestNotify = async (fullName, amount, sender, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'user-data',
                opResultId: 'findReceiver',
                payload: {
                    whereClause: `fullName = '${fullName}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'notifications',
                opResultId: 'newEntry',
                payload: {
                    event_type: 'money request',
                    amount: amount,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'notifications',
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
                table: 'notifications',
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
                table: 'user-data',
                opResultId: 'findReceiver',
                payload: {
                    //TODO better search by id 
                    whereClause: `fullName = '${fullName}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'cash-transactions',
                opResultId: 'newEntry',
                payload: {
                    amount: amount,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'cash-transactions',
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
                table: 'cash-transactions',
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
                table: 'user-data',
                opResultId: 'findReceiver',
                payload: {
                    whereClause: `fullName = '${fullName}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'notifications',
                opResultId: 'notifyEntry',
                payload: {
                    event_type: 'money received',
                    amount: amount,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'notifications',
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
                table: 'notifications',
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
    getAllTransactions,
    getReceivedTransactions,
    getSentTransactions,
    updateBalance,
    requestNotify,
};
