import { Routes, Route } from 'react-router-dom'
import { App } from 'antd'

import { Dashboard, Footer, Header, Home, Register, Login, About } from './pages/index'
import { AuthProvider } from './contexts/AuthContext'
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
                        <Route path="/dashboard/*" element={<Dashboard />} />
                    </Routes>
                </main>
                <Footer />
            </App>
        </AuthProvider>
    )
}

export default MyApp
