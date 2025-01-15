import { useContext } from 'react';

import { faWallet, faGear, faHandshakeAngle, faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../../../contexts/AuthContext';
import { ListNav } from '../../../components/lists';

import styles from './navbar.module.css';

export const NavBar = () => {
    const { onLogoutHandler } = useContext(AuthContext);
    return (
        <nav className={styles.sidebarMenu}>
            <ul className={styles.nav}>
                <ListNav name="overview" to="overview" title="Overview" icon={faHouse} />
                <ListNav name="wallet" to="wallet" title="Wallet" icon={faWallet} />
                <ListNav name="profile" to="profile" title="Profile" icon={faAddressCard} />
                <ListNav name="settings" to="settings" title="Settings" icon={faGear} />
                <ListNav
                    name="helpCenter"
                    to="help-center"
                    title="Help Center"
                    icon={faHandshakeAngle}
                />
                <ListNav
                    name="subscription"
                    className={styles.featureBox}
                    to="subscription"
                    title="Upgrade"
                    img={{
                        src: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/t2gvhqmfqhmvllw8f09f.png',
                        alt: 'subscription icon',
                    }}
                />
                <ListNav
                    name="logout"
                    title="Logout"
                    onClick={onLogoutHandler}
                    icon={faArrowRightFromBracket}
                />
            </ul>
        </nav>
    );
};
