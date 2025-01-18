import { useNavigate } from 'react-router-dom';

import { AuthMenu, DefaultLogo, LoginMenu, UserMenu } from './assets';
import { isAuthenticated } from '../../utils/sessionStorage';

import styles from './assets/app-bar.module.css';

export const AppBar = ({ AppLogo = DefaultLogo }) => {
    const navigate = useNavigate();

    const homeRedirectHandler = () => {
        if (isAuthenticated()) {
            return navigate('/dashboard');
        } else {
            return navigate('/');
        }
    };

    return (
        <header className={styles.headerContainer}>
            <AppLogo onRedirect={homeRedirectHandler} />
            {isAuthenticated() ? <AuthMenu UserMenu={UserMenu} /> : <LoginMenu />}
        </header>
    );
};
