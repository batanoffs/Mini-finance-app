// import * as request from '../utils/requester';
// import { API } from '../constants/apiKeys';

const getUserData = async (parentObjectId, relations = [], relationsDepth = 1) => {
    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId, {
            relations,
            relationsDepth,
        });
    } catch (error) {
        throw error;
    }
};

const getAllFriends = async (parentObjectId) => {
    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId, {
            relations: ['friends'],
            excludeProps: [
                'country',
                'address',
                'gender',
                'town',
                'created',
                'avatar',
                'ownerId',
                'phoneNumber',
                'cardId',
                'updated',
            ],
            relationsDepth: 1,
            relationsPageSize: 100,
        });
    } catch (error) {
        throw error;
    }
};

const getByAttr = async (phone) => {
    // const whereClause = encodeURIComponent(
    //     `objectId = '${parentObjectId}' and 'friends.phoneNumber' LIKE ${phone}`
    // );
    // return await request.get(
    //     API.data.userData + `?where=${whereClause}&loadRelations=friends&relationsDepth=1`
    // );
    try {
        return await Backendless.Data.of('user-data').find({
            where: `phoneNumber='${phone}'`,
        });
    } catch (error) {
        throw error;
    }
};

const getMockCardObjectId = async (id) => {
    // const query = encodeURIComponent(`cards_mock_data_id='${id}'`);
    // return await request.get(API.data.cardsMockData + `?where=${query}`);
    try {
        return await Backendless.Data.of('mock-cards').find({
            where: `cards_mock_data_id='${id}'`,
        });
    } catch (error) {
        throw error;
    }
};

const setUserData = async (userData) => {
    // return await request.post(API.data.userData, userData);
    try {
        return await Backendless.Data.of('user-data').save(userData);
    } catch (error) {
        throw error;
    }
};

const changeAttribute = async (objectId, data) => {
    // return await request.put(API.data.userData + '/' + objectId, data);
    try {
        return await Backendless.Data.of('user-data').save({ objectId, ...data });
    } catch (error) {
        throw error;
    }
};

const setRelation = async (parentObjectId, relationColumnName, children) => {
    // return await request.put(API.data.userData + `/${parentObjectId}/${relationName}`, body, token);
    try {
        return await Backendless.Data.of('user-data').addRelation(
            parentObjectId,
            relationColumnName,
            children
        );
    } catch (error) {
        throw error;
    }
};

const removeRelation = async (parentObjectId, relationColumnName, children) => {
    try {
        return await Backendless.Data.of('user-data').deleteRelation(
            parentObjectId,
            relationColumnName,
            children
        );
    } catch (error) {
        throw error;
    }
};

const removeFriend = async (currentUserId, friendId, token) => {
    try {
        // Beginning of the transaction
        const unitOfWork = new Backendless.UnitOfWork();

        // unitOfWork.deleteRelation(parentTableName, personObjectId, relationColumnName, giftIds);

        // Remove the relation from the user
        unitOfWork.deleteRelation('user-data', currentUserId, 'friends', [friendId]);

        // Remove the relation from the friend
        unitOfWork.deleteRelation('user-data', friendId, 'friends', [currentUserId]);

        // Remove the relation from friend favorites
        unitOfWork.deleteRelation('user-data', currentUserId, 'favorite_friends', [friendId]);

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        throw new Error(error);
    }
};

export const dataService = {
    getUserData,
    setUserData,
    getMockCardObjectId,
    setRelation,
    removeFriend,
    changeAttribute,
    getAllFriends,
    getByAttr,
    removeRelation,
};
