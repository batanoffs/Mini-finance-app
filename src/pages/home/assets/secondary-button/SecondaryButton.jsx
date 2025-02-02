import { Link } from 'react-router-dom';

import styles from './secondary-button.module.css';

export const SecondaryButton = ({ text, to, className }) => {
    return (
        <Link to={to} className={styles.secondaryButton}>
            <span>{text.toUpperCase()}</span>
        </Link>
    );
};
