import { useContext, useState } from 'react'

import { AuthContext } from '../../../../../contexts/AuthContext'
import { UploadPicture } from '../../assets/upload/Upload'

export const ProfileTab = () => {
    const { phone, email } = useContext(AuthContext)
    const [state, setState] = useState({
        email: email,
        phoneNumber: phone,
    })

    const inputChangeHandler = (e) => {
        const { name, value } = e.target
        setState((prev) => ({ ...prev, [name]: value }))
    }

    const onResetHandler = () => {
        console.log('resetted')
    }

    const onUpdateHandler = () => {
        console.log('updated')
    }

    return (
        <div className="form-container">
            <div className="form-content">
                <div className="form-group">
                    <UploadPicture />
                </div>
                <form className="custom-form" method="post">
                    <div className="form-group">
                        <label htmlFor="profile-email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={inputChangeHandler}
                            id="profile-email"
                            placeholder="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Change phone number</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={state.phoneNumber}
                            onChange={inputChangeHandler}
                            autoComplete="off"
                            placeholder="Phone number"
                            className="form-control mb-3"
                        />
                    </div>

                    <footer>
                        <input
                            type="button"
                            onClick={onResetHandler}
                            className="button-secondary"
                            value="Reset"
                        />

                        <input
                            type="submit"
                            onClick={onUpdateHandler}
                            className="button-primary"
                            value="Save changes"
                        />
                    </footer>
                </form>
            </div>
        </div>
    )
}


