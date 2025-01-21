import { formatDate } from '../../../utils';

import styles from './transactions-list.module.css';

export const ListTransaction = ({ id, avatar, name, amount, date, isIncoming }) => {
    return (
        <li key={id} data-key={id} className={styles.transactionsBoxWrapper}>
            <img src={avatar} className={styles.profileImage} alt={'avatar'} />
            <div className={styles.detailsWrapper}>
                <div className={styles.detailsBox}>
                    <strong>{name}</strong>
                    <strong
                        className={styles.strong}
                        style={{ color: isIncoming ? 'green' : 'red' }}
                    >
                        {isIncoming ? '+' : '-'} {amount} BGN
                    </strong>
                </div>

                <div className={styles.detailsBox}>
                    <p>{formatDate(date)}</p>
                </div>
            </div>
        </li>
    );
};
