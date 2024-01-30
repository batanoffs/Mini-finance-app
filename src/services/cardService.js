import * as request from "./requester";

const baseURL = (id) =>
    `https://lavishpart.backendless.app/api/data/cardsMockData?where=id=${id}`;

// https://cors-anywhere.herokuapp.com/

// EncodeURI

const generateCard = async (id) => {
    const response = await request.get(baseURL(id));
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
    }
};

export const cardService = {
    generateCard,
};
