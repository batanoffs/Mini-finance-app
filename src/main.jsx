import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import MyApp from './App'

import './css/site.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/">
        <StrictMode>
            <AuthProvider>
                <MyApp />
            </AuthProvider>
        </StrictMode>
    </BrowserRouter>
)
