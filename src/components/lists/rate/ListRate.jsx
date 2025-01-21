import styles from './list-rate.module.css';

export const ListRate = (rate) => {
    return (
        <li key={rate[0]} className={styles.exchangeWrapper}>
            <div className={styles.currencyWrapper}>
                <img src={rate[1].logo} className={styles.exchangeImage} alt={'logo'} />

                <div>
                    <small>{rate[0]}</small>
                </div>
            </div>

            <div className={styles.flexWrapper}>
                <strong>Sell</strong>
                <b>{rate[1].sell}</b>
            </div>

            <div className={styles.flexWrapper}>
                <strong>Buy</strong>
                <b>{rate[1].buy}</b>
            </div>
        </li>
    );
};
