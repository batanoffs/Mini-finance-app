import { Radio } from 'antd';

import { useMessage } from '../../../../hooks/useMessage';
import { FormInput } from '../../../../components/inputs';

import styles from './info-form.module.css';

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
    const showMessage = useMessage();
    const onNextPageHandler = (e) => {
        e.preventDefault();
        const requiredFields = [firstName, lastName, gender, phoneNumber, town, country];
        const hasEmptyField = requiredFields.some((field) => !field);

        if (!hasEmptyField) {
            currentStepsHandler(e); // Move to the next step
        } else {
            // Show error message for empty fields
            showMessage('error', 'Please fill in all fields');
        }
    };
    const isNextDisabled = [firstName, lastName, gender, phoneNumber, town, country].some(
        (field) => !field
    );

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Please enter your personal information in the form</h5>
                </header>
                <FormInput
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Name"
                    value={firstName}
                    error={error.firstName}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    required
                />
                <FormInput
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    error={error.lastName}
                />
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

                <FormInput
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    error={error.phoneNumber}
                    required
                />
                <FormInput
                    type="text"
                    name="town"
                    id="town"
                    placeholder="your town..."
                    value={town}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    error={error.town}
                    required
                />
                <FormInput
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    value={country}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    error={error.country}
                    autoComplete="country-name"
                    required
                />
                <FormInput
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    autoComplete="address-level1"
                />

                <footer>
                    <button name="prev" className="button-secondary" onClick={currentStepsHandler}>
                        Back
                    </button>
                    <button
                        name="next"
                        className="button-primary"
                        onClick={onNextPageHandler}
                        disabled={isNextDisabled}
                    >
                        Next
                    </button>
                </footer>
            </div>
        </section>
    );
};
