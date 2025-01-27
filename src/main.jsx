import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';

import initializeBackendless from './config/backendless';
import App from './App';

import './css/site.css';

initializeBackendless();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'var(--primary-color)',
                    fontFamily: 'var(--body-font-family)',
                    borderRadius: 6,
                },
            }}
        >
            <App />
        </ConfigProvider>
    </StrictMode>
);
