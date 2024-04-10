import { baseURL } from '../constants/baseUrl'
import * as request from './requester'

const endpoints = {
    user: `${baseURL}/data/UserData`,
    mockcards: `${baseURL}/data/CardsMockData`,
    setRelation: (parentObjectId) => `${baseURL}/data/UserData/${parentObjectId}/virtualcard`,
}
// https://cors-anywhere.herokuapp.com/

const generateCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id=${id}`) // EncodeURI
    const response = await request.get(`${endpoints.mockcards}?where=${query}`)
    const date = response[0].expiration.split('/')
    const money = response[0].balance
    date.shift()

    return {
        id: id,
        balance: money,
        brand: response[0].brand,
        cvv: Number(response[0].cvv),
        expiration: date.join('/'),
        issuer: response[0].issuer,
        number: Number(response[0].number),
        objectId: response[0].objectId,
    }
}

// GET VIRTUAL CARD
const getCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id='${id}'`)
    return await request.get(`${endpoints.mockcards}?where=${query}`)
}

const topUp = async (objectId, value, token) => {
    const data = { top_up: value }
    return await request.put(`${endpoints.mockcards}/${objectId}`, data, token)
}

const getVirtualcardIds = async () => {
    const query = encodeURIComponent(`property=cardId`) // EncodeURI
    return await request.get(`${endpoints.user}?${query}`)
}

const setVirtualCardRelation = async (parentObjectId, body) => {
    return await request.put(endpoints.setRelation(parentObjectId), body)
}

export const cardService = {
    generateCard,
    setVirtualCardRelation,
    getVirtualcardIds,
    getCard,
    topUp,
}
