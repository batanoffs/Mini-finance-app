import { baseURL } from "../constants/baseUrl";
import * as request from "./requester";

const endpoints = {
    user: `${baseURL}/data/UserData`,
    generateCard: `/data/CardsMockData`,
    setRelation: (parentObjectId) => `${baseURL}/data/UserData/${parentObjectId}/virtualcard`,
    }
// https://cors-anywhere.herokuapp.com/

const generateCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id=${id}`); // EncodeURI
    const response = await request.get(`${baseURL}${endpoints.generateCard}?where=${query}`);
    const date = response[0].expiration.split("/");
    const money = response[0].balance;
    date.shift();

    return {
        id: id,
        balance: money,
        brand: response[0].brand,
        cvv: Number(response[0].cvv),
        expiration: date.join("/"),
        issuer: response[0].issuer,
        number: Number(response[0].number),
        objectId: response[0].objectId,
    };
};

const getVirtualcardIds = async () => {
    const query = encodeURIComponent(`property=cardId`); // EncodeURI
    return await request.get(`${endpoints.user}?${query}`);
  }

const setVirtualCardRelation = async(parentObjectId, body) => {
    return await request.put(endpoints.setRelation(parentObjectId), body);
}

export const cardService = {
    generateCard,
    setVirtualCardRelation,
    getVirtualcardIds
};
