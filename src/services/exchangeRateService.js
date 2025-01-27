import { API } from '../constants/apiKeys';

export const getSpecificRate = async (from, to) => {
    try {
        return await fetch(API.rates.pair + `/${from}/${to}`);
    } catch (error) {
        throw error;
    }
};

export const getLatest = async (currencyCode) => {
    try {
        return await fetch(API.rates.latest + currencyCode);
    } catch (error) {
        throw error;
    }
};

export const exchangeRateService = {
    getSpecificRate,
    getLatest,
};
