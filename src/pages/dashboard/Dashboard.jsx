import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import {
    HelpCenterTab,
    SettingsTab,
    OverviewTab,
    ProfileTab,
    WalletTab,
    Upgrade,
    Sidebar,
} from './tabs/index'

export const Dashboard = () => {
    const [showModal, setShowModal] = useState({
        topUp: false,
        send: false,
        request: false,
    })
    const [userInput, setUserInput] = useState({ amount: '', friends: '' })

    return (
        <div className="main-wrapper">
            <Sidebar />

            <Routes>
                <Route
                    path="/overview"
                    element={
                        <OverviewTab
                            showModal={showModal}
                            userInput={userInput}
                            setUserInput={setUserInput}
                            setShowModal={setShowModal}
                        />
                    }
                />
                <Route
                    path="/wallet"
                    element={
                        <WalletTab
                            showModal={showModal}
                            userInput={userInput}
                            setUserInput={setUserInput}
                            setShowModal={setShowModal}
                        />
                    }
                />
                <Route path="/profile" element={<ProfileTab />} />
                <Route path="/settings/*" element={<SettingsTab />} />
                <Route path="/help-center" element={<HelpCenterTab />} />
                <Route path="/upgrade" element={<Upgrade />} />
            </Routes>
        </div>
    )
}
