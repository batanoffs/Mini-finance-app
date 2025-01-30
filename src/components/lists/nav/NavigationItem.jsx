import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './navigation-item.module.css';

export const NavigationItem = ({
    to,
    icon,
    title,
    name,
    img = {},
    className = '',
    onClick = () => {},
}) => {
    const image = img ? <img src={img.src} alt={img.alt} /> : null;

    return (
        <li className={className}>
            {image}
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending
                        ? `${styles.navLink} ${styles.pending}`
                        : isActive
                        ? `${styles.navLink} ${styles.active}`
                        : `${styles.navLink} `
                }
                name={name}
                to={to}
                onClick={onClick}
            >
                {icon && <FontAwesomeIcon className={styles.sidebarIcons} icon={icon} />}
                {title}
            </NavLink>
        </li>
    );
};
