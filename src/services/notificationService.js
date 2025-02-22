// import * as request from '../utils/requester';
// import { API } from '../constants/apiKeys';

const getByUserId = async (currentUserId) => {
    try {
        const queryBuilder = Backendless.DataQueryBuilder.create()
            .setRelated(['userId'])
            .setSortBy(['created desc'])
            .setWhereClause('`is_seen` = FALSE');

        const notifications = await Backendless.Data.of('notifications').find(queryBuilder);

        return notifications.filter(
            (notification) => notification.userId.objectId === currentUserId
        );
    } catch (error) {
        throw new Error(error);
    }
};

const updateNotificationStatus = async (notificationId, status, isSeen, token) => {
    // const body = { status: `${status}`, is_seen: isSeen };
    // return await request.put(API.data.notifications + `/${notificationId}`, body, token);
};

const getMoneyRequestNotifications = async (senderId, token) => {
    // const query = encodeURIComponent(
    //     `event_type='money request' and status!='accepted' AND sender='${senderId}'`
    // );
    // return await request.get(
    //     API.data.notifications + `?loadRelations&relationsDepth=1&where=${query}`,
    //     token
    // );
};

const updateRelation = async (parentObjectId, relationName, id, token) => {
    // const body = [id];
    // return await request.put(
    //     API.data.notifications + `/${parentObjectId}/${relationName}`,
    //     body,
    //     token
    // );
};

const updateSeen = async (objectId) => {
    return await Backendless.Data.of('notifications').save({ objectId: objectId, is_seen: true });
};

const getNotSeenNotifications = async (id, token) => {
    // const query = encodeURIComponent(`receiver.ownerId='${id}' and is_seen='false'`);
    // return await request.get(
    //     API.data.notifications + `?loadRelations&relationsDepth=1&where=${query}`,
    //     token
    // );
};

const deleteNotification = async (objectId) => {
    // return await request.del(API.data.notifications + '/' + objectId);
};

const getAllFriendRequests = async (token) => {
    // const query = encodeURIComponent(`event_type='friend request'`);
    // return await request.get(
    //     API.data.notifications + `?loadRelations&relationsDepth=1&where=${query}`,
    //     token
    // );
};

const createNotification = async (receiverId, event_type, currentUserId, token) => {
    // const body = {
    //     isolationLevelEnum: 'READ_COMMITTED',
    //     operations: [
    //         {
    //             operationType: 'FIND',
    //             table: 'notifications',
    //             opResultId: 'check',
    //             payload: {
    //                 whereClause: `event_type = '${event_type}' and receiver = '${receiverId}' and sender = '${currentUserId}'`,
    //             },
    //         },
    //         {
    //             operationType: 'CREATE',
    //             table: 'notifications',
    //             opResultId: 'newEntry',
    //             payload: {
    //                 event_type: event_type,
    //             },
    //         },
    //         {
    //             operationType: 'ADD_RELATION',
    //             table: 'notifications',
    //             opResultId: 'setReceiver',
    //             payload: {
    //                 parentObject: {
    //                     ___ref: true,
    //                     opResultId: 'newEntry',
    //                     propName: 'objectId',
    //                 },
    //                 relationColumn: 'receiver',
    //                 unconditional: [receiverId],
    //                 // unconditional: {
    //                 //     ___ref: true,
    //                 //     opResultId: 'findReceiver',
    //                 // },
    //             },
    //         },
    //         {
    //             operationType: 'ADD_RELATION',
    //             table: 'notifications',
    //             opResultId: 'setSender',
    //             payload: {
    //                 parentObject: {
    //                     ___ref: true,
    //                     opResultId: 'newEntry',
    //                     propName: 'objectId',
    //                 },
    //                 relationColumn: 'sender',
    //                 unconditional: [currentUserId],
    //             },
    //         },
    //     ],
    // };
    // return await request.post(API.data.notifications, body, null, token);
};

export const notificationService = {
    getByUserId,
    createNotification,
    getNotSeenNotifications,
    updateNotificationStatus,
    deleteNotification,
    getAllFriendRequests,
    getMoneyRequestNotifications,
    updateSeen,
    updateRelation,
};
