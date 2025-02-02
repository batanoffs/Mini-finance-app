import { Outlet } from 'react-router-dom';
import { App } from 'antd';

import { Footer, Header } from '../../pages';

import styles from './root-layout.module.css';

export const RootLayout = () => {
    return (
        <App className={styles.antLayout}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </App>
    );
};
