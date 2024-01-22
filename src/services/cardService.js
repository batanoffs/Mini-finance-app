import * as request from './requester'
const baseURL = "https://cors-anywhere.herokuapp.com/https://api.apistacks.com/v1/generatecard";
const endpoints = {
    api: "?api_key=8b1fdb20-2d0e-4400-a885-a8b2b3331162",
}



const getCard = async () => {
    await request.get(`${baseURL}${endpoints.api}`)
}

export const cardService = {
    getCard,
}