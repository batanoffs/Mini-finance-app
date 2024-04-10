import { exchangerateURL } from '../constants/baseUrl'

const endpoints = {
    getRateFromTo: (from, to) => `/pair/${from}/${to}`,
    getLatest: (currencyCode) => `/latest/${currencyCode}`,
}

export const getSpecificRate = async (from, to) => {
    return await fetch(`${exchangerateURL}${endpoints.getRateFromTo(from, to)}`)
}

export const getLatest = async (currencyCode) => {
    return await fetch(`${exchangerateURL}${endpoints.getLatest(currencyCode)}`)
}

export const exchangeRateService = {
    getSpecificRate,
    getLatest,
}
