export const PersonalInfo = () => {
    return (
        <section className="form-container">
            <div className="registration form">
                <form action="#" method="post">
                    <header>Лична информация</header>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Име"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="surname"
                        placeholder="Фамилия"
                    />
                    <label htmlFor="gender">Мъж</label>
                    <input
                        type="radio"
                        name="male"
                        value="male"
                        id="male"
                        className="form-control"
                        placeholder="Мъж"
                    />
                    <label htmlFor="gender">Жена</label>
                    <input
                        type="radio"
                        name="female"
                        value="female"
                        id="female"
                        className="form-control"
                        placeholder="Жена"
                    />

                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Телефон"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Адрес"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Град"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Държава"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="Пощенски код"
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
