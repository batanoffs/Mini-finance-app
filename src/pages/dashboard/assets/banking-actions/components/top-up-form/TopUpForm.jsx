import { useState } from 'react';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PaymentForm } from './PaymentForm';
import { cardService } from '../../../../../../services';
import { useMessage } from '../../../../../../hooks';
import { useAuthContext } from '../../../../../../contexts/AuthContext';
import { getUserToken } from '../../../../../../utils';
import { FormInput } from '../../../../../../components/inputs';

import styles from './top-up.module.css';

export const TopUpFrom = () => {
    const [inputState, setInputState] = useState({});
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const message = useMessage();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form) {
            console.error('Form element is null');
            message('error', 'No form data was submitted. Please try again.');
            return;
        }
        const formData = new FormData(form);
        const data = {};

        for (const [name, value] of formData) {
            if (name && value) {
                data[name] = value;
            } else {
                console.error('Null pointer exception: name or value is null');
                message('error', 'Invalid data was submitted. Please try again.');
                return;
            }
        }

        const amount = Number(data.amount) + Number(auth.virtualCard.top_up);
        const response = await cardService.topUp(auth.virtualCard.objectId, amount, token);

        if (!response) {
            message('error', 'An error occurred while submitting the data. Please try again.');
            return;
        } else {
            const balance = response.balance;
            const topUp = response.top_up;
            const prevData = JSON.parse(sessionStorage.getItem('auth') || '{}');
            sessionStorage.setItem(
                'auth',
                JSON.stringify({
                    ...prevData,
                    virtualCard: { ...prevData.virtualCard, top_up: topUp, balance: balance },
                })
            );
            message('success', 'Transaction was successful');
        }
    };

    const handleChange = (event) => {
        const result = event.target.value.replace(/\D/g, '');
        setInputState({ ...inputState, [event.target.name]: result });
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles.customForm}>
            <FormInput
                type="text"
                name="amount"
                id="amount"
                value={inputState.amount}
                onChange={handleChange}
                placeholder="10 BGN"
                required
            />
            <div className={styles.formGroup}>
                <FontAwesomeIcon icon={faCreditCard} />

                <select
                    id="paymethod"
                    value={inputState.method}
                    onChange={(e) => {
                        setInputState({
                            ...inputState,
                            paymethod: e.target.value,
                        });
                    }}
                >
                    <option value="">Select payment method</option>
                    <option value="debitcard">Debit card</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>
            <PaymentForm inputState={inputState} setInputState={setInputState} />

            <footer>
                <FormInput
                    type="submit"
                    value="Top up"
                    style={{ width: `100%`, textAlign: `center` }}
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
    );
};
