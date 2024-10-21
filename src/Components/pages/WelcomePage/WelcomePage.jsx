import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import { HelpCenterTab } from './HelpCenterTab/HelpCenter'
import { SettingsTab } from './SettingsTab/SettingsTab'
import { OverviewTab } from './OverviewTab/OverviewTab'
import { ProfileTab } from './ProfileTab/ProfileTab'
import { WalletTab } from './WalletTab/WalletTab'
import { Upgrade } from './Upgrade/Upgrade'
import { Sidebar } from './Sidebar/Sidebar'

export const WelcomePage = () => {
    // const t = false // TODO
    const [showModal, setShowModal] = useState({
        topUp: false,
        send: false,
        request: false,
    })
    const [hasLoaded, setHasLoaded] = useState(false)
    const [userInput, setUserInput] = useState({ amount: '', friends: '' })

    const [rates, setRates] = useState({
        USD: {
            name: 'USD',
            buy: 0,
            sell: 0,
            logo: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500809/united-states_rblegx.png',
        },
        GBP: {
            name: 'GBP',
            buy: 0,
            sell: 0,
            logo: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/xmct4dcgmfugpnnsdzpe.png',
        },
        EUR: {
            name: 'EUR',
            buy: 0,
            sell: 0,
            logo: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/lec08kknashadt8staca.png',
        },
        AUD: {
            name: 'AUD',
            buy: 0,
            sell: 0,
            logo: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/iyeizidmnwuungojoyrb.png',
        },
        SGD: {
            name: 'SGD',
            buy: 0,
            sell: 0,
            logo: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/kljvsxfskjfscptvmulr.png',
        },
    })

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
