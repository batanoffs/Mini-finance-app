import { faVault, faMoneyBillTransfer, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ModalForm, TopUp } from '../../../../../../components/modals'
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
                <button
                    className={styles.transactionBtn}
                    data-text="Top up account"
                    onClick={() => toggleModal('topUp')}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faVault} />
                </button>
                <button className={styles.transactionBtn} data-text="Send money" onClick={() => toggleModal('send')}>
                    <FontAwesomeIcon className={styles.icon} icon={faMoneyBillTransfer} />
                </button>
                <button
                    className={styles.transactionBtn}
                    data-text="Request money"
                    onClick={() => toggleModal('request')}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faHandHoldingDollar} />
                </button>
            </div>
            {showModal.topUp && <TopUp toggleModal={toggleModal} />}
            {showModal.send && <ModalForm type={'send'} showModal={showModal} toggleModal={toggleModal} />}
            {showModal.request && <ModalForm type={'request'} showModal={showModal} toggleModal={toggleModal} />}
        </EmptyCard>
    )
}
