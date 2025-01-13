import { faVault, faMoneyBillTransfer, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

import { TransactionsModal, TopUp } from '../../../../../../components/modals'
import { BankingButton } from '../../../../../../components/buttons'
import { EmptyCard } from '../../../../../../components/cards'
import { useModal } from '../../../../../../hooks'

import styles from './banking-actions.module.css'

export const BankingActions = () => {
    const [showModal, toggleModal] = useModal({
        topUp: false,
        send: false,
        request: false,
    })

    return (
        <EmptyCard title="Banking Actions" color="primary" className={styles.customBlockBottom}>
            <div className={styles.transactionBtns}>
                <BankingButton text="Top up account" type="topUp" icon={faVault} onClick={toggleModal} />
                <BankingButton text="Send money" type="send" icon={faMoneyBillTransfer} onClick={toggleModal} />
                <BankingButton text="Request money" type="request" icon={faHandHoldingDollar} onClick={toggleModal} />
            </div>

            {showModal.topUp && <TopUp toggleModal={toggleModal} />}
            {showModal.send && <TransactionsModal.Send showModal={showModal} toggleModal={toggleModal} />}
            {showModal.request && <TransactionsModal.Request showModal={showModal} toggleModal={toggleModal} />}
        </EmptyCard>
    )
}
