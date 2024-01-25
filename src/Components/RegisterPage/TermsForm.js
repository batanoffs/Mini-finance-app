import { Link, useNavigate } from "react-router-dom";

export const TermsForm = ({
    currentStepsHandler,
    check,
    termsCheckHandler,
}) => {
    const navigate = useNavigate();

    const checkHandler = async (e) => {
        if (check) {
            currentStepsHandler(e);
            navigate("/mini-finance/register/confirm");
        } else {
            alert("Please accept the terms and conditions to proceed");
        }
    };

    return (
        <div
            className="form-container"
            style={{ maxWidth: "700px", margin: "1em auto" }}
        >
            <div
                className="form-content"
                style={{ paddingLeft: "4em", paddingRight: "4em" }}
            >
                <header style={{ marginBottom: "0.5em" }}>
                    <h5>Правила и условия</h5>
                </header>
                <div
                    style={{
                        width: "560px",
                        height: "500px",
                        overflowY: "scroll",
                        border: "1px solid #ccc",
                        padding: "5px",
                    }}
                >
                    <p>
                        Добре дошли на нашият уебсайт. С продължаването на
                        прегледа и използването на този уебсайт Вие се
                        съгласявате да спазвате и бъдете обвързани от следните
                        условия за използване, които заедно с нашата политика за
                        поверителност уреждат нашите взаимоотношения с вас
                        относно този уебсайт.
                    </p>
                    <h6>1. Финансова информация</h6>
                    <p>
                        Съдържанието на страниците на този уебсайт е само за
                        ваша обща информация и използване. То подлежи на промяна
                        без предизвестие.
                    </p>
                    <h6>2. Регистрация</h6>
                    <p>
                        За да получите достъп до определени услуги на този
                        уебсайт, ще трябва да предоставите конкретна информация.
                        Всичка предоставена от вас информация трябва да бъде
                        точна и пълна.
                    </p>
                    <h6>3. Сигурност</h6>
                    <p>
                        Ние сме ангажирани да гарантираме, че вашата информация
                        е защитена. За да предотвратим неоторизиран достъп или
                        разкриване, сме въвели подходящи физически, електронни и
                        управленски процедури за защита и осигуряване на
                        информацията, която събираме онлайн.
                    </p>
                    <h6>4. Ограничение на отговорността</h6>
                    <p>
                        Използването на всяка информация или материали на този
                        уебсайт е изцяло на ваш собствен риск, за което ние няма
                        да носим отговорност. Това ще бъде вашата собствена
                        отговорност да осигурите, че всякакви продукти, услуги
                        или информация, достъпни чрез този уебсайт, отговарят на
                        вашите конкретни изисквания.
                    </p>
                    <h6>5. Промени в условията</h6>
                    <p>
                        Запазваме си правото да променяме тези правила и условия
                        по всяко време. При промени ще получите известие във
                        вашият профил.
                    </p>
                    <h6>6. Контактна информация</h6>
                    <p>
                        Ако имате въпроси относно тези условия и условия, моля,
                        свържете се с нас.
                    </p>
                </div>
                <div style= {{marginTop: '10px'}}>
                    <label
                        style={{
                            color: "var(--heading-color)",
                            fontSize: "1rem",
                            fontWeight: "600",
                            alignSelf: "start",
                        }}
                        htmlFor="accept"
                    >
                        Съгласен съм с условията
                    </label>

                    <input
                        type="checkbox"
                        name="accept"
                        value={check}
                        onChange={termsCheckHandler}
                        className="form-control"
                        style={{ width: "15px", height: "15px" }}
                    />
                </div>
                <footer style={{ paddingBottom: "0" }}>
                    <Link
                        type="button"
                        name="prev"
                        className="button-secondary"
                        to={"/mini-finance/register/identity"}
                        onClick={currentStepsHandler}
                    >
                        Назад
                    </Link>
                    <button
                        name="next"
                        className="button-primary"
                        onClick={checkHandler}
                    >
                        Напред
                    </button>
                </footer>
            </div>
        </div>
    );
};
