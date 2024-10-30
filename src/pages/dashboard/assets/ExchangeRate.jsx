import { useEffect } from 'react'

import { useExchangeRates } from '../../../hooks/useExchangeRates'
import containers from './containers.module.css'
import { ListRate } from './ListRate'

export const ExchangeRate = () => {
    const [fetchRate, rates] = useExchangeRates()

    useEffect(() => {
        fetchRate()
    }, [fetchRate])

    const mapRates = Array.from(Object.entries(rates)).map((rate) => ListRate(rate))

    return (
        <div className={`${containers.customBlockContact} `}>
            <h5>Exchange Rate</h5>
            <ul>{mapRates}</ul>
        </div>
    )
}
