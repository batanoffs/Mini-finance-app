import { Link } from 'react-router-dom';

import styles from './rainbow-button.module.css';

export const RainbowButton = ({ text, to, className }) => {
    return (
        <Link to={to} className={`${className} ${styles.rainbowButton}`} data-text={text}>
            <span>{text.toUpperCase()}</span>
        </Link>
    );
};
