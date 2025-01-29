import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

const updateBalance = async (objectId, cardId, token) => {
    try {
        const unitOfWork = new Backendless.UnitOfWork();

        // Get the virtual card
        const cardQuery = Backendless.DataQueryBuilder.create();
        cardQuery.setWhereClause(`objectId = '${cardId}'`);
        const findCard = unitOfWork.find('mock-cards', cardQuery);

        // Create a query builder
        const incomeQuery = Backendless.DataQueryBuilder.create(token);
        // Set the where clause
        incomeQuery
            .setWhereClause(`receiver = '${objectId}'`)
            .setProperties(['Sum(amount) as total']);
        // Find transaction sum for income
        const findIncome = unitOfWork.find('transactions', incomeQuery);

        // Create a query builder
        const outcomeQuery = Backendless.DataQueryBuilder.create(token);
        // Set the where clause
        outcomeQuery
            .setWhereClause(`sender = '${objectId}'`)
            .setProperties(['Sum(amount) as total']);
        // Find transaction sum for outcome
        const findOutcome = unitOfWork.find('transactions', outcomeQuery);

        // Define the changes
        const changes = {
            income: findIncome.resolveTo(0, 'total'),
            outcome: findOutcome.resolveTo(0, 'total'),
        };
        // Update the card balance
        unitOfWork.update(findCard.resolveTo(0), changes).setOpResultId('updateBalance');

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        return error;
    }
};

const getAllTransactions = async (ownerId, token) => {
    const query = encodeURIComponent(`receiver='${ownerId}' OR sender='${ownerId}'`);
    return await request.get(
        API.data.transactions + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const getReceivedTransactions = async (receiverId, token) => {
    const query = encodeURIComponent(`receiver='${receiverId}'`);
    return await request.get(
        API.data.transactions + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const getSentTransactions = async (senderId, token) => {
    const query = encodeURIComponent(`sender='${senderId}'`);
    return await request.get(
        API.data.transactions + `?loadRelations&relationsDepth=1&where=${query}`,
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
    return await request.post(API.transaction, body, null, token);
};

// Send Money can be improved when we pass id instead of fullName
const sendMoney = async (fullName, receiverId, amount, senderId, token) => {
    const message = fullName + ' sent you ' + amount + ' BNG.';

    try {
        const unitOfWork = new Backendless.UnitOfWork();

        // Create a new transaction
        const newTransaction = unitOfWork.create('transactions', { amount });

        // Set the relation with the receiver
        unitOfWork.setRelation(newTransaction, 'receiver', [receiverId]);

        // Set the relation with the sender
        unitOfWork.setRelation(newTransaction, 'sender', [senderId]);

        // Create a notification
        const notification = unitOfWork.create('notifications', {
            message: message,
            type: 'transaction',
        });

        // Set the relation with the receiver
        unitOfWork.setRelation(notification, 'userId', [receiverId]);

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        return new Error(error);
    }
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
    return await request.post(API.transaction, body, null, token);
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
