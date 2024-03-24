import * as request from "./requester";
import { baseURL} from "../constants/baseUrl"

const endpoints = {
    selectNotification: (objectId) => `${baseURL}/data/UserNotifications/${objectId}`,
    notificationsRelations: `${baseURL}/data/UserNotifications?loadRelations&relationsDepth=1`,
    transactions: `${baseURL}/transaction/unit-of-work`,
    relation: (parentObjectId, relationName) => `${baseURL}/data/UserNotifications/${parentObjectId}/${relationName}`,
};

const updateNotificationStatus = async (objectId, statuState, seen, token, ) => { //senderId, receiverId
    const body = { status: `${statuState}`, seen: seen };
    return await request.put(endpoints.selectNotification(objectId),body, token);
};

const updateRelation = async (parentObjectId, relationName, id, token) => {
    const body = [id];
    return await request.put(endpoints.relation(parentObjectId, relationName), body, token);
};

const updateSeenStatus = async (objectId, seenState, token) => {
    const body = { seen: seenState };
    return await request.put(endpoints.selectNotification(objectId),body,token);
};

const getNotifications = async (reciverId, token) => {
    const query = encodeURIComponent(`receiver='${reciverId}' and seen='false'`);
    return await request.get(`${endpoints.notificationsRelations}&where=${query}`, token);
};

const deleteNotification = async (objectId) => {
    return await request.del(endpoints.selectNotification(objectId));
};

const getAllFriendRequests = async (token) => {
    const query = encodeURIComponent(`event_type='friend request'`);
    return await request.get(`${endpoints.notificationsRelations}&where=${query}`, token);
};

const createNotification = async ( phone, receiver, event, currentUserId, token ) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: phone ? `phoneNumber = '${phone}'` : `objectId = '${receiver}'`,
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

    return await request.post(endpoints.transactions, body, null, token );
};

export const notificationService = {
    createNotification,
    getNotifications,
    updateNotificationStatus,
    deleteNotification,
    getAllFriendRequests,
    updateSeenStatus,
    updateRelation,
};
