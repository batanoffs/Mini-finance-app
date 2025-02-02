import { useState } from 'react';
import { FormInput } from '../../../components/inputs';

import styles from './UserSettingsPasswordTab.module.css';

export const UserSettingsPasswordTab = () => {
    const [formState, setFormState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clearForm = () => {
        setFormState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    //TODO: Implement form submission
    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <form className={styles.customForm} method="post">
                    <FormInput
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        value={formState.oldPassword}
                        onChange={inputChangeHandler}
                        pattern="[0-9a-zA-Z]{4,10}"
                        placeholder="Old Password"
                        autoComplete="off"
                        required
                    />

                    <FormInput
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formState.newPassword}
                        onChange={inputChangeHandler}
                        pattern="[0-9a-zA-Z]{4,10}"
                        placeholder="New Password"
                        autoComplete="off"
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={inputChangeHandler}
                        pattern="[0-9a-zA-Z]{4,10}"
                        placeholder="Confirm Password"
                        required
                    />

                    <footer>
                        <FormInput type="button" value="Clear" onClick={clearForm} />
                        <FormInput type="submit" value="Save Changes" />
                    </footer>
                </form>
            </div>
        </div>
    );
};
