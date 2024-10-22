import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { exchangeRates } from '../../constants/rates'
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
    const [hasLoaded, setHasLoaded] = useState(false)
    const [userInput, setUserInput] = useState({ amount: '', friends: '' })
    const [rates, setRates] = useState(exchangeRates)

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
                            rates={rates}
                            setRates={setRates}
                            hasLoaded={hasLoaded}
                            setHasLoaded={setHasLoaded}
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
