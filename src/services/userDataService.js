import * as request from "./requester";

const baseURL = "https://lavishpart.backendless.app/api";
const endpoints = {
    userData: (id) =>
        `/data/UserData?where=ownerId='${id}'&loadRelations=virtualcard%2Cfriends`,
    setUserData: `/data/UserData`,
    mockCardObjectId: (id) => `/data/cardsMockData?where=id=${id}`,
    setRelation: (parentObjectId, childName) =>
        `/data/UserData/${parentObjectId}/${childName}`,
    getRelation: (parentObjectId, childName) =>
        `/data/UserData/${parentObjectId}?loadRelations=${childName}&relationsDepth=3`,
    attribute: (attribute, value) =>
        `/data/UserData?where=${attribute}='${value}'`,
    getAll: (id) => `/data/UserData?where=ownerId='${id}'`,
    transactions: "/data/transaction/unit-of-work",
    uploadURL: (fileName, ownerId, overwrite) =>
        `https://lavishpart.backendless.app/api/files/userData/${ownerId}/${fileName}?overwrite=${overwrite}`,
    filePathURL: (ownerId, fileName) =>
        `https://eu.backendlessappcontent.com/7E8BB132-A50E-1B4C-FFFA-B07295175E00/CB78EA12-92CA-45CA-89DE-A8109442A370/files/userData/${ownerId}/${fileName}`,
};

// SET USER PROFILE PICTURE
const uploadProfilePicture = async (fileName, ownerId,file, token, overwrite) => {
    const data = {
        fileURL: `${endpoints.filePathURL(ownerId, fileName)}`,
    };

    return await request.post(endpoints.uploadURL(fileName, ownerId, overwrite), data, file, token);
};

// ADD TRANSACTIONS
const addTransactions = async (data) => {
    return await request.post(`${baseURL}${endpoints.addTransactions}`, data);
};

// GET USER DATA
const getUserData = async (id) => {
    return await request.get(baseURL + endpoints.userData(id));
};

// SET USER DATA
const setUserData = async (userData) => {
    return await request.post(`${baseURL}${endpoints.setUserData}`, userData);
};

// GET VIRTUAL CARD
const getMockCardObjectId = async (id) => {
    return await request.get(baseURL + endpoints.mockCardObjectId(id));
};

// SET RELATIONSHIP
const makeTransaction = async (parentObjectId, childName, params) => {
    const body = {
        isolationLevelEnum: "READ_COMMITTED",
        operations: [
            {
                operationType: "CREATE",
                table: `${params.createTableName}`,
                opResultId: `${params.createTableId}`,
                payload: {
                    key1: "value",
                    key2: "value",
                },
            },
            {
                operationType: "SET_RELATION",
                table: `${params.relationTableName}`,
                opResultId: "OPRESULT-ID",
                payload: {
                    parentObject: `${params.relationparentObjectId}`,
                    relationColumn: `${params.relationColumn}`,
                    unconditional: [
                        "objectId VALUE",
                        "objectId VALUE",
                        "objectId VALUE",
                    ],
                },
            },
        ],
    };
    return await request.put(
        `${baseURL}${endpoints.setRelation(parentObjectId, childName)}`,
        body
    );
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

// SET/GET ATTRIBUTE
const getAttribute = async (attribute, value) => {
    return await request.get(baseURL + endpoints.attribute(attribute, value));
};

export const dataService = {
    uploadProfilePicture,
    getUserData,
    setUserData,
    getMockCardObjectId,
    setRelation,
    getAttribute,
    getRelation,
    addTransactions,
};
