import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

const create = async (friendPhone, currentUserId, token) => {
    // Beginning of the transaction
    const unitOfWork = new Backendless.UnitOfWork();

    // Create a query builder
    const queryBuilder = Backendless.DataQueryBuilder.create(token);

    // Build the query
    queryBuilder.setWhereClause(`phoneNumber = '${friendPhone}'`);
    queryBuilder.getProperties(['objectId']);

    // Find the user
    const findUserResult = unitOfWork.find('user-data', queryBuilder);

    // Resolve the query
    const findFriend = findUserResult.resolveTo(0);

    // Create a new friend request entry
    const newFriendRequest = unitOfWork.create('friend-requests', { status: 'pending' });

    // Set the receiver relation
    unitOfWork.setRelation(newFriendRequest, 'receiverId', findFriend);

    // Set the sender relation
    unitOfWork.setRelation(newFriendRequest, 'senderId', [currentUserId]);

    // Create notification
    const notification = unitOfWork.create('notifications', {
        type: 'friend-request',
        message: `${auth.fullName} sent you a friend request`,
    });

    // Set the receiver relation
    unitOfWork.setRelation(notification, 'userId', findFriend);

    // End of the transaction
    return unitOfWork.execute(token);

    // const body = {
    //     isolationLevelEnum:
    //         'REPEATABLE_READ' | 'READ_COMMITTED' | 'READ_UNCOMMITTED' | 'SERIALZABLE',
    //     operations: [
    //         {
    //             operationType: 'FIND',
    //             table: 'user-data',
    //             opResultId: 'findFriend',
    //             payload: {
    //                 properties: ['objectId'],
    //                 whereClause: `phoneNumber = '${friendPhone}'`,
    //             },
    //         },
    //         {
    //             operationType: 'CREATE',
    //             table: 'friend-requests',
    //             opResultId: 'newFriendRequest',
    //             payload: {
    //                 status: 'pending',
    //             },
    //         },
    //         {
    //             operationType: 'SET_RELATION',
    //             table: 'friend-requests',
    //             opResultId: 'addReceiver',
    //             payload: {
    //                 parentObject: {
    //                     ___ref: true,
    //                     opResultId: 'newFriendRequest',
    //                     propName: 'objectId',
    //                 },

    //                 relationColumn: 'receiverId',
    //                 unconditional: [
    //                     {
    //                         ___ref: true,
    //                         opResultId: 'findFriend',
    //                         resultIndex: 0,
    //                         propName: 'objectId',
    //                     },
    //                 ],
    //             },
    //         },
    //         {
    //             operationType: 'SET_RELATION',
    //             table: 'friend-requests',
    //             opResultId: 'addSender',
    //             payload: {
    //                 parentObject: {
    //                     ___ref: true,
    //                     opResultId: 'newFriendRequest',
    //                     propName: 'objectId',
    //                 },
    //                 relationColumn: 'senderId',
    //                 unconditional: [currentUserId],
    //             },
    //         },
    //     ],
    // };

    // return await request.post(API.transaction, body, null, token);
};

export const friendRequestService = {
    create,
};
