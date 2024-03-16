import * as request from "./requester";

const baseUrl = "https://notablepen.backendless.app/api";
const endpoints = {
  user: `${baseUrl}/data/UserData`,
  transactions: `${baseUrl}/data/transaction/unit-of-work`,
  relation: (parentObjectId, relationName) =>
    `${baseUrl}/data/UserData/${parentObjectId}/${relationName}`,
  loadSpecificRelation: (parentObjectId, relationName) =>
    `${baseUrl}/data/UserData/${parentObjectId}?loadRelations=${relationName}&relationsDepth=1`,
  friends: (parentObjectId) =>
    `${baseUrl}/data/UserData/${parentObjectId}/friends?loadRelations=friends&relationsDepth=1`,
  attribute: (attribute, value) =>
    `${baseUrl}/data/UserData?where=${attribute}='${value}'`,
  setAttribute: (objectId) => 
    `${baseUrl}/data/UserData/${objectId}`,
  uploadURL: (ownerId, fileName) =>
    `${baseUrl}/files/app/UserData/${ownerId}/${fileName}`,
};
// -    getUserCardFriends: (ownerId) => `/data/UserData?where=ownerId='${ownerId}'&loadRelations=virtualcard%2Cfriends`,
// -    setUserData: `/data/UserData`,
// -    mockCardObjectId: (id) => `/data/CardsMockData?where=cards_mock_data_id=${id}`,
// -    targetRelation: (parentObjectId, relationName) => `/data/UserData/${parentObjectId}/${relationName}`,
// -    loadSpecificRelation: (parentObjectId, relationName) => `/data/UserData/${parentObjectId}?loadRelations=${relationName}&relationsDepth=1`,
// -    getFriends: (parentObjectId) => `/data/UserData/${parentObjectId}/friends?loadRelations=friends&relationsDepth=1`,
// -    attribute: (attribute, value) => `/data/UserData?where=${attribute}='${value}'`,
// -    setAttribute: (objectId) => `/data/UserData/${objectId}`,
// -    getAll: (ownerId) => `/data/UserData?where=ownerId='${ownerId}'`,
// -    transactions: "/data/transaction/unit-of-work",
// -    uploadURL: (ownerId, fileName) => `https://notablepen.backendless.app/api/files/app/UserData/${ownerId}/${fileName}?overwrite=true`,
// -    filePathURL: (ownerId, fileName) => `https://notablepen.backendless.app/api/files/app/UserData/${ownerId}/${fileName}`,

// GET USER DATA
const getUserData = async (id) => {
  return await request.get(`${endpoints.user}?where=ownerId='${id}'&loadRelations=virtualcard,friends`);
};

// SET USER DATA
const setUserData = async (userData) => {
  return await request.post(endpoints.user, userData);
};

// GET ATTRIBUTE
const getAttribute = async (attribute, value) => {
  return await request.get(endpoints.attribute(attribute, value));
};

// SET ATTRIBUTE
const changeAttribute = async (objectId, data) => {
  return await request.put(endpoints.setAttribute(objectId), data);
};

// GET RELATIONS
const getRelation = async (parentObjectId, relationName) => {
  return await request.get(endpoints.loadSpecificRelation(parentObjectId, relationName));
};

// GET ALL FRIENDS
const getAllFriends = async (parentObjectId) => {
  return await request.get(endpoints.friends(parentObjectId));
};

// SET RELATIONS
const setRelation = async (parentObjectId, relationName, body) => {
  return await request.put(endpoints.relation(parentObjectId, relationName), body);
};

// REMOVE RELATION
const removeRelation = async (parentObjectId, relationName, friendId, token) => {
  return await request.del(endpoints.relation(parentObjectId, relationName), [friendId], null, token);
};

// GET VIRTUAL CARD
const getMockCardObjectId = async (id) => {
  return await request.get(`${baseUrl}/data/CardsMockData?where=cards_mock_data_id=${id}`);
};

// SET USER PROFILE PICTURE
const uploadProfilePicture = async (fileName, ownerId, file, token) => {
  const data = {
    "fileURL": `${endpoints.uploadURL(ownerId, fileName)}`,
  };

  return await request.post(`${endpoints.uploadURL(ownerId, fileName)}?overwrite=true`, data, file, token);
};

// ADD TRANSACTIONS
const addTransactions = async (data) => {
  return await request.post(endpoints.transactions, data);
};

export const dataService = {
    uploadProfilePicture,
    getUserData,
    setUserData,
    getMockCardObjectId,
    getRelation,
    setRelation,
    removeRelation,
    getAttribute,
    changeAttribute,
    addTransactions,
    getAllFriends,
};
