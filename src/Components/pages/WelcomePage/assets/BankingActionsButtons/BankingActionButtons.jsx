import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faVault,
    faMoneyBillTransfer,
    faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons'

import { TopUp } from './TopUpModal'
import { SendMoney } from './SendModal'
import { RequestMoney } from './RequestModal'

import blocks from '../../custom-block.module.css'

export const BankingActionButtons = ({ userInput, setUserInput, showModal, setShowModal }) => {
    const handleShowModal = (type) => () => {
        setShowModal({
            ...showModal,
            [type]: true,
        })
    }

    return (
        <div
            className={`${blocks.customBlock} ${blocks.customBlockBottom}`}
            style={{ maxHeight: '85px' }}
        >
            <div className={blocks.transactionBtns}>
                <button
                    className={blocks.transactionBtn}
                    data-text="Top up account"
                    onClick={handleShowModal('topUp')}
                >
                    <FontAwesomeIcon className={blocks.icon} icon={faVault} />
                </button>
                <button
                    className={blocks.transactionBtn}
                    data-text="Send money"
                    onClick={handleShowModal('send')}
                >
                    <FontAwesomeIcon className={blocks.icon} icon={faMoneyBillTransfer} />
                </button>
                <button
                    className={blocks.transactionBtn}
                    data-text="Request money"
                    onClick={handleShowModal('request')}
                >
                    <FontAwesomeIcon className={blocks.icon} icon={faHandHoldingDollar} />
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
