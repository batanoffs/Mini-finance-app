import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    selectNotification: (objectId) => `/data/UserNotifications/${objectId}`,
    getTransactions: (owenerId) =>
        `/data/UserNotifications?where=event_type LIKE 'friend_request' and status LIKE 'pending' and receiver = '${owenerId}'`,
    transactions: "/transaction/unit-of-work",
};

// Send Friend Request
const friendRequest = async (fullname, currentUserId) => {
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
        ],
    };
    return await request.post(`${baseURL}${endpoints.transactions}`, body);
};

export const notifications = {
    friendRequest,
};
