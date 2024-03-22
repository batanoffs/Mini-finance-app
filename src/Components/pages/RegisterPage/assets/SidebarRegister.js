// import pic from "../../../../images/svg/money-transfer-isometric-60529.svg";
import { Divider, Steps } from "antd";
import styles from "../register.module.css";

export const SidebarRegister = (props) => {
    return (
        <div className={styles.sidebar_container}>
            <div className="sidebar-list">                
                <Steps
                    direction="vertical"
                    size="small"
                    style={{fontFamily: "var(--body-font-family)", padding: "0 20px"}}
                    current={props.currentStep}
                    items={[
                        {
                            title: "Създаване на акаунт",
                            description:
                                "въведете имейл и парола",
                        },
                        {
                            title: "Лична информация",
                            description:
                                "данни от потребителя",
                        },
                        {
                            title: "Идентичност",
                            description:
                                "моля пуснете вашата камера",
                        },
                        {
                            title: "Общи условия",
                            description: "",
                        },
                        {
                            title: "Регистрация",
                            description: "проверете данните",
                        },
                    ]}
                />
            </div>

            <Divider />
            
            <img src="https://notablepen.backendless.app/api/files/app/AppData/home/money-transfer-isometric-60529.svg" alt="theme display" />
        </div>
    );
};
