import { Notifications } from './assets/notifications/Notifications';
import { UserMenu } from './assets/user-menu/UserMenu';

import styles from './auth-menu.module.css';

export const AuthMenu = ({ ProfileMenu = UserMenu }) => {
    return (
        <div className={styles.headerDropdownContainer}>
            <Notifications />
            <ProfileMenu />
        </div>
    );
};
