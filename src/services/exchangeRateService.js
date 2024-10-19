import { API_CURRENCY_RATE } from '../constants/baseUrl'

export const getSpecificRate = async (from, to) => {
    return await fetch(API_CURRENCY_RATE.PAIR + `/${from}/${to}`)
}

export const getLatest = async (currencyCode) => {
    return await fetch(API_CURRENCY_RATE.LATEST + currencyCode)
}

export const exchangeRateService = {
    getSpecificRate,
    getLatest,
}
