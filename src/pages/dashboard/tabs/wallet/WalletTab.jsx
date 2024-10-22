import { TableTransactions } from './assets/TableTransactions'
import { BankingActionButtons } from '../../../../components/actions/index'
import { ContactInfo } from '../../assets/index'

import layout from '../../dashboard-layout.module.css'

export const WalletTab = (props) => {
    return (
        <div className={layout.contentContainer}>
            <main className={layout.bentoFillColumn}>
                <TableTransactions />
            </main>
            <aside className={layout.bentoSideColumn}>
                <ContactInfo />
                <BankingActionButtons
                    showModal={props.showModal}
                    userInput={props.userInput}
                    setUserInput={props.setUserInput}
                    setShowModal={props.setShowModal}
                />
            </aside>
        </div>
    )
}
