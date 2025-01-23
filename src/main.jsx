import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';

import App from './App';

import './css/site.css';

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
