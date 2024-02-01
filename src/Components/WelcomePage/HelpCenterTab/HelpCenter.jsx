import { ContactInfo } from "../assets/ContactInfo";

export const HelpCenterTab = () => {
    return (
        <div className="content-container">
            <main className="bento-main-column">
                <div className="custom-block">
                    <form className="custom-form" action="#" method="post">
                        <header>
                            <h4>Как можем да ви помогнем?</h4>
                        </header>
                        <label htmlFor="search">Търсене по тема: </label>
                        <input
                            className="form-control"
                            name="search"
                            type="text"
                            placeholder="Търсене"
                            aria-label="Search"
                        />
                        <footer>
                            <input
                                type="submit"
                                value="Изпрати"
                                className="button-primary"
                            />
                        </footer>
                    </form>
                </div>

                <div className="custom-block">
                    <h5>Често задавани въпроси</h5>

                    <strong>Как да създам нова карта?</strong>

                    <p>
                        За да създадете нова карта е необходимо да натиснете на
                        бутона "Създай карта".
                    </p>

                    <strong>От къде мога да сменя профиланта си снимка?</strong>

                    <p>
                        За да смените профиланта си снимка трябва да навигирате
                        до Настройки - Профил и натиснете на бутона "Избери
                        снимка".
                    </p>

                    <strong>Как да променя паролата си?</strong>

                    <p>
                        За да промените паролата си е необходимо да навигирате
                        до Настройки-Парола и натиснете на бутона "Запази
                        промените", след като сте въвели новата парола.
                    </p>
                </div>
            </main>

            <aside className="bento-side-column">
                <ContactInfo />
            </aside>
        </div>
    );
};
