import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "./css/site.css";
import MyApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter basename="/mini-finance">
            <MyApp />
        </BrowserRouter>
);