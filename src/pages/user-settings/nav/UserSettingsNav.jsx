import { Tabs } from 'antd';
import {
    UserSettingsNotificationTab,
    UserSettingsPasswordTab,
    UserSettingsProfileTab,
    UserSettingsVirtualCardTab,
} from '../index';

import styles from './UserSettingsNav.module.css';

export const UserSettingsNav = () => {
    const onChange = (key) => {};
    const items = [
        {
            key: '1',
            label: 'Profile',
            children: <UserSettingsProfileTab />,
        },
        {
            key: '2',
            label: 'Password',
            children: <UserSettingsPasswordTab />,
        },
        {
            key: '3',
            label: 'Notifications',
            children: <UserSettingsNotificationTab />,
        },
        {
            key: '4',
            label: 'Card',
            children: <UserSettingsVirtualCardTab />,
        },
    ];
    return (
        <div className={styles.customBlock}>
            <Tabs
                defaultActiveKey="1"
                items={items}
                tabBarStyle={{ fontFamily: 'var(--body-font-family)' }}
                onChange={onChange}
                style={{ width: '100%' }}
            />
        </div>
    );
};
