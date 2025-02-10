import { useState } from 'react';
import {
    faVault,
    faMoneyBillTransfer,
    faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';

import { TopUpForm, TransactionsForm } from './components';
import { ButtonTooltip } from '../../../../components/buttons';
import { EmptyCard } from '../../../../components/cards';
import { ModalForm } from '../../../../components/modals';
import { useMessage } from '../../../../hooks';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { getUserToken } from '../../../../utils';

import styles from './banking-actions.module.css';

export const BankingActions = () => {
    const [isTopUpOpen, setTopUpModal] = useState(false);
    const [isSendOpen, setSendModal] = useState(false);
    const [isRequestOpen, setRequestModal] = useState(false);

    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    return (
        <>
            <EmptyCard title="Banking Actions" color="primary" className={styles.customBlockBottom}>
                <div className={styles.transactionBtns}>
                    <ButtonTooltip
                        text="Top up account"
                        icon={faVault}
                        toggleModal={setTopUpModal}
                    />
                    <ButtonTooltip
                        text="Send money"
                        icon={faMoneyBillTransfer}
                        toggleModal={setSendModal}
                    />
                    <ButtonTooltip
                        text="Request money"
                        icon={faHandHoldingDollar}
                        toggleModal={setRequestModal}
                    />
                </div>
            </EmptyCard>

            <ModalForm
                title={'Top up your account'}
                isVisible={isTopUpOpen}
                setVisible={setTopUpModal}
            >
                <TopUpForm toggleModal={setTopUpModal} />
            </ModalForm>

            <ModalForm title={'Send money'} isVisible={isSendOpen} setVisible={setSendModal}>
                <TransactionsForm.Send
                    showModal={isSendOpen}
                    setShowModal={setSendModal}
                    userId={auth.objectId}
                    userFullName={auth.fullName}
                    token={token}
                    showMessage={showMessage}
                />
            </ModalForm>

            <ModalForm
                title={'Request money'}
                isVisible={isRequestOpen}
                setVisible={setRequestModal}
            >
                <TransactionsForm.Request
                    showModal={isRequestOpen}
                    setShowModal={setRequestModal}
                    userId={auth.objectId}
                    userFullName={auth.fullName}
                    token={token}
                    showMessage={showMessage}
                />
            </ModalForm>
        </>
    );
};
