import { ListRate } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';
import { useExchangeRates } from './useExchangeRates';

import styles from './exchange-rate.module.css';

export const ExchangeRate = () => {
    const rates = useExchangeRates();

    const RateItems = Array.from(Object.entries(rates))
        .map((entry) => entry[1])
        .map((rate) => <ListRate key={rate.name} {...rate} />);

    return (
        <EmptyCard>
            <div className={styles.title}>
                <p>Currency</p>
                <p>Sell</p>
                <p>Buy</p>
            </div>
            {RateItems ? (
                <ul className={styles.list}>{RateItems}</ul>
            ) : (
                <p>Exchange rates unavailable</p>
            )}
        </EmptyCard>
    );
};
