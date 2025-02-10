import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './button-tooltip.module.css';

export const ButtonTooltip = ({
    text,
    icon,
    toggleModal,
    size = 'medium',
    className = '',
    ...rest
}) => {
    const onToggleModal = () => {
        toggleModal(true);
    };

    return (
        <button
            className={`${styles.transactionBtn} ${styles[size]} ${className}`}
            data-text={text}
            onClick={onToggleModal}
            {...rest}
        >
            <FontAwesomeIcon className={styles.icon} icon={icon} />
        </button>
    );
};
