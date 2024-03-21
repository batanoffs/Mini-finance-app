import * as request from "./requester";

const baseURL = `https://notablepen.backendless.app/api`;

const endpoints = {
    generateCard: `/data/CardsMockData`,
    setRelation: (parentObjectId) => `/data/UserData/${parentObjectId}/virtualcard`,
    }
// https://cors-anywhere.herokuapp.com/

const generateCard = async (id) => {
    const query = encodeURIComponent(`cards_mock_data_id=${id}`); // EncodeURI
    const response = await request.get(`${baseURL}${endpoints.generateCard}?where=${query}`);
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
