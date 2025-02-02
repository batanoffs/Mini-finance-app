import { FormInput } from '../../../../components/inputs';

import styles from './terms-form.module.css';

export const TermsForm = ({
    currentStepsHandler,
    validateHandler,
    changeHandler,
    error,
    termsAccept,
}) => {
    const checkHandler = async (e) => {
        if (typeof termsAccept === 'boolean' && termsAccept) {
            currentStepsHandler(e);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <header>
                    <h5>Terms and Conditions</h5>
                </header>
                <div className={styles.terms}>
                    <p>
                        Welcome to our website. By continuing to browse and use this website, you
                        agree to comply with and be bound by the following terms of use, which
                        together with our privacy policy govern our relationship with you in
                        relation to this website.
                    </p>
                    <h6>1. Financial Information</h6>
                    <p>
                        The content of the pages of this website is for your general information and
                        use only. It is subject to change without notice.
                    </p>
                    <h6>2. Registration</h6>
                    <p>
                        To access certain services on this website, you will need to provide
                        specific information. All information you provide must be accurate and
                        complete.
                    </p>
                    <h6>3. Security</h6>
                    <p>
                        We are committed to ensuring that your information is secure. To prevent
                        unauthorized access or disclosure, we have put in place suitable physical,
                        electronic, and managerial procedures to safeguard and secure the
                        information we collect online.
                    </p>
                    <h6>4. Limitation of Liability</h6>
                    <p>
                        Use of any information or materials on this website is entirely at your own
                        risk, for which we shall not be liable. It shall be your own responsibility
                        to ensure that any products, services, or information available through this
                        website meet your specific requirements.
                    </p>
                    <h6>5. Changes to Terms</h6>
                    <p>
                        We reserve the right to change these terms and conditions at any time. You
                        will be notified in your account upon changes.
                    </p>
                    <h6>6. Contact Information</h6>
                    <p>
                        If you have any questions regarding these terms and conditions, please
                        contact us.
                    </p>
                </div>
                <div className={styles.termsAccept}>
                    <h6 htmlFor="termsAccept">I agree to the terms</h6>

                    <input
                        type="checkbox"
                        name="termsAccept"
                        checked={typeof termsAccept === 'boolean' ? termsAccept : false}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        className="form-control"
                    />
                </div>
                <p className={styles.error}>{error.termsAccept}</p>
                <footer>
                    <FormInput
                        type="button"
                        id="back"
                        value="Back"
                        name="prev"
                        onClick={currentStepsHandler}
                    />
                    <FormInput
                        type="button"
                        id="next"
                        value="Next"
                        name="next"
                        onClick={checkHandler}
                        disabled={isNextDisabled}
                    />
                </footer>
            </div>
        </div>
    );
};
