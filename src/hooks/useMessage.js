import { App } from "antd";

export const useMessage = () => {
    const { message } = App.useApp();

    return (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };
};
