import * as request from './requester'
import { API } from '../constants/baseUrl'

const getUserData = async (ownerId) => {
    const query = encodeURIComponent(`ownerId='${ownerId}'`) // EncodeURI
    return await request.get(
        `${API.USERS}?loadRelations=virtualcard,friends,favorite_friends&where=${query}`
    )
}

const setUserData = async (userData) => {
    return await request.post(API.USERS, userData)
}

const getAttribute = async (attribute, value) => {
    const query = encodeURIComponent(`${attribute}='${value}'`)
    return await request.get(API.USERS + `?where=${query}`)
}

const changeAttribute = async (objectId, data) => {
    return await request.put(API.USERS + objectId, data)
}

const getRelation = async (parentObjectId, relationName) => {
    return await request.get(
        API.USERS + `${parentObjectId}?loadRelations=${relationName}&relationsDepth=1`
    )
}

const setRelation = async (parentObjectId, relationName, body, token) => {
    return await request.put(API.USERS + `${parentObjectId}/${relationName}`, body, token)
}

const getAllFriends = async (parentObjectId) => {
    return await request.get(
        API.USERS + parentObjectId + `/friends?loadRelations=friends&relationsDepth=1`
    )
}

const removeRelation = async (parentObjectId, relationName, friendId, token) => {
    return await request.del(
        API.USERS + `${parentObjectId}/${relationName}`,
        [friendId],
        null,
        token
    )
}

const getMockCardObjectId = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id='${id}'`)
    return await request.get(API.MOCK_CREDIT_CARDS + `?where=${query}`)
}

const uploadProfilePicture = async (fileName, ownerId, file, token) => {
    const data = {
        fileURL: API.FILES.USER + `${ownerId}/${fileName}`,
    }

    return await request.post(
        API.FILES.USER + `${ownerId}/${fileName}?overwrite=true`,
        data,
        file,
        token
    )
}

const downloadFile = async (fileName, path) => {
    return await request.get(API.FILES.DOWNLOAD + `${path}/${fileName}`)
}

const addTransactions = async (data) => {
    return await request.post(API.DATA_TRANSACTION, data)
}

const getUser = async (ownerId) => {
    return await request.get(API.USERS + ownerId)
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
