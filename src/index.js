import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import MyApp from './App'

import './css/site.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter basename="/mini-finance">
        <MyApp />
    </BrowserRouter>
)
