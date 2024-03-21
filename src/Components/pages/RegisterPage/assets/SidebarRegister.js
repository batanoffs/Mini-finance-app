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
                
                    current={props.currentStep}
                    items={[
                        {
                            title: "Създаване на акаунт",
                            description:
                                "Имейл и парола.",
                        },
                        {
                            title: "Лична информация",
                            description:
                                "данни от потребителя",
                        },
                        {
                            title: "Общи условия",
                            description: "условия за ползване",
                        },
                        {
                            title: "Проферка на идентичност",
                            description:
                                "моля пуснете вашата камера",
                        },
                        
                        {
                            title: "Проверка и регистрация",
                            description: "",
                        },
                    ]}
                />
            </div>

            <Divider />
            
            <img src="https://notablepen.backendless.app/api/files/app/AppData/home/money-transfer-isometric-60529.svg" alt="theme display" />
        </div>
    );
};
