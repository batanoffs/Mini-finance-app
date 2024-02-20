const baseURL = "https://v6.exchangerate-api.com/v6/d1f8fda001af7213a3a566b8";
const endpoints = {
    getRateFromTo: (from, to) => `/pair/${from}/${to}`,
    getLatest: (currencyCode) => `/latest/${currencyCode}`,
}

export const getSpecificRate = async (from, to) => {
    return await fetch(`${baseURL}${endpoints.getRateFromTo(from, to)}`);
}

export const getLatest = async (currencyCode) => {
    return await fetch(`${baseURL}${endpoints.getLatest(currencyCode)}`);
}

export const exchangeRateService = {
    getSpecificRate,
    getLatest
}