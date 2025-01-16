import styles from './list-rate.module.css';

export const ListRate = (rate) => {
    return (
        <li key={rate[0]} className={styles.exchangeWrapper}>
            <div className={styles.currencyWrapper}>
                <img src={rate[1].logo} className={styles.exchangeImage} alt={'logo'} />

                <div>
                    <p>{rate[0]}</p>
                </div>
            </div>

            <div className={styles.flexWrapper}>
                <small>Sell</small>
                <b>{rate[1].sell}</b>
            </div>

            <div className={styles.flexWrapper}>
                <small>Buy</small>
                <b>{rate[1].buy}</b>
            </div>
        </li>
    );
};
