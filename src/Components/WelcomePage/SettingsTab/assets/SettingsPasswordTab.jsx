export const PasswordTab = () => {
    return (
        <div className="tab-pane fade active show" id="password-tab-pane" role="tabpanel" aria-labelledby="password-tab" tabIndex="0">
            <h5 className="mb-4">Промяна на парола</h5>

            <form className="custom-form password-form" action="#" method="post">
                <input type="password" name="password" id="password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Стара парола" required=""/>

                <input type="password" name="new_password" id="new_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Нова парола" required=""/>

                <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Потвърди парола" required=""/>

                <div className="d-flex">
                    <button type="button" className="form-control me-3">
                        Изчисти
                    </button>

                    <button type="submit" className="form-control ms-2">
                    Запази промени
                    </button>
                </div>
            </form>
        </div>
    )
}