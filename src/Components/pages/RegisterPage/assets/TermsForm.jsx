import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const TermsForm = ({ currentStepsHandler, check, termsCheckHandler }) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const checkHandler = async (e) => {
        if (check) {
            currentStepsHandler(e)
            setError('')
            navigate('/register/confirm')
        } else {
            setError('You have not confirmed the terms')
        }
    }

    return (
        <div className="form-container" style={{ maxWidth: '800px', margin: '1em auto' }}>
            <div className="form-content" style={{ paddingLeft: '4em', paddingRight: '4em' }}>
                <header style={{ marginBottom: '0.5em' }}>
                    <h5>Terms and Conditions</h5>
                </header>
                <div
                    style={{
                        width: '650px',
                        height: '500px',
                        overflowY: 'scroll',
                        border: '1px solid #ccc',
                        padding: '5px',
                    }}
                >
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
                        htmlFor="accept"
                    >
                        I agree to the terms
                    </h6>

                    <input
                        type="checkbox"
                        name="accept"
                        value={check}
                        onChange={termsCheckHandler}
                        className="form-control"
                    />
                </div>
                <p className="error">{error}</p>
                <footer style={{ paddingBottom: '0', marginTop: '0em' }}>
                    <Link
                        type="button"
                        name="prev"
                        className="button-secondary"
                        to={'/register/userinfo'}
                        onClick={currentStepsHandler}
                    >
                        Back
                    </Link>
                    <button name="next" className="button-primary" onClick={checkHandler}>
                        Next
                    </button>
                </footer>
            </div>
        </div>
    )
}
