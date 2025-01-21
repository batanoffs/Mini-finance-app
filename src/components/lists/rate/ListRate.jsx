import styles from './list-rate.module.css';

export const ListRate = ({ name, buy, sell, logo }) => {
    return (
        <li className={styles.exchangeWrapper}>
            <div className={styles.currencyWrapper}>
                <img src={logo} className={styles.exchangeImage} alt={'logo'} />
                <strong>{name}</strong>
            </div>

            <p>{sell}</p>

            <p>{buy}</p>
        </li>
    );
};
