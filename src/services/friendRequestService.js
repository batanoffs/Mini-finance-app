const create = async (friendPhone, currentUserId, token) => {
    try {
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
            related_entity_id: newFriendRequest.objectId,
            related_entity_name: 'friend-requests',
        });

        // Set the receiver relation
        unitOfWork.setRelation(notification, 'userId', findFriend);

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        throw new Error(error);
    }
};

export const friendRequestService = {
    create,
};
