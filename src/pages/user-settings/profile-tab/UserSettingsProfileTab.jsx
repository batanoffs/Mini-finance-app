import { useState } from 'react';

import { UploadPicture } from '../../../components/buttons';
import { useAuthContext } from '../../../contexts/AuthContext';
import { FormInput } from '../../../components/inputs';

import styles from './UserSettingsProfileTab.module.css';

export const UserSettingsProfileTab = () => {
    const { auth } = useAuthContext();
    const [state, setState] = useState({
        changeEmail: auth.email,
        changePhoneNumber: auth.phoneNumber,
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    // TODO update handlers
    const onResetHandler = () => {
        console.log('resetted');
    };

    const onUpdateHandler = () => {
        console.log('updated');
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <div className={styles.formGroup}>
                    <UploadPicture />
                </div>
                <form className={styles.customForm} method="post">
                    <FormInput
                        autoComplete="off"
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={inputChangeHandler}
                        id="changeEmail"
                        placeholder="email"
                        required
                    />

                    <FormInput
                        autoComplete="off"
                        type="number"
                        name="phone"
                        value={state.phoneNumber}
                        onChange={inputChangeHandler}
                        id="changePhoneNumber"
                        placeholder="Phone number"
                        required
                    />

                    <footer>
                        <FormInput type="button" onClick={onResetHandler} value="Reset" />
                        <FormInput type="submit" onClick={onUpdateHandler} value="Save changes" />
                    </footer>
                </form>
            </div>
        </div>
    );
};
