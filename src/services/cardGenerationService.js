import { API } from '../constants/baseUrl';
import * as request from '../utils/requester';

const generateCard = async (id) => {
    try {
        const query = encodeURIComponent(`cards_mock_data_id=${id}`);
        const response = await request.get(API.MOCK_CREDIT_CARDS + `?where=${query}`);
        
        if (!response || response.length === 0) {
            throw new Error('Card not found');
        }

        const card = response[0];
        if (!card || !card.expiration) {
            throw new Error('Invalid card data');
        }

        const date = card.expiration.split('/');
        date.shift();

        return {
            id: id,
            balance: card.balance,
            brand: card.brand,
            cvv: Number(card.cvv),
            expiration: date.join('/'),
            issuer: card.issuer,
            number: Number(card.number),
            objectId: card.objectId,
        };
    } catch (error) {
        console.error('Error generating card:', error);
        throw error;
    }
};

const getCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id='${id}'`);
    return await request.get(API.MOCK_CREDIT_CARDS + `?where=${query}`);
};

const topUp = async (objectId, value, token) => {
    const data = { top_up: value };
    return await request.put(API.MOCK_CREDIT_CARDS + `/${objectId}`, data, token);
};

const getVirtualCardIds = async () => {
    const query = encodeURIComponent(`property=cardId`);
    return await request.get(API.USERS + `?${query}`);
};

const setVirtualCardRelation = async (parentObjectId, body) => {
    return await request.put(API.USERS + `/${parentObjectId}/virtualCard`, body);
};

const assignNewCardId = async () => {
    let newCardId
    let checkMatch = true
    try {
        while (checkMatch) {
            newCardId = Math.floor(Math.random() * 100) + 1
            const getUsersCardIds = await getVirtualCardIds()
            if (getUsersCardIds && getUsersCardIds.message) return getUsersCardIds
            const usersCardIds = getUsersCardIds.map((id) => id.cardId)
            checkMatch = usersCardIds.includes(newCardId)
        }
        return newCardId
    } catch (error) {
        return error
    }
}

export const cardService = {
    generateCard,
    setVirtualCardRelation,
    getVirtualCardIds,
    assignNewCardId,
    getCard,
    topUp,
};
