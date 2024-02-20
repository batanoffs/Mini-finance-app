export const PasswordTab = () => {
    return (
        <div className="form-container">
            <div className="form-content">
                <form className="custom-form" method="post">
                    <field className="form-group">
                        <label htmlFor="old_password">Стара парола</label>

                        <input
                            type="password"
                            name="old_password"
                            id="password"
                            pattern="[0-9a-zA-Z]{4,10}"
                            className="form-control"
                            placeholder="Стара парола"
                            required=""
                        />
                    </field>
                    <field className="form-group">
                        <label htmlFor="new_password">Нова парола</label>

                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            pattern="[0-9a-zA-Z]{4,10}"
                            className="form-control"
                            placeholder="Нова парола"
                            required=""
                        />
                    </field>

                    <field className="form-group">
                        <label htmlFor="confirm_password">
                            Потвърди парола
                        </label>

                        <input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            pattern="[0-9a-zA-Z]{4,10}"
                            className="form-control"
                            placeholder="Потвърди парола"
                            required=""
                        />
                    </field>

                    <footer>
                        <input
                            type="button"
                            value="Изчисти"
                            className="button-secondary"
                        />

                        <input
                            type="submit"
                            value="Запази промени"
                            className="button-primary"
                        />
                    </footer>
                </form>
            </div>
        </div>
    );
};
