import { Link } from 'react-router-dom'
import { Radio } from 'antd'
import { useState } from 'react'

import { setNewGeneratedId } from '../../../../utils/setNewGeneratedId'

export const ConfirmForm = ({
    email,
    password,
    firstName,
    lastName,
    gender,
    country,
    phoneNumber,
    cardId,
    address,
    town,
    currentStepsHandler,
    onSubmitRegister,
    changeHandler,
}) => {
    const [isHidden, setHidden] = useState(false)

    const onConfirmHandler = async (e) => {
        e.preventDefault()
        e.target.hidden = true
        setHidden(true)
        changeHandler({ target: { name: 'cardId', value: await setNewGeneratedId() } })
    }
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
                            readOnly
                            autoComplete="off"
                            placeholder="no information"
                            className="form-control"
                            value={email}
                            onChange={changeHandler}
                            id="email"
                        />
                    </div>
                    <input
                        type="id"
                        name="cardId"
                        readOnly
                        hidden
                        autoComplete="off"
                        placeholder="no information"
                        className="form-control"
                        value={cardId}
                        onChange={changeHandler}
                        id="cardId"
                    />
                    <input
                        type="password"
                        name="password"
                        readOnly
                        hidden
                        autoComplete="off"
                        placeholder="no information"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        id="password"
                    />

                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
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
                            placeholder="no information"
                            value={address}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="town">Town</label>
                        <input
                            type="text"
                            className="form-control"
                            name="town"
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
                            disabled
                        />
                    </div>
                </form>
                <footer>
                    <Link
                        type="button"
                        name="prev"
                        to={'/register/terms'}
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Back
                    </Link>

                    <input
                        name="confirm"
                        type="button"
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
                            onClick={onSubmitRegister}
                        />
                    )}
                </footer>
            </div>
        </div>
    )
}
