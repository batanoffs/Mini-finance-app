import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    // setRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}/${childName}`,
    // getRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}?loadRelations=${childName}&relationsDepth=3`,
    // attribute: (attribute, value) => `/data/UserData?where=${attribute}='${value}'`,
    selectNotification: (objectId) => `/data/UserNotifications/${objectId}`,
    getTransactions: (owenerId) =>
        `/data/UserNotifications?where=event_type LIKE 'friend_request' and status LIKE 'pending' and receiver = '${owenerId}'`,
    transactions: "/transaction/unit-of-work",
};

// GET ATTRIBUTE
// const getAttribute = async (attribute, value) => {
//     return await request.get(baseURL + endpoints.attribute(attribute, value));
// };

// Update Notification status
const updateNotification = async (objectId, status) => {
    const body = { 'status': `${status}` };
    return await request.put(
        `${baseURL}${endpoints.selectNotification(objectId)}`,
        body
    );
};

// Get Friend Requests
const getFriendRequest = async (reciverId) => {
    return await request.get(
        `${baseURL}${endpoints.getTransactions(reciverId)}`
    );
};

// Send Friend Request
const friendRequest = async (phone, currentUserId) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findReciever",
                payload: {
                    whereClause: `phoneNumber = '${phone}'`,
                },
            },
            {
                operationType: "FIND",
                table: "UserData",
                opResultId: "findSender",
                payload: {
                    whereClause: `objectId = '${currentUserId}'`,
                },
            },
            {
                operationType: "CREATE",
                table: "UserNotifications",
                payload: {
                    event_type: "friend_request",
                    receiver: {
                        ___ref: true,
                        opResultId: "findReciever",
                        resultIndex: 0,
                        propName: "objectId",
                    },
                    sender: {
                        ___ref: true,
                        opResultId: "findSender",
                        resultIndex: 0,
                        propName: "objectId",
                    },
                    sender_name: {
                        ___ref: true,
                        opResultId: "findSender",
                        resultIndex: 0,
                        propName: "fullName",
                    }
                },
            },
        ],
    };
    return await request.post(`${baseURL}${endpoints.transactions}`, body);
};

export const notifications = {
    friendRequest,
    getFriendRequest,
    updateNotification,
};
