import { Radio } from 'antd';
import { useState } from 'react';

import styles from './confirm-form.module.css';

export const ConfirmForm = ({
    email,
    password,
    firstName,
    lastName,
    gender,
    country,
    phoneNumber,
    address,
    town,
    currentStepsHandler,
    handleSubmit,
    changeHandler,
}) => {
    const [isHidden, setHidden] = useState(false);

    const onConfirmHandler = (e) => {
        const registerButton = e.target;
        registerButton.hidden = true;
        setHidden(true);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <form>
                    <header>
                        <h5>Confirm your data</h5>
                    </header>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            readOnly
                            disabled
                            autoComplete="off"
                            placeholder="no information"
                            className={styles.formControl}
                            value={email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            readOnly
                            disabled
                            autoComplete="off"
                            placeholder="no information"
                            className={styles.formControl}
                            value={password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            className={styles.formControl}
                            name="firstName"
                            id="firstName"
                            placeholder="no information"
                            value={firstName}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            className={styles.formControl}
                            name="lastName"
                            id="lastName"
                            placeholder="no information"
                            value={lastName}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Gender</label>
                        <Radio.Group
                            name="gender"
                            id="gender"
                            value={gender}
                            onChange={changeHandler}
                            disabled
                            style={{
                                marginBottom: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Radio value="male"> Male </Radio>
                            <Radio value="female"> Female </Radio>
                        </Radio.Group>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            type="tel"
                            className={styles.formControl}
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="no information"
                            value={phoneNumber}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className={styles.formControl}
                            name="address"
                            id="address"
                            placeholder="no information"
                            value={address}
                            onChange={changeHandler}
                            autoComplete="address-level1"
                            disabled
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="town">Town</label>
                        <input
                            type="text"
                            className={styles.formControl}
                            name="town"
                            id="town"
                            placeholder="no information"
                            value={town}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            className={styles.formControl}
                            name="country"
                            id="country"
                            placeholder="no information"
                            value={country}
                            onChange={changeHandler}
                            autoComplete="country"
                            disabled
                        />
                    </div>
                </form>
                <footer>
                    <button
                        name="prev"
                        to={'/register/terms'}
                        className={styles.buttonSecondary}
                        onClick={currentStepsHandler}
                    >
                        Back
                    </button>

                    <input
                        type="button"
                        name="confirm"
                        className={styles.buttonPrimary}
                        value={'Confirm data'}
                        onClick={onConfirmHandler}
                    />
                    {isHidden && (
                        <input
                            name="register"
                            type="submit"
                            className={styles.buttonPrimary}
                            value={'Register'}
                            onClick={handleSubmit}
                        />
                    )}
                </footer>
            </div>
        </div>
    );
};
