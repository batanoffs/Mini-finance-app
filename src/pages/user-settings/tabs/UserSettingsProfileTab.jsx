import { useContext, useState } from 'react';

import { UploadPicture } from '../../../components/buttons';
import { AuthContext } from '../../../contexts/AuthContext';
import { FormInput } from '../../../components/inputs';

export const UserSettingsProfileTab = () => {
    const { auth } = useContext(AuthContext);
    const [state, setState] = useState({
        changeEmail: auth.email,
        changePhoneNumber: auth.phoneNumber,
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    // TODO update handlers
    const onResetHandler = () => {
        console.log('resetted');
    };

    const onUpdateHandler = () => {
        console.log('updated');
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <div className="form-group">
                    <UploadPicture />
                </div>
                <form className="custom-form" method="post">
                    <FormInput
                        autoComplete="off"
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={inputChangeHandler}
                        id="changeEmail"
                        placeholder="email"
                        required
                    />

                    <FormInput
                        autoComplete="off"
                        type="number"
                        name="phone"
                        value={state.phoneNumber}
                        onChange={inputChangeHandler}
                        id="changePhoneNumber"
                        placeholder="Phone number"
                        required
                    />

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
    );
};
