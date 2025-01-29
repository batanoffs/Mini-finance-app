import { useMakeTransactions } from '../../../hooks/useMakeTransactions';
import { FormInput, Autocomplete } from '../../inputs';

import styles from './modal.module.css';

const ModalForm = ({ type, toggleModal }) => {
    const { values, setValues, setUserInputHandler, onTransaction, onClose, friends } =
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

        console.log('onTransactionSubmit', values);
        
        onTransaction(values.friends, values.selectedFriendId, values.amount);
    };

    return (
        <div className={styles.background} onClick={(e) => {
            // Close only if clicking the background itself, not the modal
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h5 className="modal-title">{title}</h5>
                    <button onClick={onClose}>X</button>
                </div>

                <div className="form-content">
                    <form onSubmit={onTransactionSubmit} className="custom-form">
                        <div className={styles.formGroup}>
                            <FormInput
                                type="text"
                                name="amount"
                                id="amount"
                                required
                                className={styles.formControl}
                                value={values.amount}
                                onChange={setUserInputHandler}
                                placeholder="10 BGN"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <Autocomplete
                                userInput={values}
                                setUserInput={setValues}
                                name="friends"
                                placeholder="Select friend"
                                required
                                suggestions={friends || []}
                            />
                        </div>

                        <div className={styles.footer}>
                            <FormInput
                                type="submit"
                                className={`${styles.buttonPrimary} button-primary`}
                                value="Submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const TransactionsModal = {
    Send: ({ toggleModal }) => (
        <ModalForm
            type="send"
            toggleModal={toggleModal}
        />
    ),
    Request: ({ toggleModal }) => (
        <ModalForm
            type="request"
            toggleModal={toggleModal}
        />
    ),
    // TopUp: ({ showModal, toggleModal }) => (
    //     <ModalForm type="topUp" showModal={showModal} toggleModal={toggleModal} title="Top Up Account" />
    // ),
};
