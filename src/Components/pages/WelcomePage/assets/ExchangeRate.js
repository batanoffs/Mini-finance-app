import USLogo from "../../../../images/flag/united-states.png";
import singaporeLogo from "../../../../images/flag/singapore.png";
import UKLogo from "../../../../images/flag/united-kingdom.png";
import australiaLogo from "../../../../images/flag/australia.png";
import europeLogo from "../../../../images/flag/european-union.png";
import { exchangeRateService } from "../../../../services/exchangeRateService";
import { useEffect, useState } from "react";
import styles from "./ExchangeRate.module.css";
import block from "../custom-block.module.css";

export const ExchangeRate = () => {
    // CONSTANTS

    const CURRENCIES = {
        USD: "USD",
        BGN: "BGN",
        GBP: "GBP",
        EUR: "EUR",
        AUD: "AUD",
        SGD: "SGD",
    };

    const [rates, setRates] = useState({
        USD: { name: CURRENCIES.USD, buy: 0, sell: 0, logo: USLogo },
        GBP: { name: CURRENCIES.GBP, buy: 0, sell: 0, logo: UKLogo },
        EUR: { name: CURRENCIES.EUR, buy: 0, sell: 0, logo: europeLogo },
        AUD: { name: CURRENCIES.AUD, buy: 0, sell: 0, logo: australiaLogo },
        SGD: { name: CURRENCIES.SGD, buy: 0, sell: 0, logo: singaporeLogo },
    });

    useEffect(() => {
        exchangeRateService
            .getLatest(CURRENCIES.BGN)
            .then((response) => response.json())
            .then((data) =>
                setRates((prevState) => {
                    const newState = prevState;
                    newState["USD"]["sell"] = data.conversion_rates.USD;
                    newState["GBP"]["sell"] = data.conversion_rates.GBP;
                    newState["EUR"]["sell"] = data.conversion_rates.EUR;
                    newState["AUD"]["sell"] = data.conversion_rates.AUD;
                    newState["SGD"]["sell"] = data.conversion_rates.SGD;
                    return newState;
                })
            )
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        exchangeRateService
            .getSpecificRate(CURRENCIES.USD, CURRENCIES.BGN)
            .then((response) => response.json())
            .then((data) => {
                setRates((prevState) => {
                    const newState = prevState;
                    newState["USD"]["buy"] = data.conversion_rate;
                    return newState;
                });
            })
            .catch((error) => console.log(error));
        exchangeRateService
            .getSpecificRate(CURRENCIES.GBP, CURRENCIES.BGN)
            .then((response) => response.json())
            .then((data) => {
                setRates((prevState) => {
                    const newState = prevState;
                    newState["GBP"]["buy"] = data.conversion_rate;
                    return newState;
                });
            })
            .catch((error) => console.log(error));
        exchangeRateService
            .getSpecificRate(CURRENCIES.EUR, CURRENCIES.BGN)
            .then((response) => response.json())
            .then((data) => {
                setRates((prevState) => {
                    const newState = prevState;
                    newState["EUR"]["buy"] = data.conversion_rate;
                    return newState;
                });
            })
            .catch((error) => console.log(error));
        exchangeRateService
            .getSpecificRate(CURRENCIES.AUD, CURRENCIES.BGN)
            .then((response) => response.json())
            .then((data) => {
                setRates((prevState) => {
                    const newState = prevState;
                    newState["AUD"]["buy"] = data.conversion_rate;
                    return newState;
                });
            })
            .catch((error) => console.log(error));
        exchangeRateService
            .getSpecificRate(CURRENCIES.SGD, CURRENCIES.BGN)
            .then((response) => response.json())
            .then((data) => {
                setRates((prevState) => {
                    const newState = prevState;
                    newState["SGD"]["buy"] = data.conversion_rate;
                    return newState;
                });
            })
            .catch((error) => console.log(error));
    }, []);
    
    return (
        <div
            className={`${block.customBlockTransactions} ${block.customBlock}`}
        >
            <h5>Обменен курс</h5>
            <ul>
                {Array.from(Object.entries(rates)).map((rates) => {
                    console.log(rates[0]);

                    return (
                        <li key={rates[0][0]} className={styles.exchangeWrapper}>
                            <div className={styles.currencyWrapper}>
                                <img
                                    src={rates[1].logo}
                                    className={styles.exchangeImage}
                                    alt={"logo"}
                                />

                                <div>
                                    <p className={styles.currency}>
                                        {rates[0]}
                                    </p>
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
