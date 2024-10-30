import styles from './exchange-rate.module.css'

export const ListRate = (rate) => {
    return (
        <li key={rate[0]} className={styles.exchangeWrapper}>
            <div className={styles.currencyWrapper}>
                <img src={rate[1].logo} className={styles.exchangeImage} alt={'logo'} />

                <div>
                    <p>{rate[0]}</p>
                </div>
            </div>

            <div>
                <small>Sell</small>
                <h6>{rate[1].sell}</h6>
            </div>

            <div>
                <small>Buy</small>
                <h6>{rate[1].buy}</h6>
            </div>
        </li>
    )
}
