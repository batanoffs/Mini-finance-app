import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    selectNotification: (objectId) => `/data/UserNotifications/${objectId}`,
    notificationById: (owenerId) =>
        `/data/UserNotifications?where=receiver='${owenerId}' and seen='false'&loadRelations&relationsDepth=1`,
    allFriendRequest: `/data/UserNotifications?loadRelations&relationsDepth=1&where=event_type='friend request'`,
    transactions: "/transaction/unit-of-work",
};
//
const updateFriendRequestStatus = async (objectId, statuState, token) => {
        const body = { status: `${statuState}` };
        return await request.put(
            `${baseURL}${endpoints.selectNotification(objectId)}`,
            body,
            token
        );
};

const updateSeenStatus = async (objectId, seenState, token) => {
        const body = { seen: seenState };
        return await request.put(
            `${baseURL}${endpoints.selectNotification(objectId)}`,
            body,
            token
        );
};

const getNotifications = async (reciverId) => {
    return await request.get(`${baseURL}${endpoints.notificationById(reciverId)}`);
};

const deleteNotification = async (objectId) => {
    return await request.del(
        `${baseURL}${endpoints.selectNotification(objectId)}`
    );
};

const getAllFriendRequests = async (token) => {
    return await request.get(`${baseURL}${endpoints.allFriendRequest}`, token);
};

const createNotification = async (
    phone,
    receiver,
    event,
    currentUserId,
    token
) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: phone
                        ? `phoneNumber = '${phone}'`
                        : `objectId = '${receiver}'`,
                },
            },
            {
                operationType: "FIND",
                table: "UserNotifications",
                opResultId: "check",
                payload: {
                    whereClause: `event_type = '${event}' and receiver = 'findReciever.result[0]' and sender = '${receiver}'`,
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
    updateFriendRequestStatus,
    deleteNotification,
    getAllFriendRequests,
    updateSeenStatus,
};
