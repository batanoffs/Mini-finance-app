import { useCallback, useEffect, useState } from 'react';
import { exchangeRateService } from '../../../../services/exchangeRateService';
import { INITIAL_RATES } from './constants';

export const useExchangeRates = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [rates, setRates] = useState(INITIAL_RATES);

    const fetchRate = useCallback(() => {
        if (!hasLoaded) {
            exchangeRateService
                .getLatest('BGN')
                .then((response) => response.json())
                .then((data) =>
                    setRates((prevState) => {
                        const newState = prevState;
                        newState['USD']['sell'] = data.conversion_rates.USD;
                        newState['GBP']['sell'] = data.conversion_rates.GBP;
                        newState['EUR']['sell'] = data.conversion_rates.EUR;
                        newState['AUD']['sell'] = data.conversion_rates.AUD;
                        newState['SGD']['sell'] = data.conversion_rates.SGD;
                        return newState;
                    })
                )
                .then(() => setHasLoaded(true))
                .catch((error) => console.log(error));

            exchangeRateService
                .getSpecificRate('USD', 'BGN')
                .then((response) => response.json())
                .then(({ conversion_rate }) =>
                    setRates((prevState) => ({
                        ...prevState,
                        USD: { ...prevState.USD, buy: conversion_rate },
                    }))
                )
                .catch((error) => console.log(error));

            exchangeRateService
                .getSpecificRate('GBP', 'BGN')
                .then((response) => response.json())
                .then(({ conversion_rate }) =>
                    setRates((prevState) => ({
                        ...prevState,
                        GBP: { ...prevState.GBP, buy: conversion_rate },
                    }))
                )
                .catch((error) => console.log(error));

            exchangeRateService
                .getSpecificRate('EUR', 'BGN')
                .then((response) => response.json())
                .then(({ conversion_rate }) =>
                    setRates((prevState) => ({
                        ...prevState,
                        EUR: { ...prevState.EUR, buy: conversion_rate },
                    }))
                )
                .catch((error) => console.log(error));
            exchangeRateService
                .getSpecificRate('AUD', 'BGN')
                .then((response) => response.json())
                .then(({ conversion_rate }) =>
                    setRates((prevState) => ({
                        ...prevState,
                        AUD: { ...prevState.AUD, buy: conversion_rate },
                    }))
                )
                .catch((error) => console.log(error));
            exchangeRateService
                .getSpecificRate('SGD', 'BGN')
                .then((response) => response.json())
                .then(({ conversion_rate }) =>
                    setRates((prevState) => ({
                        ...prevState,
                        SGD: { ...prevState.SGD, buy: conversion_rate },
                    }))
                )
                .catch((error) => console.log(error));
        }
    }, [hasLoaded]);

    useEffect(() => {
        fetchRate;
    }, [fetchRate]);

    return rates;
};
