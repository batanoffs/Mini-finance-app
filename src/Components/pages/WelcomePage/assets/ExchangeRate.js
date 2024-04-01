import { useEffect } from "react";
import styles from "./ExchangeRate.module.css";
import block from "../custom-block.module.css";
import { exchangeRateService } from "../../../../services/exchangeRateService";

export const ExchangeRate = ({ props }) => {
    // useEffect(() => {
    //     if (!props.hasLoaded) {
    //         exchangeRateService
    //             .getLatest("BGN")
    //             .then((response) => response.json())
    //             .then((data) =>
    //                 props.setRates((prevState) => {
    //                     const newState = prevState;
    //                     newState["USD"]["sell"] = data.conversion_rates.USD;
    //                     newState["GBP"]["sell"] = data.conversion_rates.GBP;
    //                     newState["EUR"]["sell"] = data.conversion_rates.EUR;
    //                     newState["AUD"]["sell"] = data.conversion_rates.AUD;
    //                     newState["SGD"]["sell"] = data.conversion_rates.SGD;
    //                     return newState;
    //                 })
    //             )
    //             .then(() => props.setHasLoaded(true))
    //             .catch((error) => console.log(error));

    //         exchangeRateService
    //             .getSpecificRate("USD", "BGN")
    //             .then((response) => response.json())
    //             .then(({ conversion_rate }) =>
    //                 props.setRates(prevState => ({
    //                     ...prevState,
    //                     USD: { ...prevState.USD, buy: conversion_rate }
    //                 }))
    //             ).catch((error) => console.log(error));

    //         exchangeRateService
    //             .getSpecificRate("GBP", "BGN")
    //             .then((response) => response.json())
    //             .then(({ conversion_rate }) =>
    //                 props.setRates(prevState => ({
    //                     ...prevState,
    //                     GBP: { ...prevState.GBP, buy: conversion_rate }
    //                 }))
    //             ).catch((error) => console.log(error));

    //         exchangeRateService
    //             .getSpecificRate("EUR", "BGN")
    //             .then((response) => response.json())
    //             .then(({ conversion_rate }) =>
    //                 props.setRates(prevState => ({
    //                     ...prevState,
    //                     EUR: { ...prevState.EUR, buy: conversion_rate }
    //                 }))
    //             ).catch((error) => console.log(error));
    //         exchangeRateService
    //             .getSpecificRate("AUD", "BGN")
    //             .then((response) => response.json())
    //             .then(({ conversion_rate }) =>
    //                 props.setRates(prevState => ({
    //                     ...prevState,
    //                     AUD: { ...prevState.AUD, buy: conversion_rate }
    //                 }))
    //             ).catch((error) => console.log(error));
    //         exchangeRateService
    //             .getSpecificRate("SGD", "BGN")
    //             .then((response) => response.json())
    //             .then(({ conversion_rate }) =>
    //                 props.setRates(prevState => ({
    //                     ...prevState,
    //                     SGD: { ...prevState.SGD, buy: conversion_rate }
    //                 }))
    //             ).catch((error) => console.log(error));
    //     }
    // }, []);

    return (
        <div className={`${block.customBlockContact} `}>
            <h5>Обменен курс</h5>
            <ul>
                {Array.from(Object.entries(props.rates)).map((rates) => {
                    return (
                        <li key={rates[0]} className={styles.exchangeWrapper}>
                            <div className={styles.currencyWrapper}>
                                <img
                                    src={rates[1].logo}
                                    className={styles.exchangeImage}
                                    alt={"logo"}
                                />

                                <div>
                                    <p>{rates[0]}</p>
                                </div>
                            </div>

                            <div>
                                <small>Продава</small>
                                <h6>{rates[1].sell}</h6>
                            </div>

                            <div>
                                <small>Купува</small>
                                <h6>{rates[1].buy}</h6>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

