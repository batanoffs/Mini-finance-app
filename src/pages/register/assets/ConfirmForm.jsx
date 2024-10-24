import { Link } from 'react-router-dom'
import { Radio } from 'antd'
import { useState } from 'react'
import { assignNewCardId } from '../../../utils/assignNewCardId'
import { useMessage } from '../../../hooks/useMessage'

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
    const showMessage = useMessage()

    const onConfirmHandler = async (e) => {
        e.preventDefault()
        try {
            e.target.hidden = true
            setHidden(true)
            const response = await assignNewCardId()
            if (response && response.message) {
                showMessage('error', response.message)
                return
            }
            changeHandler({ target: { name: 'cardId', value: values } })
        } catch (error) {
            showMessage('error', 'An error occurred while confirming data')
        }
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
                            id="email"
                            readOnly
                            autoComplete="off"
                            placeholder="no information"
                            className="form-control"
                            value={email}
                            onChange={changeHandler}
                        />
                    </div>
                    <label htmlFor="cardId" hidden={true} />
                    <input
                        type="id"
                        name="cardId"
                        id="cardId"
                        readOnly
                        hidden
                        autoComplete="off"
                        placeholder="no information"
                        className="form-control"
                        value={cardId}
                        onChange={changeHandler}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        readOnly
                        hidden
                        autoComplete="off"
                        placeholder="no information"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                    />

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
