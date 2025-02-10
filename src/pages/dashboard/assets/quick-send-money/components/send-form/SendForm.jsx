import { FormInput } from '../../../../../../components/inputs';
import { useQuickSend } from './useQuickSend';

import styles from './send-form.module.css';

export const SendForm = ({ userId, userFullName, receiver, setShowModal }) => {
    const { onChange, onSubmit, amount } = useQuickSend(setShowModal);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmit(userId, userFullName, receiver.id);
    };

    const onChangeHandler = (e) => {
        onChange(e);
    };

    return (
        <form onSubmit={onSubmitHandler} className={styles.customForm}>
            <FormInput
                type="number"
                name="amount"
                id="amount"
                className={styles.formControl}
                value={amount}
                onChange={onChangeHandler}
                placeholder="Enter amount"
                suffixText="BGN"
                required
            />

            <div className={styles.friend}>
                {receiver.avatar && (
                    <img
                        className={styles.avatar}
                        src={receiver.avatar}
                        alt="avatar"
                        onError={(e) => (e.target.style.display = 'none')}
                    />
                )}
                <p className={styles.name}>{receiver.name}</p>
            </div>

            <footer>
                <FormInput type="submit" value="Submit" />
            </footer>
        </form>
    );
};
