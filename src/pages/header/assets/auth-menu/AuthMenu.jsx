import { useContext } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';
import { Notifications } from './notifications/Notifications';

import styles from './auth-menu.module.css';

export const AuthMenu = ({ UserMenu = () => null }) => {
    const { auth, onLogoutHandler } = useContext(AuthContext);

    return (
        <div className={styles.headerDropdownContainer}>
            <Notifications />
            <UserMenu
                onLogoutHandler={onLogoutHandler}
                fullName={auth.fullName}
                avatar={auth.avatar}
            />
        </div>
    );
};
