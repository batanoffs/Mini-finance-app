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

export const TopUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [inputState, setInputState] = useState({
        amount: '',
        paymethod: '',
        fullName: '',
        cardnumber: '',
        expiry: '',
        cvv: ''
    });
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const message = useMessage();

    const validateForm = () => {
        const newErrors = {};
        
        if (!inputState.amount) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(inputState.amount) || Number(inputState.amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount';
        }

        if (!inputState.paymethod) {
            newErrors.paymethod = 'Payment method is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const amount = Number(inputState.amount) + Number(auth.virtualCard.top_up);

            const response = await cardService.topUp(auth.virtualCard.objectId, amount, token);

            if (!response) {
                throw new Error('Failed to process top-up');
            }

            const { balance, top_up: topUp } = response;
            const prevData = JSON.parse(sessionStorage.getItem('auth') || '{}');
            
            sessionStorage.setItem('auth', JSON.stringify({
                ...prevData,
                virtualCard: { 
                    ...prevData.virtualCard, 
                    top_up: topUp, 
                    balance 
                },
            }));
            
            message('success', 'Transaction was successful');
            setInputState({
                amount: '',
                paymethod: '',
                fullName: '',
                cardnumber: '',
                expiry: '',
                cvv: ''
            });
        } catch (error) {
            message('error', error.message || 'An error occurred while processing your request');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const result = name === 'amount' ? value.replace(/\D/g, '') : value;
        setInputState(prev => ({ ...prev, [name]: result }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles.customForm}>
            <FormInput
                type="text"
                name="amount"
                id="amount"
                value={inputState.amount}
                onChange={handleChange}
                placeholder="Enter amount in BGN"
                aria-label="Amount"
                className={errors.amount ? styles.inputError : ''}
                required
            />
            {errors.amount && <span className={styles.errorText}>{errors.amount}</span>}
            
            <div className={styles.formGroup}>
                <FontAwesomeIcon icon={faCreditCard} className={styles.icon} />
                <select
                    id="paymethod"
                    name="paymethod"
                    value={inputState.paymethod}
                    onChange={handleChange}
                    className={errors.paymethod ? styles.inputError : ''}
                    aria-label="Payment Method"
                >
                    <option value="">Select payment method</option>
                    <option value="debitcard">Debit card</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>
            {errors.paymethod && <span className={styles.errorText}>{errors.paymethod}</span>}
            
            <PaymentForm inputState={inputState} setInputState={setInputState} errors={errors} setErrors={setErrors} />

            <footer className={styles.footer}>
                <FormInput
                    type="submit"
                    value="Top up"
                    className={styles.submitButton}
                    disabled={
                        isLoading ||
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
