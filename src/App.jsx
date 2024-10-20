import { Routes, Route } from 'react-router-dom'
import { App } from 'antd'

import { AuthProvider } from './contexts/AuthContext'
import { Header } from './components/pages/Header/Header'
import { Login } from './components/pages/LoginPage/Login'
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage'
import { Footer } from './components/pages/Footer/Footer'
import { Home } from './components/pages/HomePage/Home'
import { Register } from './components/pages/RegisterPage/Register'
import { About } from './components/pages/HomePage/About'
import { PageNotFound } from './components/utils/404'

const MyApp = () => {
    return (
        <AuthProvider>
            <App style={{ fontFamily: 'var(--body-font-family)' }}>
                <Header />
                <main>
                    <Routes>
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register/*" element={<Register />} />
                        <Route path="/dashboard/*" element={<WelcomePage />} />
                    </Routes>
                </main>
                <Footer />
            </App>
        </AuthProvider>
    )
}

export default MyApp
