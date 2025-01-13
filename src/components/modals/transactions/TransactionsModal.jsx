import { useMakeTransactions } from '../../../hooks/useMakeTransactions'
import { FormInput, Autocomplete } from '../../inputs'

import styles from './modal.module.css'

// TODO merge logic for the top up modal with the transactions modal and update the useMakeTransactions hook
const ModalForm = ({ type, showModal, toggleModal }) => {
    const { values, setValues, setUserInputHandler, onFormSubmitHandler, onClose, friends } = useMakeTransactions({
        type,
        showModal,
        toggleModal,
    })

    let title = ''

    if (type === 'request') title = 'Request Money'
    if (type === 'send') title = 'Send Money'
    if (type === 'topUp') title = 'Top Up Account'

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h5 className="modal-title">{title}</h5>
                    <button onClick={onClose}>X</button>
                </div>

                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler} className="custom-form">
                        <FormInput
                            type="text"
                            name="amount"
                            id="amount"
                            className="form-control"
                            value={values.amount}
                            onChange={setUserInputHandler}
                            placeholder="10 BGN"
                        />

                        <Autocomplete userInput={values} setUserInput={setValues} suggestions={[...friends]} />

                        <footer>
                            <FormInput type="submit" className="button-primary" value="Submit" />
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const TransactionsModal = {
    Send: ({ showModal, toggleModal, inputName }) => (
        <ModalForm
            type="send"
            showModal={showModal}
            inputName={inputName}
            toggleModal={toggleModal}
            title="Send Money"
        />
    ),
    Request: ({ showModal, toggleModal, inputName }) => (
        <ModalForm
            type="request"
            showModal={showModal}
            inputName={inputName}
            toggleModal={toggleModal}
            title="Request Money"
        />
    ),
    // TopUp: ({ showModal, toggleModal }) => (
    //     <ModalForm type="topUp" showModal={showModal} toggleModal={toggleModal} title="Top Up Account" />
    // ),
}
