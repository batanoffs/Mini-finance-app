import * as request from "./requester";

const baseURL = "https://notablepen.backendless.app/api";
const endpoints = {
    userData: (id) => `/data/UserData?where=ownerId='${id}'&loadRelations=virtualcard%2Cfriends`,
    setUserData: `/data/UserData`,
    mockCardObjectId: (id) => `/data/CardsMockData?where=cards_mock_data_id=${id}`,
    setRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}/${childName}`,
    getRelation: (parentObjectId, childName) => `/data/UserData/${parentObjectId}?loadRelations=${childName}&relationsDepth=3`,
    attribute: (attribute, value) => `/data/UserData?where=${attribute}='${value}'`,
    setAttribute: (objectId) => `/data/UserData/${objectId}`,
    getAll: (id) => `/data/UserData?where=ownerId='${id}'`,
    transactions: "/data/transaction/unit-of-work",
    uploadURL: (fileName, ownerId) => `https://notablepen.backendless.app/api/files/app/UserData/${ownerId}/${fileName}?overwrite=true`,
    filePathURL: (ownerId, fileName) => `https://notablepen.backendless.app/api/files/app/UserData/${ownerId}/${fileName}`,
};

// GET USER DATA
const getUserData = async (id) => {
    return await request.get(baseURL + endpoints.userData(id));
};
// SET USER DATA
const setUserData = async (userData) => {
    return await request.post(`${baseURL}${endpoints.setUserData}`, userData);
};

// GET ATTRIBUTE
const getAttribute = async (attribute, value) => {
    return await request.get(baseURL + endpoints.attribute(attribute, value));
};
// SET ATTRIBUTE
const changeAttribute = async (objectId, data) => {
    return await request.put(baseURL + endpoints.setAttribute(objectId), data);
};

// GET RELATIONS
const getRelation = async (parentObjectId, childName) => {
    return await request.get(
        `${baseURL}${endpoints.getRelation(parentObjectId, childName)}`
    );
};
// SET RELATIONS
const setRelation = async (parentObjectId, childName, body) => {
    return await request.put(
        `${baseURL}${endpoints.setRelation(parentObjectId, childName)}`,
        body
    );
};

// GET VIRTUAL CARD
const getMockCardObjectId = async (id) => {
    return await request.get(baseURL + endpoints.mockCardObjectId(id));
};

// SET USER PROFILE PICTURE
const uploadProfilePicture = async (fileName, ownerId, file, token) => {
    const data = {
        "fileURL": `${endpoints.filePathURL(ownerId, fileName)}`
    };

    return await request.post(
        endpoints.uploadURL(fileName, ownerId),
        data,
        file,
        token
    );
};

// ADD TRANSACTIONS
const addTransactions = async (data) => {
    return await request.post(`${baseURL}${endpoints.addTransactions}`, data);
};

export const dataService = {
    uploadProfilePicture,
    getUserData,
    setUserData,
    getMockCardObjectId,
    getRelation,
    setRelation,
    getAttribute,
    changeAttribute,
    addTransactions,
};
