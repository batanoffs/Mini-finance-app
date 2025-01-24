import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

const getById = async (id) => {
    const response = request.get(API.data.friendRequests + `/${id}`);
    return response.json();
};

const create = async (friendPhone, currentUserId, token) => {
    const body = {
        isolationLevelEnum: 'READ_COMMITTED',
        operations: [
            {
                operationType: 'FIND',
                table: 'user-data',
                opResultId: 'findFriend',
                payload: {
                    whereClause: `phoneNumber = '${friendPhone}'`,
                },
            },
            {
                operationType: 'CREATE',
                table: 'friend-requests',
                opResultId: 'newFriendRequest',
            },
            {
                operationType: 'ADD_RELATION',
                table: 'friend-requests',
                opResultId: 'setReceiver',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newFriendRequest',
                        propName: 'receiverId',
                    },
                    unconditional: {
                        ___ref: true,
                        opResultId: 'findFriend',
                    },
                },
            },
            {
                operationType: 'ADD_RELATION',
                table: 'friend-requests',
                opResultId: 'setSender',
                payload: {
                    parentObject: {
                        ___ref: true,
                        opResultId: 'newFriendRequest',
                        propName: 'objectId',
                    },
                    relationColumn: 'senderId',
                    unconditional: [currentUserId],
                },
            },
        ],
    };

    return await request.post(API.data.friendRequests, body, null, token);
};

export const friendRequestService = {
    getById,
    create,
};
