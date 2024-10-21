import { Tabs } from 'antd'

import { NotificationTab } from './SettingsNotificationTab'
import { VirtualCard } from './SettingsVirtualCardTab'
import { PasswordTab } from './SettingsPasswordTab'
import { ProfileTab } from './SettingsProfileTab'

export const SettingsNavigationPanel = () => {
    const onChange = (key) => {}
    const items = [
        {
            key: '1',
            label: 'Profile',
            children: <ProfileTab />,
        },
        {
            key: '2',
            label: 'Password',
            children: <PasswordTab />,
        },
        {
            key: '3',
            label: 'Notifications',
            children: <NotificationTab />,
        },
        {
            key: '4',
            label: 'Card',
            children: <VirtualCard />,
        },
    ]
    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
            tabBarStyle={{ fontFamily: 'var(--body-font-family)' }}
            onChange={onChange}
        />
    )
}
