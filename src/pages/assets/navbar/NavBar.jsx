import {
    faWallet,
    faGear,
    faHandshakeAngle,
    faHouse,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

import { useAuthContext } from '../../../contexts/AuthContext';
import { NavigationItem } from '../../../components/lists';

import styles from './navbar.module.css';

export const NavBar = () => {
    const { onLogoutHandler } = useAuthContext();
    return (
        <nav className={styles.sidebarMenu}>
            <ul className={styles.nav}>
                <NavigationItem name="overview" to="overview" title="Overview" icon={faHouse} />
                <NavigationItem name="wallet" to="wallet" title="Wallet" icon={faWallet} />
                <NavigationItem name="profile" to="profile" title="Profile" icon={faAddressCard} />
                <NavigationItem name="settings" to="settings" title="Settings" icon={faGear} />
                <NavigationItem
                    name="helpCenter"
                    to="help-center"
                    title="Help Center"
                    icon={faHandshakeAngle}
                />
                <NavigationItem
                    name="subscription"
                    className={styles.featureBox}
                    to="subscription"
                    title="Upgrade"
                    img={{
                        src: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/t2gvhqmfqhmvllw8f09f.png',
                        alt: 'subscription icon',
                    }}
                />
                <NavigationItem
                    name="logout"
                    title="Logout"
                    onClick={onLogoutHandler}
                    icon={faArrowRightFromBracket}
                />
            </ul>
        </nav>
    );
};
