import { API } from '../constants/apiKeys';

export const getSpecificRate = async (from, to) => {
    return await fetch(API.rates.pair + `/${from}/${to}`);
};

export const getLatest = async (currencyCode) => {
    return await fetch(API.rates.latest + currencyCode);
};

export const exchangeRateService = {
    getSpecificRate,
    getLatest,
};
