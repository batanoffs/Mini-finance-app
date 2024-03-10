import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    transactions: "/transaction/unit-of-work",
};

// Send Money
const send = async (fullname, amount, type, sender, token) => {
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
                opResultId: "setReciver",
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
                opResultId: "setSender",
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
        ],
    };

    return await request.post(`${baseURL}${endpoints.transactions}`, body, null, token);
};

export const transactions = {
    send,
};


    // const body = {
    //     isolationLevelEnum: "READ_COMMITTED",
    //     operations: [
    //         {
    //             operationType: "FIND",
    //             table: "UserData",
    //             opResultId: "findReciever",
    //             payload: {
    //                 whereClause: `fullName = '${fullname}'`,
    //             },
    //         },
    //         {
    //             operationType: "CREATE",
    //             table: "MoneyTransactions",
    //             opResultId: "newEntry",
    //             payload: {
    //                 amount: amount,
    //                 transaction_type: type,
    //             },
    //         },
    //     ],
    // };

    

    // if (response.success) {
    //     const body2 = {
    //         isolationLevelEnum: "READ_COMMITTED",
    //         operations: [
    //             {
    //                 operationType: "ADD_RELATION",
    //                 table: "MoneyTransactions",
    //                 opResultId: "setReciver",
    //                 payload: {
    //                     parentObject: response.results.newEntry.result.objectId,
    //                     relationColumn: "receiver",
    //                     unconditional: [
    //                         response.results.findReciever.result[0].objectId,
    //                     ],
    //                 },
    //             },
    //             {
    //                 operationType: "ADD_RELATION",
    //                 table: "MoneyTransactions",
    //                 opResultId: "setSender",
    //                 payload: {
    //                     parentObject: response.results.newEntry.result.objectId,
    //                     relationColumn: "sender",
    //                     unconditional: [sender],
    //                 },
    //             },
    //         ],
    //     };

    //     const response2 = await request.post(
    //         `${baseURL}${endpoints.transactions}`,
    //         body2
    //     );
    //     return response2;
    // }

// {
//     "isolationLevelEnum": "READ_COMMITTED",
//     "operations": [
//         {
//             "operationType": "FIND",
//             "table": "UserData",
//             "opResultId": "findReciever",
//             "payload": {
//                 "whereClause": "fullName = 'Tommy Smith'"
//             }
//         },
//         {
//             "operationType": "CREATE",
//             "table": "MoneyTransactions",
//             "opResultId": "newEntry",
//             "payload": {
//                 "amount": 12125,
//                 "transaction_type": "+"
//             }
//         },
//         {
//             "operationType": "ADD_RELATION",
//             "table": "MoneyTransactions",
//             "opResultId": "setReciver",
//             "payload": {
//                 "parentObject": {
//                     "___ref": true,
//                     "opResultId": "newEntry",
//                     "propName": "objectId"
//                 },
//                 "relationColumn": "receiver",
//                 "unconditional": {
//                     "___ref": true,
//                     "opResultId": "findReciever"
//                 }
//             }
//         },
//         {
//             "operationType": "ADD_RELATION",
//             "table": "MoneyTransactions",
//             "opResultId": "setSender",
//             "payload": {
//                 "parentObject": {
//                     "___ref": true,
//                     "opResultId": "newEntry",
//                     "propName": "objectId"
//                 },
//                 "relationColumn": "sender",
//                 "unconditional": [
//                     "983BC9D0-48C3-43F0-8B97-F5E4C6EF18A3"
//                 ]
//             }
//         }
//     ]
// }
