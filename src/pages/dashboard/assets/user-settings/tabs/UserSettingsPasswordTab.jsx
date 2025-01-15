export const UserSettingsPasswordTab = () => {
    return (
        <div className="form-container">
            <div className="form-content">
                <form className="custom-form" method="post">
                    <div className="form-group">
                        <label htmlFor="old_password">Old Password</label>

                        <input
                            type="password"
                            name="old_password"
                            id="password"
                            pattern="[0-9a-zA-Z]{4,10}"
                            className="form-control"
                            placeholder="Old Password"
                            required=""
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new_password">New Password</label>

                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            pattern="[0-9a-zA-Z]{4,10}"
                            className="form-control"
                            placeholder="New Password"
                            required=""
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password">Confirm Password</label>

                        <input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            pattern="[0-9a-zA-Z]{4,10}"
                            className="form-control"
                            placeholder="Confirm Password"
                            required=""
                        />
                    </div>

                    <footer>
                        <input type="button" value="Clear" className="button-secondary" />

                        <input type="submit" value="Save Changes" className="button-primary" />
                    </footer>
                </form>
            </div>
        </div>
    )
}
