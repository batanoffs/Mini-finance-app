import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './button-tooltip.module.css';

export const ButtonTooltip = ({
    text,
    icon,
    onClick,
    type = null,
    size = 'medium',
    className = '',
    ...rest
}) => {
    return (
        <button
            className={`${styles.transactionBtn} ${styles[size]} ${className}`}
            data-text={text}
            onClick={() => onClick(type)}
            {...rest}
        >
            <FontAwesomeIcon className={styles.icon} icon={icon} />
        </button>
    );
};
