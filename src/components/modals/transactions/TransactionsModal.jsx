import { useMakeTransactions } from '../../../hooks/useMakeTransactions';
import { FormInput, Autocomplete } from '../../inputs';

import styles from './modal.module.css';

const ModalForm = ({ type, toggleModal }) => {
    const { values, setValues, setUserInputHandler, onTransaction, onClose, friendSuggestions } =
        useMakeTransactions(type, toggleModal, {
            amount: '',
            friends: '',
        });

    let title = '';

    if (type === 'request') title = 'Request Money';
    if (type === 'send') title = 'Send Money';
    if (type === 'topUp') title = 'Top Up Account';

    const onTransactionSubmit = (e) => {
        e.preventDefault();
        onTransaction(values.friends, values.selectedFriendId, values.amount);
    };

    const onCloseOutsideClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className={styles.background} onClick={onCloseOutsideClick}>
            <div className={styles.container}>
                <form onSubmit={onTransactionSubmit} className={styles.customForm}>
                    <header>
                        <h5>{title}</h5>
                        <button onClick={onClose}>X</button>
                    </header>
                    <FormInput
                        type="number"
                        name="amount"
                        id="amount"
                        className={styles.formControl}
                        value={values.amount}
                        onChange={setUserInputHandler}
                        placeholder="Enter amount"
                        suffixText="BGN"
                        required
                    />

                    <Autocomplete
                        userInput={values}
                        setUserInput={setValues}
                        name="friends"
                        placeholder="Start typing a name..."
                        required
                        suggestions={friendSuggestions || []}
                    />

                    <footer>
                        <FormInput type="submit" value="Submit" />
                    </footer>
                </form>
            </div>
        </div>
    );
};

export const TransactionsModal = {
    Send: ({ toggleModal }) => <ModalForm type="send" toggleModal={toggleModal} />,
    Request: ({ toggleModal }) => <ModalForm type="request" toggleModal={toggleModal} />,
    // TopUp: ({ showModal, toggleModal }) => (
    //     <ModalForm type="topUp" showModal={showModal} toggleModal={toggleModal} title="Top Up Account" />
    // ),
};
