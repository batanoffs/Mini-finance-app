import { Contact } from "../SettingsTab/NavigationPanel/CallUs";

export const HelpCenterTab = () => {
    return (
        <>
            <div className="title-group mb-3 mt-4">
                <h4 className="h4 mb-0">Как можем да ви помогнем?</h4>
            </div>

            <div className="row my-4">
                <div className="col-lg-7 col-12">
                    <div className="custom-block bg-white">
                        <form
                            className="custom-form search-form"
                            action="#"
                            method="post"
                        >
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <h6>Търсене по тема</h6>
                                </div>

                                <div className="col-lg-8 col-md-8 col-12">
                                    <input
                                        className="form-control mb-lg-0 mb-md-0"
                                        name="search"
                                        type="text"
                                        placeholder="Търсене"
                                        aria-label="Search"
                                    />
                                </div>

                                <div className="col-lg-4 col-md-4 col-12">
                                    <button
                                        type="submit"
                                        className="form-control"
                                    >
                                        Изпрати
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="custom-block custom-block-faq">
                        <h5 className="mb-4">Често задавани въпроси</h5>

                        <strong className="d-block mb-2">
                            Как да създам нова карта?
                        </strong>

                        <p>
                            За да създадете нова карта е необходимо да натиснете
                            на бутона "Създай карта".
                        </p>

                        <strong className="d-block mt-3 mb-2">
                            От къде мога да сменя профиланта си снимка?
                        </strong>

                        <p>
                            За да смените профиланта си снимка трябва да
                            навигирате до Настройки - Профил и натиснете на
                            бутона "Избери снимка".
                        </p>

                        <strong className="d-block mt-3 mb-2">
                            Как да променя паролата си?
                        </strong>

                        <p>
                            За да промените паролата си е необходимо да
                            навигирате до Настройки-Парола и натиснете на бутона
                            "Запази промените", след като сте въвели новата
                            парола.
                        </p>
                    </div>
                </div>

                <Contact />
            </div>
        </>
    );
};
