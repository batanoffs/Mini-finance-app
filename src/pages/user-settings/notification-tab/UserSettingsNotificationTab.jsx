import { FormInput } from '../../../components/inputs';

import styles from './UserSettingsNotificationTab.module.css';

export const UserSettingsNotificationTab = () => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <form>
                    <FormInput
                        type="checkbox"
                        customLabel={'Last activity'}
                        onChange={() => {}}
                        name="form-check-input"
                        id="form-check-input"
                        role="switch"
                        checked=""
                    />

                    <FormInput
                        type="checkbox"
                        customLabel={'Updated payment'}
                        onChange={() => {}}
                        name="form-check-input"
                        id="form-check-input"
                        role="switch"
                        checked=""
                    />

                    <footer>
                        <FormInput type="button" value="Clear" />
                        <FormInput type="button" value="Save changes" />
                    </footer>
                </form>
            </div>
        </div>
    );
};
