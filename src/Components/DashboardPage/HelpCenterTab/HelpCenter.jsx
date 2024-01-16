import { Contact } from "../SettingsTab/NavigationTabs/CallUs";

export const HelpCenterTab = () => {
    return (
        <div className="content-container">
            <div className="column">
                <div className="title-group">
                    <h4>Как можем да ви помогнем?</h4>
                </div>
                <div className="custom-block bg-white">
                    <form
                        className="custom-form search-form"
                        action="#"
                        method="post"
                    >
                        <div className="row">
                            <div>
                                <h6>Търсене по тема</h6>
                            </div>

                            <div>
                                <input
                                    className="form-control"
                                    name="search"
                                    type="text"
                                    placeholder="Търсене"
                                    aria-label="Search"
                                />
                            </div>

                            <div>
                                <button type="submit" className="form-control">
                                    Изпрати
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="custom-block custom-block-faq">
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
            </div>
            <div className="column">
                <Contact />
            </div>
        </div>
    );
};
