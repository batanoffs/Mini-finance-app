import * as request from "./requester";

const baseURL = (id) =>
    `https://lavishpart.backendless.app/api/data/cardsMockData?where=id=${id}`;

// https://cors-anywhere.herokuapp.com/

const getCard = async (id) => {
    console.log(`Card with id has been used: ${id}`);
    const response = await request.get(baseURL(id));
    const date = response[0].expiration.split("/");
    const money = response[0].balance.replace("$", "");
    date.shift();

    const data = {
        id: id,
        balance: 0,
        brand: response[0].brand,
        cvv: Number(response[0].cvv),
        expiration: date.join("/"),
        issuer: response[0].issuer,
        number: Number(response[0].number),
        objectId: response[0].objectId,
    };
    return data;
};

export const cardService = {
    getCard,
};
