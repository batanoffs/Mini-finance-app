import { useState } from 'react';
import { FormInput } from '../../../components/inputs';

export const UserSettingsPasswordTab = () => {
    const [formState, setFormState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const clearForm = () => {
        setFormState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    //TODO: Implement form submission
    return (
        <div className="form-container">
            <div className="form-content">
                <form className="custom-form" method="post">
                    <FormInput
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        value={formState.oldPassword}
                        onChange={inputChangeHandler}
                        pattern="[0-9a-zA-Z]{4,10}"
                        className="form-control"
                        placeholder="Old Password"
                        autoComplete="off"
                        required
                    />

                    <FormInput
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formState.newPassword}
                        onChange={inputChangeHandler}
                        pattern="[0-9a-zA-Z]{4,10}"
                        className="form-control"
                        placeholder="New Password"
                        autoComplete="off"
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={inputChangeHandler}
                        pattern="[0-9a-zA-Z]{4,10}"
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                    />

                    <footer>
                        <input
                            type="button"
                            value="Clear"
                            className="button-secondary"
                            onClick={clearForm}
                        />
                        <input type="submit" value="Save Changes" className="button-primary" />
                    </footer>
                </form>
            </div>
        </div>
    );
};
