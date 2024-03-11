import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    selectNotification: (objectId) => `/data/UserNotifications/${objectId}`,
    notifications: (owenerId) =>
        `/data/UserNotifications?where=status LIKE 'pending' and receiver = '${owenerId}'&loadRelations&relationsDepth=1`, //event_type LIKE 'friend_request' and 
    transactions: "/transaction/unit-of-work",
};

const updateNotification = async (objectId, status) => {
    const body = { status: `${status}` };
    return await request.put(
        `${baseURL}${endpoints.selectNotification(objectId)}`,
        body
    );
};

// Get Notifications
const getNotifications = async (reciverId) => {
    return await request.get(
        `${baseURL}${endpoints.notifications(reciverId)}`
    );
};

const deleteNotification = async (objectId) => {
    return await request.del(
        `${baseURL}${endpoints.selectNotification(objectId)}`
    )
}

// Create Notifications
const createNotification = async (phone, sender, event, currentUserId, token) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: phone? `phoneNumber = '${phone}'`: `objectId = '${sender}'`,
                },
            },
            {
                operationType: "CREATE",
                table: "UserNotifications",
                opResultId: "newEntry",
                payload: {
                    event_type: event,
                },
            },
            {
                operationType: "ADD_RELATION",
                table: "UserNotifications",
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
                table: "UserNotifications",
                opResultId: "setSender",
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: "newEntry",
                        propName: "objectId",
                    },
                    relationColumn: "sender",
                    unconditional: [currentUserId],
                },
            },
        ],
    };

    return await request.post(
        `${baseURL}${endpoints.transactions}`,
        body,
        null,
        token
    );
};

export const notifications = {
    createNotification,
    getNotifications,
    updateNotification,
    deleteNotification
};

// const body = {
//     isolationLevelEnum: "READ_COMMITTED",
//     operations: [
//         {
//             operationType: "FIND",
//             table: "UserData",
//             opResultId: "findReciever",
//             payload: {
//                 whereClause: `phoneNumber = '${phone}'`,
//             },
//         },
//         {
//             operationType: "FIND",
//             table: "UserData",
//             opResultId: "findSender",
//             payload: {
//                 whereClause: `objectId = '${currentUserId}'`,
//             },
//         },
//         {
//             operationType: "CREATE",
//             table: "UserNotifications",
//             payload: {
//                 event_type: "friend_request",
//                 receiver: {
//                     ___ref: true,
//                     opResultId: "findReciever",
//                     resultIndex: 0,
//                     propName: "objectId",
//                 },
//                 sender: {
//                     ___ref: true,
//                     opResultId: "findSender",
//                     resultIndex: 0,
//                     propName: "objectId",
//                 },
//                 sender_name: {
//                     ___ref: true,
//                     opResultId: "findSender",
//                     resultIndex: 0,
//                     propName: "fullName",
//                 }
//             },
//         },
//     ],
// };
