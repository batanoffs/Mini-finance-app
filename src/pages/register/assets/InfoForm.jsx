import { Link, useNavigate } from 'react-router-dom'
import { Radio } from 'antd'

import { useMessage } from '../../../hooks/useMessage'
import styles from '../register.module.css'

export const InfoForm = ({
    firstName,
    lastName,
    gender,
    phoneNumber,
    town,
    country,
    address,
    validateHandler,
    onFocusHandler,
    error,
    changeHandler,
    currentStepsHandler,
}) => {
    const navigate = useNavigate()
    const showMessage = useMessage()
    const onNextPageHandler = (e) => {
        e.preventDefault()
        const requiredFields = [firstName, lastName, gender, phoneNumber, town, country]
        const hasEmptyField = requiredFields.some((field) => !field)

        if (!hasEmptyField) {
            currentStepsHandler(e) // Move to the next step
            navigate('/register/terms')
        } else {
            // Show error message for empty fields
            showMessage('error', 'Please fill in all fields')
        }
    }
    const isNextDisabled = [firstName, lastName, gender, phoneNumber, town, country].some(
        (field) => !field
    )

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Please enter your personal information in the form</h5>
                </header>
                <div className="form-group">
                    <label htmlFor="firstName">
                        Name <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        placeholder="Name"
                        value={firstName}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                        required
                    />
                </div>
                <small className={styles.error}>{error.firstName}</small>

                <div className="form-group">
                    <label htmlFor="lastName">
                        Last Name<small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.lastName}</small>
                <div className="form-group">
                    <label htmlFor="gender">
                        Gender <small className="error">*</small>
                    </label>
                    <Radio.Group
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                        style={{
                            marginBottom: '0.8rem',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Radio id="male" name="gender" style={{ fontSize: '1rem' }} value="male">
                            {' '}
                            Male
                        </Radio>
                        <Radio
                            id="female"
                            name="gender"
                            style={{ fontSize: '1rem' }}
                            value="female"
                        >
                            {' '}
                            Female
                        </Radio>
                    </Radio.Group>
                </div>
                <small className={styles.error}>{error.gender}</small>

                <div className="form-group">
                    <label htmlFor="phoneNumber">
                        Phone<small className="error">*</small>
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.phoneNumber}</small>

                <div className="form-group">
                    <label htmlFor="town">
                        Town <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="town"
                        id="town"
                        placeholder="your town..."
                        value={town}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.town}</small>

                <div className="form-group">
                    <label htmlFor="country">
                        Country <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        id="country"
                        placeholder="Country"
                        value={country}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                        autoComplete="country-name"
                    />
                </div>
                <small className={styles.error}>{error.country}</small>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={address}
                        onChange={changeHandler}
                        onFocus={onFocusHandler}
                        autoComplete="address-level1"
                    />
                </div>
                <footer>
                    <Link
                        to={'/register'}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Back
                    </Link>
                    <Link
                        type="submit"
                        to="/register/identity"
                        name="next"
                        className="button-primary"
                        onClick={onNextPageHandler}
                        disabled={isNextDisabled}
                    >
                        Next
                    </Link>
                </footer>
            </div>
        </section>
    )
}
