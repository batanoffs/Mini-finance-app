import pic from "../../images/svg/money-transfer-isometric-60529.svg";
import React from "react";
import { Divider, Steps } from "antd";

export const SidebarRegister = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-list">                
                <Steps
                    direction="vertical"
                    size="small"
                    current={1}
                    items={[
                        {
                            title: "Finished",
                            description:
                                "Е-майл и парола.",
                        },
                        {
                            title: "Finished",
                            description:
                                "Лична информация.",
                        },
                        {
                            title: "In Progress",
                            description:
                                "Въвеждане на карта.",
                        },
                        {
                            title: "Waiting",
                            description: "Приемане на условията.",
                        },
                        {
                            title: "Waiting",
                            description: "Регистрация.",
                        },
                    ]}
                />
            </div>

            <Divider />
            
            <img src={pic} alt="theme display" />
        </div>
    );
};
