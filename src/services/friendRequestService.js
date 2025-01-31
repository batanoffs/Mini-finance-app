const create = async (friendId, currentUserId, currentUserName, token) => {
    try {
        // Beginning of the transaction
        const unitOfWork = new Backendless.UnitOfWork();

        // Create a friend request
        const friendRequest = unitOfWork.create('friend-requests', {
            status: 'pending',
        });

        // Create notification with the direct reference to the operation result
        const notification = unitOfWork.create('notifications', {
            type: 'friend-request',
            message: `${currentUserName} sent you a friend request`,
            related_entity_id: friendRequest,
            related_entity_name: 'friend-requests',
        });

        // Set the relations after object creation
        unitOfWork.setRelation(friendRequest, 'receiverId', [friendId]);
        unitOfWork.setRelation(friendRequest, 'senderId', [currentUserId]);

        // Set the receiver relation
        unitOfWork.setRelation(notification, 'userId', [friendId]);

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};

export const friendRequestService = {
    create,
};
