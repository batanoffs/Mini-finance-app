import {
    faWallet,
    faGear,
    faHandshakeAngle,
    faHouse,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../../../../contexts/AuthContext'

import styles from './sidebar.module.css'

export const Sidebar = () => {
    const { onLogoutHandler } = useContext(AuthContext)
    return (
        <nav className={styles.sidebarMenu}>
            <ul className={styles.nav}>
                <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? `${styles.navLink} ${styles.pending}`
                                : isActive
                                ? `${styles.navLink} ${styles.active}`
                                : `${styles.navLink}`
                        }
                        name="overview"
                        to="overview"
                    >
                        <FontAwesomeIcon className={styles.sidebarIcons} icon={faHouse} />
                        Overview
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? `${styles.navLink} ${styles.pending}`
                                : isActive
                                ? `${styles.navLink} ${styles.active}`
                                : `${styles.navLink}`
                        }
                        name="wallet"
                        to="wallet"
                    >
                        <FontAwesomeIcon className={styles.sidebarIcons} icon={faWallet} />
                        Wallet
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? `${styles.navLink} ${styles.pending}`
                                : isActive
                                ? `${styles.navLink} ${styles.active}`
                                : `${styles.navLink}`
                        }
                        name="profile"
                        to="profile"
                    >
                        <FontAwesomeIcon className={styles.sidebarIcons} icon={faAddressCard} />
                        Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? `${styles.navLink} ${styles.pending}`
                                : isActive
                                ? `${styles.navLink} ${styles.active}`
                                : `${styles.navLink}`
                        }
                        name="settings"
                        to="settings"
                    >
                        <FontAwesomeIcon className={styles.sidebarIcons} icon={faGear} />
                        Settings
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? `${styles.navLink} ${styles.pending}`
                                : isActive
                                ? `${styles.navLink} ${styles.active}`
                                : `${styles.navLink}`
                        }
                        name="helpCenter"
                        to="help-center"
                    >
                        <FontAwesomeIcon className={styles.sidebarIcons} icon={faHandshakeAngle} />
                        Help Center
                    </NavLink>
                </li>

                <li className={styles.featureBox}>
                    <img
                        src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/t2gvhqmfqhmvllw8f09f.png"
                        alt="credit card"
                    />

                    <NavLink className="custom-btn-fill" to="upgrade">
                        Upgrade
                    </NavLink>
                </li>

                <li style={{ position: 'absolute', bottom: `1em` }}>
                    <NavLink className={styles.navLink} onClick={onLogoutHandler} to="/">
                        <FontAwesomeIcon
                            className={styles.sidebarIcons}
                            icon={faArrowRightFromBracket}
                        />
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
