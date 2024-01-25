import { Tabs } from "antd";

import { ProfileTab } from "../NavigationTabs/SettingsProfileTab";
import { PasswordTab } from "../NavigationTabs/SettingsPasswordTab";
import { NotificationTab } from "../NavigationTabs/SettingsNotificationTab";
import { CreditCard } from "../NavigationTabs/SettingsCreditCardTab";
import "../tab-bar.css";

export const SettingsNavigationPanel = () => {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: "1",
            label: "Профил",
            children: <ProfileTab />,
        },
        {
            key: "2",
            label: "Парола",
            children: <PasswordTab />,
        },
        {
            key: "3",
            label: "Известия",
            children: <NotificationTab />,
        },
        {
            key: "4",
            label: "Карта",
            children: <CreditCard />,
        },
    ];
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    );
};