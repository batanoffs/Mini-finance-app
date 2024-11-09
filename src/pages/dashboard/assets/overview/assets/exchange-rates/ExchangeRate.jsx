import { useExchangeRates } from '../../../../../../hooks'
import { ListRate } from '../../../../../../components/list'

import styles from './exchange-rate.module.css'

export const ExchangeRate = () => {
    const rates = useExchangeRates()

    const mapRates = Array.from(Object.entries(rates)).map((rate) => ListRate(rate))

    return (
        <div className={`${styles.customBlockContact} `}>
            <h5>Exchange Rate</h5>
            <ul>{mapRates}</ul>
        </div>
    )
}
