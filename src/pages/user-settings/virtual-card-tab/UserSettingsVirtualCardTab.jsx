import { useState, useContext } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { AuthContext } from '../../../contexts/AuthContext';
import { FormInput } from '../../../components/inputs';

import styles from './UserSettingsVirtualCardTab.module.css';

export const UserSettingsVirtualCardTab = () => {
    const { auth } = useContext(AuthContext);
    const [state, setState] = useState({
        name: auth.fullName,
        cardNumber: auth.virtualCard.number,
        expiryDate: auth.virtualCard.expiration,
        cvc: auth.virtualCard.cvv,
        focus: '',
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };
    const inputFocusHandler = (e) => {
        setState((prev) => ({ ...prev, focus: e.target.name }));
    };

    const onUpdateHandler = () => {
        console.log('updated');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <form className={styles.customForm}>
                    <FormInput
                        type="number"
                        name="credit_card_number"
                        placeholder="Card Number"
                        value={state.cardNumber}
                        onChange={inputChangeHandler}
                        onFocus={inputFocusHandler}
                        required
                    />

                    <FormInput
                        type="text"
                        name="fullname"
                        autoComplete="off"
                        value={state.name}
                        placeholder="Cardholder Name"
                        onChange={inputChangeHandler}
                        onFocus={inputFocusHandler}
                        required
                    />
                    <FormInput
                        type="string"
                        name="expiryDate"
                        placeholder="Expiration Date"
                        pattern="\d\d/\d\d"
                        value={state.expiryDate}
                        onChange={inputChangeHandler}
                        onFocus={inputFocusHandler}
                        required
                    />
                    <FormInput
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        pattern="\d{3,4}"
                        value={state.cvc}
                        onChange={inputChangeHandler}
                        onFocus={inputFocusHandler}
                        required
                    />

                    <footer>
                        <FormInput type="submit" value="Save" onClick={onUpdateHandler} />
                    </footer>
                </form>
                <div className={styles.formGroup}>
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
    );
};
