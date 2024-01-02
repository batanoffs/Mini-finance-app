import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import "./css/apexcharts.css";
import "./css/bootstrap-icons.css";
import "./css/bootstrap.min.css";
import "./css/tooplate-mini-finance.css";
import "./css/login.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);