import { App } from 'antd';

/**
 * @typedef {'success' | 'error' | 'info' | 'warning'} MessageType
 * @typedef {Object} MessageOptions
 * @property {number} [duration=3] - Display duration in seconds
 * @property {boolean} [closeIcon=false] - Whether to show close icon
 * @property {() => void} [onClose] - Callback when message is closed
 */

/**
 * Custom hook for displaying Ant Design message notifications
 * @returns {(type: MessageType, text: string, options?: MessageOptions) => void}
 */

export const useMessage = () => {
    const { message } = App.useApp();

    const defaultOptions = {
        duration: 3,
        closeIcon: false,
    };

    return (type, text, options = {}) => {
        const config = { ...defaultOptions, ...options, content: text };

        switch (type) {
            case 'error':
                message.error(config);
                break;
            case 'success':
                message.success(config);
                break;
            case 'warning':
                message.warning(config);
                break;
            case 'info':
                message.info(config);
                break;
            default:
                message.open({ ...config, type });
        }
    };
};
