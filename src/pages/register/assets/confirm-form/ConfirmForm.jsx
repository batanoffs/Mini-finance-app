import { Radio } from 'antd';
import { useState } from 'react';

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
        <div className="form-container">
            <div className="form-content">
                <form
                    style={{ display: `inline-flex`, flexDirection: `column` }}
                    action="#"
                    method="post"
                >
                    <header>
                        <h5>Confirm your data</h5>
                    </header>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            readOnly
                            disabled
                            autoComplete="off"
                            placeholder="no information"
                            className="form-control"
                            value={email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            readOnly
                            disabled
                            autoComplete="off"
                            placeholder="no information"
                            className="form-control"
                            value={password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            id="firstName"
                            placeholder="no information"
                            value={firstName}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            id="lastName"
                            placeholder="no information"
                            value={lastName}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
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

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="no information"
                            value={phoneNumber}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            placeholder="no information"
                            value={address}
                            onChange={changeHandler}
                            autoComplete="address-level1"
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="town">Town</label>
                        <input
                            type="text"
                            className="form-control"
                            name="town"
                            id="town"
                            placeholder="no information"
                            value={town}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            className="form-control"
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
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Back
                    </button>

                    <input
                        type="button"
                        name="confirm"
                        className="button-primary"
                        value={'Confirm data'}
                        onClick={onConfirmHandler}
                    />
                    {isHidden && (
                        <input
                            name="register"
                            type="submit"
                            className="button-primary"
                            value={'Register'}
                            onClick={handleSubmit}
                        />
                    )}
                </footer>
            </div>
        </div>
    );
};
