import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    transactions: "/transaction/unit-of-work",
};

// Send Money
const send = async (fullname, amount, type, currentUserId) => {
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
        ],
    };

    const response = await request.post(`${baseURL}${endpoints.transactions}`, body);    
    console.log("1", response);

    const body2 = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "ADD_RELATION",
                table: "MoneyTransactions",
                opResultId: "setReciver",
                payload: {
                    parentObject: response.results.newEntry.result.objectId,
                    relationColumn: "receiver",
                    unconditional: [
                        response.results.findReciever.result[0].objectId,
                    ],
                },
            },
        ],
    };

    const response2 = await request.post(`${baseURL}${endpoints.transactions}`, body2);
    console.log("2", response2);
};

export const transactions = {
    send,
};

// {
//     "isolationLevelEnum": "READ_COMMITTED",
//     "operations": [
//         {
//             "operationType": "FIND",
//             "table": "UserData",
//             "opResultId": "findReciever",
//             "payload": {
//                 "whereClause": "fullName = 'Иво Киров'"
//             }
//         },
//         {
//             "operationType": "CREATE",
//             "table": "MoneyTransactions",
//             "opResultId": "newEntry",
//             "payload": {
//                 "amount": 6126,
//                 "transaction_type": "+"
//             }
//         },
//         {
//             "operationType": "FIND",
//             "table": "MoneyTransactions",
//             "opResultId": "transactionId",
//             "whereClause" : "where clause",
//             "payload": {
//                 "objectId": {
//                     "___ref": true,
//                     "opResultId": "newEntry",
//                     "resultIndex": 0,
//                     "propName": "objectId"
//                 }
//             }
//         }, 
//         {
//              "operationType": "ADD_RELATION",
//              "table": "MoneyTransactions",
//              "opResultId": "setReciver",
//              "payload": {
//                  "parentObject": {
//                      "___ref": true,
//                      "opResultId": "findReciever",
//                      "resultIndex": 0,
//                      "propName": "objectId"
//                  },
//                  "relationColumn": "receiver",
//                  "unconditional": {
//                      "___ref": true,
//                      "opResultId": "newEntry"
//         }
//     }
// }
