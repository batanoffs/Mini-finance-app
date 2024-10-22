import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faVault,
    faMoneyBillTransfer,
    faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons'

import { RequestMoney, SendMoney, TopUp } from './index'

import containers from '../../pages/dashboard/assets/containers.module.css'
import styles from '../../pages/dashboard/assets/buttons.module.css'

export const BankingActionButtons = ({ userInput, setUserInput, showModal, setShowModal }) => {
    const handleShowModal = (type) => () => {
        setShowModal({
            ...showModal,
            [type]: true,
        })
    }

    return (
        <div
            className={`${containers.customBlock} ${containers.customBlockBottom}`}
            style={{ maxHeight: '85px' }}
        >
            <div className={styles.transactionBtns}>
                <button
                    className={styles.transactionBtn}
                    data-text="Top up account"
                    onClick={handleShowModal('topUp')}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faVault} />
                </button>
                <button
                    className={styles.transactionBtn}
                    data-text="Send money"
                    onClick={handleShowModal('send')}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faMoneyBillTransfer} />
                </button>
                <button
                    className={styles.transactionBtn}
                    data-text="Request money"
                    onClick={handleShowModal('request')}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faHandHoldingDollar} />
                </button>
            </div>

            {showModal.topUp && <TopUp showModal={showModal} setShowModal={setShowModal} />}
            {showModal.send && (
                <SendMoney
                    userInput={userInput}
                    setUserInput={setUserInput}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
            {showModal.request && (
                <RequestMoney
                    userInput={userInput}
                    setUserInput={setUserInput}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    )
}
