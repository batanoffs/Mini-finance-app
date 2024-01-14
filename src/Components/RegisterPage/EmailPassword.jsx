export const EmailPassword = () => {
    return (
        <section className="form-container">
            <div className="registration form">
                <form action="#" method="post">
                    <header>Е-майл и парола</header>

                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Въведи е-майла"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Въведи парола"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Потвърди парола"
                        className="form-control"
                    />
                    <input
                        type="submit"
                        name="submit"
                        className="button btn btn-primary"
                        value="Напред"
                    />
                </form>
            </div>
        </section>
    );
};
