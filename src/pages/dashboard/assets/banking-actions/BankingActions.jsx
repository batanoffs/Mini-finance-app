import {
    faVault,
    faMoneyBillTransfer,
    faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';

import { TopUpFrom, TransactionsForm } from './components';
import { ButtonTooltip } from '../../../../components/buttons';
import { EmptyCard } from '../../../../components/cards';
import { useMessage, useModal } from '../../../../hooks';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { getUserToken } from '../../../../utils';

import styles from './banking-actions.module.css';

export const BankingActions = () => {
    const [showModal, setShowModal] = useModal({
        topUp: false,
        send: false,
        request: false,
    });
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    return (
        <EmptyCard title="Banking Actions" color="primary" className={styles.customBlockBottom}>
            <div className={styles.transactionBtns}>
                <ButtonTooltip
                    text="Top up account"
                    type="topUp"
                    icon={faVault}
                    onClick={setShowModal}
                />
                <ButtonTooltip
                    text="Send money"
                    type="send"
                    icon={faMoneyBillTransfer}
                    onClick={setShowModal}
                />
                <ButtonTooltip
                    text="Request money"
                    type="request"
                    icon={faHandHoldingDollar}
                    onClick={setShowModal}
                />
            </div>

            {showModal.topUp && <TopUpFrom toggleModal={setShowModal} />}
            {showModal.send && (
                <TransactionsForm.Send
                    showModal={showModal}
                    setShowModal={setShowModal}
                    userId={auth.objectId}
                    userFullName={auth.fullName}
                    token={token}
                    showMessage={showMessage}
                />
            )}
            {showModal.request && (
                <TransactionsForm.Request
                    showModal={showModal}
                    setShowModal={setShowModal}
                    userId={auth.objectId}
                    userFullName={auth.fullName}
                    token={token}
                    showMessage={showMessage}
                />
            )}
        </EmptyCard>
    );
};
