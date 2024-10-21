import { API } from '../constants/baseUrl'
import * as request from './requester'

const generateCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id=${id}`)
    const response = await request.get(API.MOCK_CREDIT_CARDS + `?where=${query}`)
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

const getCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id='${id}'`)
    return await request.get(API.MOCK_CREDIT_CARDS + `?where=${query}`)
}

const topUp = async (objectId, value, token) => {
    const data = { top_up: value }
    return await request.put(API.MOCK_CREDIT_CARDS + `/${objectId}`, data, token)
}

const getVirtualCardIds = async () => {
    const query = encodeURIComponent(`property=cardId`)
    return await request.get(API.USERS + `?${query}`)
}

const setVirtualCardRelation = async (parentObjectId, body) => {
    return await request.put(API.USERS + `/${parentObjectId}/virtualCard`, body)
}

export const cardService = {
    generateCard,
    setVirtualCardRelation,
    getVirtualCardIds,
    getCard,
    topUp,
}
