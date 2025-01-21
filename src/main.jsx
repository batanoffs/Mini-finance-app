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
                    // Seed Token
                    colorPrimary: 'var(--primary-color)',
                    borderRadius: 6,
                    fontFamily: 'var(--body-font-family)',
                },
            }}
        >
            <App />
        </ConfigProvider>
    </StrictMode>
);
