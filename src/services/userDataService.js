import * as request from './requester'
import { baseURL } from '../constants/baseUrl'

const APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID
const REST_API_KEY = process.env.REACT_APP_APPLICATION_ID

const endpoints = {
    user: `${baseURL}/data/UserData`,
    transactions: `${baseURL}/data/transaction/unit-of-work`,
    cardsMockData: `${baseURL}/data/CardsMockData`,
    getUserById: (ownerId) => `${baseURL}/data/UserData/${ownerId}`,
    relation: (parentObjectId, relationName) =>
        `${baseURL}/data/UserData/${parentObjectId}/${relationName}`,
    loadSpecificRelation: (parentObjectId, relationName) =>
        `${baseURL}/data/UserData/${parentObjectId}?loadRelations=${relationName}&relationsDepth=1`,
    friends: (parentObjectId) =>
        `${baseURL}/data/UserData/${parentObjectId}/friends?loadRelations=friends&relationsDepth=1`,
    attribute: (attribute, value) => `${baseURL}/data/UserData?where=${attribute}='${value}'`,
    setAttribute: (objectId) => `${baseURL}/data/UserData/${objectId}`,
    uploadURL: (ownerId, fileName) => `${baseURL}/files/app/UserData/${ownerId}/${fileName}`,
    download: (fileName, path) =>
        `https://eu.backendlessappcontent.com/${APPLICATION_ID}/${REST_API_KEY}/files/${path}/${fileName}`,
}

// GET USER DATA
const getUserData = async (ownerId) => {
    const query = encodeURIComponent(`ownerId='${ownerId}'`) // EncodeURI
    return await request.get(
        `${endpoints.user}?loadRelations=virtualcard,friends,favorite_friends&where=${query}`
    )
}

// SET USER DATA
const setUserData = async (userData) => {
    return await request.post(endpoints.user, userData)
}

// GET ATTRIBUTE
const getAttribute = async (attribute, value) => {
    return await request.get(endpoints.attribute(attribute, value))
}

// SET ATTRIBUTE
const changeAttribute = async (objectId, data) => {
    return await request.put(endpoints.setAttribute(objectId), data)
}

// GET RELATIONS
const getRelation = async (parentObjectId, relationName) => {
    return await request.get(endpoints.loadSpecificRelation(parentObjectId, relationName))
}

// SET RELATIONS
const setRelation = async (parentObjectId, relationName, body, token) => {
    return await request.put(endpoints.relation(parentObjectId, relationName), body, token)
}

// GET ALL FRIENDS
const getAllFriends = async (parentObjectId) => {
    return await request.get(endpoints.friends(parentObjectId))
}

// REMOVE RELATION
const removeRelation = async (parentObjectId, relationName, friendId, token) => {
    return await request.del(
        endpoints.relation(parentObjectId, relationName),
        [friendId],
        null,
        token
    )
}

// GET VIRTUAL CARD
const getMockCardObjectId = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id='${id}'`)
    return await request.get(`${endpoints.cardsMockData}?where=${query}`)
}

// SET USER PROFILE PICTURE
const uploadProfilePicture = async (fileName, ownerId, file, token) => {
    const data = {
        fileURL: `${endpoints.uploadURL(ownerId, fileName)}`,
    }

    return await request.post(
        `${endpoints.uploadURL(ownerId, fileName)}?overwrite=true`,
        data,
        file,
        token
    )
}

const downloadFile = async (fileName, path) => {
    return await request.get(endpoints.download(fileName, path))
}

// ADD TRANSACTIONS
const addTransactions = async (data) => {
    return await request.post(endpoints.transactions, data)
}

const getUser = async (ownerId) => {
    return await request.get(endpoints.getUserById(ownerId))
}

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
    getUser,
    downloadFile,
}
