import * as request from '../utils/requester';
import { API } from '../constants/apiKeys';

const getUserData = async (
    ownerId,
    loadRelations = ['virtualcard', 'friends', 'favorite_friends']
) => {
    const query = encodeURIComponent(`ownerId='${ownerId}'`); // EncodeURI
    return await request.get(
        API.data.userData + `?loadRelations=${loadRelations.join(',')}&where=${query}`
    );
};

const setUserData = async (userData) => {
    return await request.post(API.data.userData, userData);
};

const getUserDataByAttribute = async (attribute, value) => {
    const query = encodeURIComponent(`${attribute}='${value}'`);
    return await request.get(API.data.userData + `?where=${query}`);
};

const changeAttribute = async (objectId, data) => {
    return await request.put(API.data.userData + '/' + objectId, data);
};

const getRelation = async (parentObjectId, relationName) => {
    return await request.get(
        API.data.userData + `/${parentObjectId}?loadRelations=${relationName}&relationsDepth=1`
    );
};

const setRelation = async (parentObjectId, relationName, body, token) => {
    return await request.put(API.data.userData + `/${parentObjectId}/${relationName}`, body, token);
};

const getAllFriends = async (parentObjectId) => {
    return await request.get(
        API.data.userData + `/${parentObjectId}/friends?loadRelations=friends&relationsDepth=1`
    );
};

const removeRelation = async (parentObjectId, relationName, friendId, token) => {
    return await request.del(
        API.data.userData + `/${parentObjectId}/${relationName}`,
        [friendId],
        null,
        token
    );
};

const getMockCardObjectId = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id='${id}'`);
    return await request.get(API.data.cardsMockData + `?where=${query}`);
};

const uploadProfilePicture = async (fileName, ownerId, file, token) => {
    const filePath = {
        fileURL: API.files.userData + `/${ownerId}/${fileName}`,
    };

    return await request.post(
        API.files.userData + `/${ownerId}/${fileName}?overwrite=true`,
        filePath,
        file,
        token
    );
};

const downloadFile = async (fileName, path) => {
    return await request.get(API.files.download + `/${path}/${fileName}`);
};

const addTransactions = async (data) => {
    return await request.post(API.data.transactions, data);
};

const getUser = async (ownerId) => {
    return await request.get(API.data.userData + '/' + ownerId);
};

export const dataService = {
    uploadProfilePicture,
    getUserData,
    setUserData,
    getMockCardObjectId,
    getRelation,
    setRelation,
    removeRelation,
    getUserDataByAttribute,
    changeAttribute,
    addTransactions,
    getAllFriends,
    getUser,
    downloadFile,
};
