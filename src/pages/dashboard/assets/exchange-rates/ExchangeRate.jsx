import { useExchangeRates } from '../../../../hooks';
import { ListRate } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';

import styles from './exchange-rate.module.css';

export const ExchangeRate = () => {
    const rates = useExchangeRates();
    const mapRates = Array.from(Object.entries(rates)).map((rate) => ListRate(rate));

    return (
        <EmptyCard title="Exchange Rate">
            <ul className={styles.list}>{mapRates}</ul>
        </EmptyCard>
    );
};
