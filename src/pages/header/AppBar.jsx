import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthMenu, DefaultLogo, LoginMenu, UserMenu } from './assets';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './assets/app-bar.module.css';

export const AppBar = ({ AppLogo = DefaultLogo }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const homeRedirectHandler = () => {
        navigate(isAuthenticated() ? '/dashboard/overview' : '/');
    };

    return (
        <header className={styles.headerContainer}>
            <AppLogo onRedirect={homeRedirectHandler} />
            {isAuthenticated() ? <AuthMenu UserMenu={UserMenu} /> : <LoginMenu />}
        </header>
    );
};
