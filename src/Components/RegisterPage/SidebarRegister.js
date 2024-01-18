import pic from "../../images/svg/money-transfer-isometric-60529.svg";
import React from "react";
import { Divider, Steps } from "antd";

export const SidebarRegister = (props) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-list">                
                <Steps
                    direction="vertical"
                    size="small"
                    current={props.currentStep}
                    items={[
                        {
                            title: "Създаване на потребител",
                            description:
                                "емаил и парола.",
                        },
                        {
                            title: "Лична информация.",
                            description:
                                "данни от потребителя.",
                        },
                        {
                            title: "Добавяне на банкова карта",
                            description:
                                "въведете вашата карта.",
                        },
                        {
                            title: "Общи условия",
                            description: "условия за ползване",
                        },
                        {
                            title: "Регистрация",
                            description: "преглед.",
                        },
                    ]}
                />
            </div>

            <Divider />
            
            <img src={pic} alt="theme display" />
        </div>
    );
};
