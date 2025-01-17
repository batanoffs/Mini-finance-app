import { Outlet } from 'react-router-dom';

import styles from './dashboard-layout.module.css';

export const DashboardLayout = ({ NavComponent = () => null }) => {
    return (
        <div className={styles.mainWrapper}>
            <NavComponent />
            
            <div className={styles.contentContainer}>
                <Outlet context={styles} />
            </div>
        </div>
    );
};
