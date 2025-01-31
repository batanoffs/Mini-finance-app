import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';

import initializeBackendless from './config/backendless';
import theme from './config/antDesignTheme';
import App from './App';

import './css/site.css';

initializeBackendless();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
    </StrictMode>
);
