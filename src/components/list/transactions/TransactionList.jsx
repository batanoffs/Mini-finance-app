import { formatDate } from '../../../utils/formatDate'

import styles from './transactions-list.module.css'

export const TransactionList = ({ id, avatar, name, amount, transactionType, date }) => {
    return (
        <li key={id} data-key={id} className={styles.transactionsBoxWrapper}>
            <img src={avatar} className={styles.profileImage} alt={'avatar'} />
            <div className={styles.detailsWrapper}>
                <div className={styles.detailsBox}>
                    <strong>{name}</strong>
                    <strong
                        style={{
                            display: 'block',
                            textAlign: 'right',
                            color: 'green',
                        }}
                    >
                        + {amount}лв
                    </strong>
                </div>

                <div className={styles.detailsBox}>
                    <small>{(transactionType = 'sent')}</small>
                    <p>{formatDate(date)}</p>
                </div>
            </div>
        </li>
    )
}
