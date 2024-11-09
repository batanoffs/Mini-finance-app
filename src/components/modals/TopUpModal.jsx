import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useContext } from 'react'

import { PaymentForm } from '../../components/forms/PaymentForm'
import { cardService } from '../../services/cardGenerationService'
import { useMessage } from '../../hooks/useMessage'
import { AuthContext } from '../../contexts/AuthContext'

import modal from './modal.module.css'

export const TopUp = ({ toggleModal }) => {
    const [inputState, setInputState] = useState({})
    const { virtualcard, token } = useContext(AuthContext)

    const message = useMessage()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const form = e.target
        if (!form) {
            console.error('Form element is null')
            message('error', 'No form data was submitted. Please try again.')
            return
        }
        const formData = new FormData(form)
        const data = {}

        for (const [name, value] of formData) {
            if (name && value) {
                data[name] = value
            } else {
                console.error('Null pointer exception: name or value is null')
                message('error', 'Invalid data was submitted. Please try again.')
                return
            }
        }

        const amount = Number(data.amount) + Number(virtualcard.top_up)
        const response = await cardService.topUp(virtualcard.objectId, amount, token)

        if (!response) {
            message('error', 'An error occurred while submitting the data. Please try again.')
            return
        } else {
            const balance = response.balance
            const topUp = response.top_up
            const prevData = JSON.parse(sessionStorage.getItem('auth') || '{}')
            sessionStorage.setItem(
                'auth',
                JSON.stringify({
                    ...prevData,
                    virtualcard: { ...prevData.virtualcard, top_up: topUp, balance: balance },
                })
            )
            toggleModal('topUp')
            message('success', 'Transaction was successful')
        }
    }

    const handleChange = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        setInputState({ ...inputState, [event.target.name]: result })
    }

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Top up account</h5>
                    <button onClick={() => toggleModal('topUp')}>X</button>
                </div>
                <form onSubmit={onSubmitHandler} className="custom-form">
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="text"
                            name="amount"
                            value={inputState.amount}
                            onChange={handleChange}
                            id="amount"
                            placeholder="10 BGN"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymethod">
                            <FontAwesomeIcon icon={faCreditCard} />
                            Payment method:
                        </label>
                        <select
                            id="paymethod"
                            value={inputState.method}
                            onChange={(e) => {
                                setInputState({
                                    ...inputState,
                                    paymethod: e.target.value,
                                })
                            }}
                        >
                            <option value="">Select payment method</option>
                            <option value="debitcard">Debit card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <PaymentForm inputState={inputState} setInputState={setInputState} />

                    <footer>
                        <input
                            className="button-primary"
                            style={{ width: `100%`, textAlign: `center` }}
                            type="submit"
                            value="Top up"
                            disabled={
                                !inputState.amount ||
                                !inputState.paymethod ||
                                !inputState.fullName ||
                                !inputState.cardnumber ||
                                !inputState.expiry ||
                                !inputState.cvv
                            }
                        />
                    </footer>
                </form>
            </div>
        </div>
    )
}
