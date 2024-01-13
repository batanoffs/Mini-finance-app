
import pic from "../../images/svg/money-transfer-isometric-60529.svg";

export const SidebarRegister = () => {
    return (
        <div className="sidebar-container">
                <ul className="sidebar-list">
                    <li className="sidebar-email tracker">Е-майл и парола</li>

                    <li className="sidebar-info tracker">Лична информация</li>

                    <li className="sidebar-card tracker">Въвеждане на карта</li>

                    <li className="sidebar-terms tracker">
                        Приемане на условията
                    </li>

                    <li className="sidebar-reg tracker">Регистрация</li>
                </ul>
                <img
                    src={pic}
                    alt="theme display"
                />
        </div>
    );
};
