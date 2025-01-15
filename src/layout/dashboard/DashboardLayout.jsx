import { Outlet } from 'react-router-dom';

import styles from './dashboard-layout.module.css';

export const DashboardLayout = ({ NavComponent = () => {} }) => {
    return (
        <div className={styles.mainWrapper}>
            <NavComponent />

            <div className={styles.contentContainer}>
                <Outlet styles={styles} />
            </div>
        </div>
    );
};
