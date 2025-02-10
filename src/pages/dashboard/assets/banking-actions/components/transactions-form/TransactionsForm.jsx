import { useState } from 'react';

import { useMakeTransactions } from './useMakeTransactions';
import { FormInput, Autocomplete } from '../../../../../../components/inputs';

import styles from './modal.module.css';

const Form = ({ type, setShowModal, userId, userFullName, token, showMessage }) => {
    const [values, setValues] = useState({ amount: '', friends: '', selectedFriendId: '' });

    const { setUserInputHandler, onTransaction, friendSuggestions } = useMakeTransactions(
        type,
        userId,
        userFullName,
        setShowModal,
        token,
        showMessage,
        values,
        setValues
    );

    const onTransactionSubmit = (e) => {
        e.preventDefault();
        onTransaction(values.friends, values.selectedFriendId, values.amount);
    };

    return (
        <form onSubmit={onTransactionSubmit} className={styles.customForm}>
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
    );
};

export const TransactionsForm = {
    Send: ({ setShowModal, userId, userFullName, token, showMessage }) => (
        <Form
            type="send"
            setShowModal={setShowModal}
            userId={userId}
            userFullName={userFullName}
            token={token}
            showMessage={showMessage}
        />
    ),
    Request: ({ setShowModal, userId, userFullName, token, showMessage }) => (
        <Form
            type="request"
            setShowModal={setShowModal}
            userId={userId}
            userFullName={userFullName}
            token={token}
            showMessage={showMessage}
        />
    ),
    // TopUp: ({ showModal, toggleModal }) => (
    //     <ModalForm type="topUp" showModal={showModal} toggleModal={toggleModal} title="Top Up Account" />
    // ),
};
