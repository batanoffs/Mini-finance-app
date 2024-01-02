export const PasswordTab = () => {
    return (
        <div className="tab-pane fade active show" id="password-tab-pane" role="tabpanel" aria-labelledby="password-tab" tabindex="0">
            <h6 className="mb-4">Password</h6>

            <form className="custom-form password-form" action="#" method="post">
                <input type="password" name="password" id="password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Current Password" required=""/>

                <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="New Password" required=""/>

                <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Confirm Password" required=""/>

                <div className="d-flex">
                    <button type="button" className="form-control me-3">
                        Reset
                    </button>

                    <button type="submit" className="form-control ms-2">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    )
}