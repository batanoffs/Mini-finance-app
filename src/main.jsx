import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'

import './css/site.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)
