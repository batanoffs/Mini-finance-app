import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    // setRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}/${childName}`,
    // getRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}?loadRelations=${childName}&relationsDepth=3`,
    // attribute: (attribute, value) => `/data/UserData?where=${attribute}='${value}'`,
    // setAttribute: (objectId) => `/data/UserData/${objectId}`,
    getTransactions: (owenerId) => `/data/UserNotifications?where=event_type LIKE 'friend_request' and status LIKE 'pending' and receiver = '${owenerId}'`,
    transactions: "/transaction/unit-of-work",
};


// GET ATTRIBUTE
// const getAttribute = async (attribute, value) => {
//     return await request.get(baseURL + endpoints.attribute(attribute, value));
// };


// Get Friend Requests 
const getFriendRequest = async (reciverId) => {
    return await request.get(`${baseURL}${endpoints.getTransactions(reciverId)}`)
}

// Send Friend Request
const friendRequest = async (phone, senderId) => {
    const body = {
        "isolationLevelEnum": "READ_COMMITTED",
        "operations": [
            {
                "operationType": "FIND",
                "table": "UserData",
                "opResultId": "findUser",
                "payload": {
                    "whereClause" : `phoneNumber = '${phone}'`
                }
            },
            {
                "operationType":"CREATE",
                "table": "UserNotifications",
                "payload": {
                    "event_type": "friend_request",
                    "receiver": {
                        "___ref": true,
                        "opResultId": "findUser",
                        "resultIndex": 0,
                        "propName": "objectId"
                    },
                    "sender": `${senderId}`,
                }
            }
        ]
    };
    return await request.post(`${baseURL}${endpoints.transactions}`, body)
};

export const notifications = {
    friendRequest,
    getFriendRequest,
};
