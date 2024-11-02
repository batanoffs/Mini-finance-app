import { NavLink } from 'react-router-dom'

import styles from './listNav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ListNav = ({ icon, title, name, to, onClick = () => {} }) => {
    return (
        <li>
            <NavLink
                className={({ isActive, isPending }) =>
                    isPending ? `${styles.navLink} ${styles.pending}` : isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`
                }
                name={name}
                to={to}
                onClick={onClick}
            >
                <FontAwesomeIcon className={styles.sidebarIcons} icon={icon} />
                {title}
            </NavLink>
        </li>
    )
}
