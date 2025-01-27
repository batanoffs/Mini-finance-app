import { API } from '../constants/apiKeys';
import * as request from '../utils/requester';

const generateCard = async (id) => {
    try {
        const response = await Backendless.Data.of('mock-cards').find({
            where: `cards_mock_data_id='${id}'`,
        });

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

        // const query = encodeURIComponent(`cards_mock_data_id=${id}`);
        // const response = await request.get(API.data.cardsMockData + `?where=${query}`);

        // if (!response || response.length === 0) {
        //     throw new Error('Card not found');
        // }

        // const card = response[0];
        // if (!card || !card.expiration) {
        //     throw new Error('Invalid card data');
        // }

        // const date = card.expiration.split('/');
        // date.shift();

        // return {
        //     id: id,
        //     balance: card.balance,
        //     brand: card.brand,
        //     cvv: Number(card.cvv),
        //     expiration: date.join('/'),
        //     issuer: card.issuer,
        //     number: Number(card.number),
        //     objectId: card.objectId,
        // };
    } catch (error) {
        throw error;
    }
};

const getCard = async (id) => {
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

const topUp = async (objectId, value, token) => {
    // const data = { top_up: value };
    // return await request.put(API.data.cardsMockData + `/${objectId}`, data, token);
    try {
        return await Backendless.Data.of('mock-cards').save({ objectId, top_up: value }, token);
    } catch (error) {
        throw error;
    }
};

const getVirtualCardIds = async () => {
    // const query = encodeURIComponent(`property=cardId`);
    // return await request.get(API.data.userData + `?${query}`);
    try {
        return await Backendless.Data.of('user-data').find({ properties: 'cardId' });
    } catch (error) {
        throw error;
    }
};

const setVirtualCardRelation = async (parentObjectId, body) => {
    // return await request.put(API.data.userData + `/${parentObjectId}/virtualCard`, body);
    try {
        return await Backendless.Data.of('user-data').save({
            objectId: parentObjectId,
            virtualCard: body,
        });
    } catch (error) {
        throw error;
    }
};

const assignNewCardId = async () => {
    let newCardId;
    let checkMatch = true;

    try {
        while (checkMatch) {
            newCardId = Math.floor(Math.random() * 100) + 1;

            const getUsersCardIds = await getVirtualCardIds();

            if (getUsersCardIds && getUsersCardIds.message) return getUsersCardIds;

            const usersCardIds = getUsersCardIds.map((id) => id.cardId);

            checkMatch = usersCardIds.includes(newCardId);
        }

        return newCardId;
    } catch (error) {
        throw error;
    }
};

export const cardService = {
    generateCard,
    setVirtualCardRelation,
    getVirtualCardIds,
    assignNewCardId,
    getCard,
    topUp,
};
