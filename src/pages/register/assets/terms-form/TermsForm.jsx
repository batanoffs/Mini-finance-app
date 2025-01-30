import { FormInput } from '../../../../components/inputs';

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
        <div className="form-container" style={{ maxWidth: '800px', margin: '1em auto' }}>
            <div className="form-content" style={{ paddingLeft: '2em', paddingRight: '2em' }}>
                <header style={{ marginBottom: '1em' }}>
                    <h5>Terms and Conditions</h5>
                </header>
                <div
                    style={{
                        width: 'auto',
                        height: '500px',
                        overflowY: 'scroll',
                        border: '1px solid #ccc',
                        padding: '5px',
                    }}
                >
                    <p style={{ marginBottom: '1em' }}>
                        Welcome to our website. By continuing to browse and use this website, you
                        agree to comply with and be bound by the following terms of use, which
                        together with our privacy policy govern our relationship with you in
                        relation to this website.
                    </p>
                    <h6>1. Financial Information</h6>
                    <p style={{ marginBottom: '1em' }}>
                        The content of the pages of this website is for your general information and
                        use only. It is subject to change without notice.
                    </p>
                    <h6>2. Registration</h6>
                    <p style={{ marginBottom: '1em' }}>
                        To access certain services on this website, you will need to provide
                        specific information. All information you provide must be accurate and
                        complete.
                    </p>
                    <h6>3. Security</h6>
                    <p style={{ marginBottom: '1em' }}>
                        We are committed to ensuring that your information is secure. To prevent
                        unauthorized access or disclosure, we have put in place suitable physical,
                        electronic, and managerial procedures to safeguard and secure the
                        information we collect online.
                    </p>
                    <h6>4. Limitation of Liability</h6>
                    <p style={{ marginBottom: '1em' }}>
                        Use of any information or materials on this website is entirely at your own
                        risk, for which we shall not be liable. It shall be your own responsibility
                        to ensure that any products, services, or information available through this
                        website meet your specific requirements.
                    </p>
                    <h6>5. Changes to Terms</h6>
                    <p style={{ marginBottom: '1em' }}>
                        We reserve the right to change these terms and conditions at any time. You
                        will be notified in your account upon changes.
                    </p>
                    <h6>6. Contact Information</h6>
                    <p style={{ marginBottom: '1em' }}>
                        If you have any questions regarding these terms and conditions, please
                        contact us.
                    </p>
                </div>
                <div
                    style={{
                        marginTop: '1em',
                        display: 'inline-flex',
                        gap: '0.5em',
                        justifyContent: 'left',
                        alignItems: 'center',
                    }}
                >
                    <h6
                        style={{
                            color: 'var(--heading-color)',
                            fontWeight: '600',
                            alignSelf: 'start',
                        }}
                        htmlFor="termsAccept"
                    >
                        I agree to the terms
                    </h6>

                    <input
                        type="checkbox"
                        name="termsAccept"
                        checked={typeof termsAccept === 'boolean' ? termsAccept : false}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        className="form-control"
                    />
                </div>
                <p className="error">{error.termsAccept}</p>
                <footer style={{ paddingBottom: '0', marginTop: '1em' }}>
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
