import * as request from "./requester";

const baseURL = `https://notablepen.backendless.app/api`;


const endpoints = {
    generateCard: (id) => `/data/CardsMockData?where=cards_mock_data_id=${id}`,
    setRelation: (parentObjectId) => `/data/UserData/${parentObjectId}/virtualcard`,
    }
// https://cors-anywhere.herokuapp.com/

// EncodeURI

const generateCard = async (id) => {
    const response = await request.get(`${baseURL}${endpoints.generateCard(id)}`);
    const date = response[0].expiration.split("/");
    const money = response[0].balance.replace("$", "");
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

const setVirtualCardRelation = async(id, body) => {
    return await request.put(baseURL + endpoints.setRelation(id), body);
}

export const cardService = {
    generateCard,
    setVirtualCardRelation
};
