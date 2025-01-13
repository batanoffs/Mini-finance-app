import { useExchangeRates } from '../../../../../../hooks'
import { ListRate } from '../../../../../../components/lists'
import { EmptyCard } from '../../../../../../components/cards'

export const ExchangeRate = () => {
    const rates = useExchangeRates()
    const mapRates = Array.from(Object.entries(rates)).map((rate) => ListRate(rate))

    return (
        <EmptyCard title="Exchange Rate">
            <ul style={{ display: 'flex', flexDirection: 'column' }}>{mapRates}</ul>
        </EmptyCard>
    )
}
