import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './banking-button.module.css'

export const BankingButton = ({ type, text, icon, onClick }) => {
    return (
        <button className={styles.transactionBtn} data-text={text} onClick={() => onClick(type)}>
            <FontAwesomeIcon className={styles.icon} icon={icon} />
        </button>
    )
}
