import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    setRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}/${childName}`,
    getRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}?loadRelations=${childName}&relationsDepth=3`,
    attribute: (attribute, value) => `/data/UserData?where=${attribute}='${value}'`,
    setAttribute: (objectId) => `/data/UserData/${objectId}`,
    getAll: (id) => `/data/UserData?where=ownerId='${id}'`,
    sort: (status, event) => `/data/UserData?where=ownerId='${status}'&sortBy=${event}`,
    transactions: "/transaction/unit-of-work",
};


// GET ATTRIBUTE
const getAttribute = async (attribute, value) => {
    return await request.get(baseURL + endpoints.attribute(attribute, value));
};

// Send Friend Request
const friendRequest = async (parentObjectId, childName, params) => {
    const date = new Date();
    const body = {
        "isolationLevelEnum": "READ_COMMITTED",
        "operations": [
            {
                "operationType": "FIND",
                "table": "UserData",
                "opResultId": "findUser",
                "payload": {
                    "whereClause" : `phoneNumber = '${params.number}'`
                }
            },
            {
                "operationType":"CREATE",
                "table": "UserNotifications",
                "payload": {
                  "event_type": "friend_request",
                  "event_date": date.toISOString(),
                  "receiver": "findUser",
                  "sender": params.sender,
                }
            }
        ]
    };
    return await request.put(`${baseURL}${endpoints.transactions}`, body)
};

export const dataService = {

};
