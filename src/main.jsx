import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import initializeBackendlessSDK from './config/backendless';
import App from './App';

import './css/site.css';

initializeBackendlessSDK();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
