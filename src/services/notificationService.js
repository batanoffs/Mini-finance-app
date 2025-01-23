import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

const updateNotificationStatus = async (notificationId, status, isSeen, token) => {
    const body = { status: `${status}`, seen: isSeen };

    return await request.put(API.data.userNotifications + `/${notificationId}`, body, token);
};

const getMoneyRequestNotifications = async (senderId, token) => {
    const query = encodeURIComponent(
        `event_type='money request' and status!='accepted' AND sender='${senderId}'`
    );
    return await request.get(
        API.data.userNotifications + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const updateRelation = async (parentObjectId, relationName, id, token) => {
    const body = [id];
    return await request.put(
        API.data.userNotifications + `/${parentObjectId}/${relationName}`,
        body,
        token
    );
};

const updateSeenStatus = async (objectId, seenState, token) => {
    const body = { seen: seenState };
    return await request.put(API.data.userNotifications + '/' + objectId, body, token);
};

const getNotSeenNotifications = async (id, token) => {
    const query = encodeURIComponent(`receiver.ownerId='${id}' and seen='false'`);
    return await request.get(
        API.data.userNotifications + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const deleteNotification = async (objectId) => {
    return await request.del(API.data.userNotifications + '/' + objectId);
};

const getAllFriendRequests = async (token) => {
    const query = encodeURIComponent(`event_type='friend request'`);
    return await request.get(
        API.data.userNotifications + `?loadRelations&relationsDepth=1&where=${query}`,
        token
    );
};

const createNotification = async (phone, receiver, event, currentUserId, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'UserData',
                opResultId: 'findReceiver',
                payload: {
                    whereClause: phone ? `phoneNumber = '${phone}'` : `objectId = '${receiver}'`,
                },
            },
            {
                operationType: 'FIND',
                table: 'UserNotifications',
                opResultId: 'check',
                payload: {
                    whereClause: `event_type = '${event}' and receiver = 'findReceiver.result[0]' and sender = '${receiver}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'UserNotifications',
                opResultId: 'newEntry',
                payload: {
                    event_type: event,
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'UserNotifications',
                opResultId: 'setReceiver',
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
                table: 'UserNotifications',
                opResultId: 'setSender',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newEntry',
                        propName: 'objectId',
                    },
                    relationColumn: 'sender',
                    unconditional: [currentUserId],
                },
            },
        ],
    };

    return await request.post(API.data.userNotifications, body, null, token);
};

export const notificationService = {
    createNotification,
    getNotSeenNotifications,
    updateNotificationStatus,
    deleteNotification,
    getAllFriendRequests,
    getMoneyRequestNotifications,
    updateSeenStatus,
    updateRelation,
};
