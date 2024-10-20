import { ProfileDetails } from './assets/profileDetails/ProfileDetails'
import { Greetings } from './assets/Greetings'
import { BankingActionButtons } from '../assets/BankingActionsButtons/BankingActionButtons'
import { QuickSendMoney } from '../assets/Quicksend/QuickSend'
import { LastTransactions } from '../assets/LastTransactions'
import { ExchangeRate } from '../assets/ExchangeRate'
import { VirtualCard } from '../assets/VirtualCard'
import { ContactInfo } from '../assets/ContactInfo'
import { AddFriends } from '../assets/AddFriends'
import { History } from '../assets/History'

import styles from '../welcome-page-layout.module.css'

export const OverviewTab = (props) => {
    return (
        <div className={styles.contentContainer}>
            <div className={styles.bentoMainColumn}>
                <Greetings />
                <ProfileDetails />
                <VirtualCard />
                <ExchangeRate props={props} />
            </div>
            <div className={styles.bentoFillColumn}>
                <LastTransactions />
                <History />
            </div>

            <div className={styles.bentoSideColumn}>
                <ContactInfo />
                <AddFriends />
                <BankingActionButtons
                    userInput={props.userInput}
                    setUserInput={props.setUserInput}
                    showModal={props.showModal}
                    setShowModal={props.setShowModal}
                />
                <QuickSendMoney
                    userInput={props.userInput}
                    setUserInput={props.setUserInput}
                    showModal={props.showModal}
                    setShowModal={props.setShowModal}
                />
            </div>
        </div>
    )
}
