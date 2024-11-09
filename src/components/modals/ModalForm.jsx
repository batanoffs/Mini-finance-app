import { useMakeTransactions } from '../../hooks/useMakeTransactions'
import { Autocomplete } from '../inputs/autocomplete/Autocomplete'
import styles from './modal.module.css'

export const ModalForm = ({ transactionType, showModal }) => {
    const { values, setValues, setUserInputHandler, onFormSubmitHandler, onClose, friends } = useMakeTransactions({
        transactionType,
        showModal,
    })

    let title = ''

    if (transactionType === 'request') title = 'Request Money'
    if (transactionType === 'send') title = 'Send Money'

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h5 className="modal-title">{title}</h5>
                    <button onClick={onClose}>x</button>
                </div>
                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                value={values.amount}
                                onChange={setUserInputHandler}
                                className="form-control"
                                placeholder="10 BGN"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-group ">
                                <label htmlFor="friends">Friend:</label>
                                <Autocomplete
                                    name="friends"
                                    userInput={values}
                                    setUserInput={setValues}
                                    suggestions={[...friends]}
                                />
                            </div>
                        </div>
                        <footer>
                            <input
                                className="button-primary"
                                type="submit"
                                value={transactionType}
                                style={{ width: '100%' }}
                            />
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}
