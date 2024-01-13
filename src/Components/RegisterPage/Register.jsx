import { SidebarRegister } from "./SidebarRegister";
import "./register.css";

export const Register = () => {
    return (
        <div className="register-container">
            <SidebarRegister />
            <section className="form-container">
                <div className="registration form">
                    <form action="#" method="post">
                        <header>Е-майл и парола</header>
                        <label htmlFor="email">Е-майл</label>

                        <input
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Въведи е-майла"
                            className="form-control"
                        />
                        <label htmlFor="password"> Парола</label>

                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Въведи парола"
                            className="form-control"
                        />
                        <label htmlFor="confirmPassword">Потвърди парола</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            autoComplete="off"
                            placeholder="Confirm your password"
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
        </div>
    );
};
