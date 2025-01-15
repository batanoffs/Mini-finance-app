import { useState, useContext } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

import { AuthContext } from '../../../contexts/AuthContext'

export const UserSettingsVirtualCardTab = () => {
    const { auth } = useContext(AuthContext)
    const [state, setState] = useState({
        name: auth.fullName,
        cardNumber: auth.virtualCard.number,
        expiryDate: auth.virtualCard.expiration,
        cvc: auth.virtualCard.cvv,
        focus: '',
    })

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setState((prev) => ({ ...prev, [name]: value }))
    }
    const inputFocusHandler = (e) => {
        setState((prev) => ({ ...prev, focus: e.target.name }))
    }

    const onUpdateHandler = () => {
        console.log('updated')
    }

    return (
        <div className="form-container">
            <div className="form-content" style={{ display: 'flex', flexDirection: 'row', gap: '10em' }}>
                <form className="custom-form" method="post">
                    <div className="form-group">
                        <label htmlFor="credit_card_number">Card Number</label>

                        <input
                            type="number"
                            name="credit_card_number"
                            className="form-control"
                            placeholder="Card Number"
                            value={state.cardNumber}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credit_card_number">Cardholder Name</label>

                        <input
                            type="text"
                            name="fullname"
                            autoComplete="off"
                            className="form-control"
                            value={state.name}
                            placeholder="Cardholder Name"
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credit_card_number">Expiration Date</label>

                        <input
                            type="string"
                            name="expiryDate"
                            className="form-control"
                            placeholder="Expiration Date"
                            pattern="\d\d/\d\d"
                            value={state.expiryDate}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credit_card_number">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            className="form-control"
                            placeholder="CVV"
                            pattern="\d{3,4}"
                            value={state.cvc}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>

                    <footer>
                        <input type="submit" value="Save" onClick={onUpdateHandler} className="button-primary" />
                    </footer>
                </form>
                <div className="form-group">
                    <Cards
                        number={state.cardNumber}
                        expiry={state.expiryDate}
                        cvc={state.cvc}
                        name={state.name}
                        focused={state.focus}
                    />
                </div>
            </div>
        </div>
    )
}
