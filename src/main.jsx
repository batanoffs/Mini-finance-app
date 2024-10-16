import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import MyApp from './App'

import './css/site.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/mini-finance">
        <StrictMode>
            <MyApp />
        </StrictMode>
    </BrowserRouter>
)
