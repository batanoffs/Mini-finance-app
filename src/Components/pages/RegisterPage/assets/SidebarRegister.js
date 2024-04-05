// import pic from "../../../../images/svg/money-transfer-isometric-60529.svg";
import { Divider, Steps } from "antd";

import styles from "../register.module.css";

export const SidebarRegister = (props) => {

    const checkWidth = () => {
        if (window.innerWidth < 700) {
            return "horizontal";
        } else {
            return "vertical";
        }
    }
    return (
        <div className={styles.sidebar_container}>
            <div className="sidebar-list">                
                <Steps
                    direction={checkWidth()}
                    size="small"
                    style={{fontFamily: "var(--body-font-family)", padding: "20px 20px"}}
                    current={props.currentStep}
                    items={[
                        {
                            title: "Имейл и парола",
                            description: "",
                        },
                        {
                            title: "Лична информация",
                            description:"",
                        },
                        {
                            title: "Общи условия",
                            description: "",
                        },
                        {
                            title: "Регистрация",
                            description: "проверка на данни",
                        },
                    ]}
                />
            </div>

            <Divider />
            
            <img className={styles.sidebarIcon} src="https://notablepen.backendless.app/api/files/app/AppData/home/money-transfer-isometric-60529.svg" alt="theme display" />
        </div>
    );
};
