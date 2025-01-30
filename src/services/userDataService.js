// import * as request from '../utils/requester';
// import { API } from '../constants/apiKeys';

const getUserData = async (
    parentObjectId,
    loadRelations = ['virtualcard', 'friends', 'favorite_friends']
) => {
    // const query = encodeURIComponent(`ownerId='${ownerId}'`); // EncodeURI
    // return await request.get(
    //     API.data.userData + `?loadRelations=${loadRelations.join(',')}&where=${query}`
    // );

    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId, {
            relations: loadRelations,
        });
    } catch (error) {
        throw error;
    }
};

const getUser = async (parentObjectId) => {
    // return await request.get(API.data.userData + '/' + ownerId);
    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId);
    } catch (error) {
        throw error;
    }
};

const getRelation = async (parentObjectId, relations) => {
    // return await request.get(
    //     API.data.userData + `/${parentObjectId}?loadRelations=${relationName}&relationsDepth=1`
    // );

    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId, {
            relations,
            relationsDepth: 1,
        });
    } catch (error) {
        throw error;
    }
};

const getAllFriends = async (parentObjectId) => {
    // return await request.get(
    //     API.data.userData + `/${parentObjectId}/friends?loadRelations=friends&relationsDepth=1`
    // );
    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId, {
            properties: ['friends'],
            relations: 'friends',
            relationsDepth: 1,
        });
    } catch (error) {
        throw error;
    }
};

const checkUserFriend = async (parentObjectId, phone) => {
    // const whereClause = encodeURIComponent(
    //     `objectId = '${parentObjectId}' and 'friends.phoneNumber' LIKE ${phone}`
    // );
    // return await request.get(
    //     API.data.userData + `?where=${whereClause}&loadRelations=friends&relationsDepth=1`
    // );
    try {
        return await Backendless.Data.of('user-data').findById(parentObjectId, {
            where: `'friends.phoneNumber' LIKE ${phone}`,
            relations: 'friends',
            relationsDepth: 1,
        });
    } catch (error) {
        throw error;
    }
};

const getUserDataByAttribute = async (attribute, value, relations = [], relationsDepth = 0) => {
    // const query = encodeURIComponent(`${attribute}='${value}'`);
    // return await request.get(API.data.userData + `?where=${query}`);

    try {
        return Backendless.Data.of('user-data').find({
            where: `${attribute}='${value}'`,
            relations,
            relationsDepth,
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

const removeFriend = async (currentUserId, friendId, token) => {
    try {
        // Beginning of the transaction
        const unitOfWork = new Backendless.UnitOfWork();

        // unitOfWork.deleteRelation(parentTableName, personObjectId, relationColumnName, giftIds);
        
        // Remove the relation from the user
        unitOfWork.deleteRelation('user-data', currentUserId, 'friends', [friendId]);

        // Remove the relation from the friend
        unitOfWork.deleteRelation('user-data', friendId, 'friends', [currentUserId]);

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
    getRelation,
    setRelation,
    removeFriend,
    getUserDataByAttribute,
    changeAttribute,
    getAllFriends,
    getUser,
    checkUserFriend,
};
