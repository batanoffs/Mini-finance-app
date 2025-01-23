import { useContext } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';
import { Notifications } from './assets/notifications/Notifications';
import { UserMenu } from './assets/user-menu/UserMenu';

import styles from './auth-menu.module.css';

export const AuthMenu = ({ ProfileMenu = UserMenu }) => {
    const { auth, onLogoutHandler } = useContext(AuthContext);

    return (
        <div className={styles.headerDropdownContainer}>
            <Notifications />
            <ProfileMenu
                onLogoutHandler={onLogoutHandler}
                fullName={auth.fullName}
                avatar={auth.avatar}
            />
        </div>
    );
};
