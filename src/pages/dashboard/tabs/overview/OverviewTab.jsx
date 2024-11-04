import { Greetings } from './assets/index'
import { BankingActionButtons, QuickSendMoney } from '../../../../components/actions/index'
import {
    History,
    AddFriends,
    ContactInfo,
    VirtualCard,
    ExchangeRate,
    LastTransactions,
    ProfileDetails,
} from '../../assets/index'

import layout from '../../dashboard-layout.module.css'

export const OverviewTab = () => {
    return (
        <div className={layout.contentContainer}>
            <div className={layout.bentoMainColumn}>
                <Greetings />
                <ProfileDetails />
                <VirtualCard />
                <ExchangeRate />
            </div>
            <div className={layout.bentoFillColumn}>
                <LastTransactions />
                <History />
            </div>

            <div className={layout.bentoSideColumn}>
                <ContactInfo />
                <AddFriends />
                <BankingActionButtons />
                <QuickSendMoney />
            </div>
        </div>
    )
}
