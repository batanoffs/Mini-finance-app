import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    transactions: "/transaction/unit-of-work",
    transactionsReceiver: (owenerId) => `/data/MoneyTransactions?where=receiver='${owenerId}'&loadRelations&relationsDepth=1`, 
    transactionsSender: (owenerId) => `/data/MoneyTransactions?where=sender='${owenerId}'&loadRelations&relationsDepth=1`, 
    allSorted: "/data/MoneyTransactions?loadRelations&relationsDepth=1",
};

const updateBalance = async (owenerId,cardId, token) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "MoneyTransactions",
                opResultId: "income",
                payload: {
                    whereClause: `receiver = '${owenerId}'`,
                    "properties" : ["Sum(amount)"],
                },
            },
            {
                operationType: "FIND",
                table: "MoneyTransactions",
                opResultId: "outcome",
                payload: {
                    whereClause: `sender = '${owenerId}'`,
                    "properties" : ["Sum(amount)"],
                },
            },
            {
                operationType: "UPDATE",
                table: "CardsMockData",
                opResultId: "updateMoney",
                "payload": {
                    objectId: cardId,
                    income: {
                        ___ref: true,
                        opResultId: "income",
                        resultIndex: 0,
                        propName: "sum",
                    },
                    outcome: {
                        ___ref: true,
                        opResultId: "outcome",
                        resultIndex: 0,
                        propName: "sum",
                    },
                }
            },

        ],
    };

    return await request.post(`${baseURL}${endpoints.transactions}`, body, null, token);
}

// Get all transactions with id for receiver
const getAllReceiver = async (reciverId) => {
    return await request.get(`${baseURL}${endpoints.transactionsReceiver(reciverId)}`);
}

// Get all transactions with id for sender
const getAllSender = async (reciverId) => {
    return await request.get(`${baseURL}${endpoints.transactionsSender(reciverId)}`);
}
// Request Money 
const requestNotify = async (fullname, amount, sender, token) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: `fullName = '${fullname}'`,
                },
            },
            {
                operationType: "CREATE",
                table: "UserNotifications",
                opResultId: "newEntry",
                payload: {
                    event_type: "money request",
                    amount: amount,
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "UserNotifications",
                opResultId: "notificationReceiver",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "newEntry",
                        propName: "objectId",
                    },
                    relationColumn: "sender",
                    unconditional: [sender],
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "UserNotifications",
                opResultId: "notificationSender",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "newEntry",
                        propName: "objectId",
                    },
                    relationColumn: "receiver",
                    unconditional: {
                        ___ref: true,
                        opResultId: "findReciever",
                    },
                },
            },
        ],
    };
    return await request.post(`${baseURL}${endpoints.transactions}`, body, null, token);
}

// Send Money
const sendMoney = async (fullname, amount, type, sender, token) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: `fullName = '${fullname}'`,
                },
            },
            {
                operationType: "CREATE",
                table: "MoneyTransactions",
                opResultId: "newEntry",
                payload: {
                    amount: amount,
                    transaction_type: type,
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "MoneyTransactions",
                opResultId: "moneyReciever",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "newEntry",
                        propName: "objectId",
                    },
                    relationColumn: "receiver",
                    unconditional: {
                        ___ref: true,
                        opResultId: "findReciever",
                    },
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "MoneyTransactions",
                opResultId: "moneySender",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "newEntry",
                        propName: "objectId",
                    },
                    relationColumn: "sender",
                    unconditional: [sender],
                },
            }
        ],
    };

    return await request.post(`${baseURL}${endpoints.transactions}`, body, null, token);
};

// Notify
const notify = async (fullname, amount, sender, token) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: `fullName = '${fullname}'`,
                },
            },
            {
                operationType: "CREATE",
                table: "UserNotifications",
                opResultId: "notifyEnrty",
                payload: {
                    event_type: "money received",
                    amount: amount,
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "UserNotifications",
                opResultId: "notificationReceiver",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "notifyEnrty",
                        propName: "objectId",
                    },
                    relationColumn: "receiver",
                    unconditional: {
                        ___ref: true,
                        opResultId: "findReciever",
                    },
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "UserNotifications",
                opResultId: "notificationSender",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "notifyEnrty",
                        propName: "objectId",
                    },
                    relationColumn: "sender",
                    unconditional: [sender],
                },
            },
        ]
    }
    return await request.post(`${baseURL}${endpoints.transactions}`, body, null, token);
}

export const transactions = {
    sendMoney,
    notify,
    getAllReceiver,
    getAllSender,
    updateBalance,
    requestNotify
};