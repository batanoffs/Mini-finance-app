import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { faWallet, faGear, faHandshakeAngle, faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../../../contexts/AuthContext'
import { ListNav } from '../../../../components/lists'

import styles from './sidebar.module.css'

export const Sidebar = () => {
    const { onLogoutHandler } = useContext(AuthContext)
    return (
        <nav className={styles.sidebarMenu}>
            <ul className={styles.nav}>
                <ListNav name="overview" to="overview" title="Overview" icon={faHouse} />
                <ListNav name="wallet" to="wallet" title="Wallet" icon={faWallet} />
                <ListNav name="profile" to="profile" title="Profile" icon={faAddressCard} />
                <ListNav name="settings" to="settings" title="Settings" icon={faGear} />
                <ListNav name="helpCenter" to="help-center" title="Help Center" icon={faHandshakeAngle} />
                <ListNav name="logout" to="/" title="Logout" onClick={onLogoutHandler} icon={faArrowRightFromBracket} />
            </ul>
            <div className={styles.featureBox}>
                <img
                    src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/t2gvhqmfqhmvllw8f09f.png"
                    alt="credit card"
                />

                <NavLink className="custom-btn-fill" to="upgrade">
                    Upgrade
                </NavLink>
            </div>
        </nav>
    )
}
