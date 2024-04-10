import { Routes, Route, useNavigate } from 'react-router-dom'
import { Result, App } from 'antd'

import { AuthProvider } from './contexts/AuthContext'
import { Header } from './components/pages/Header/Header'
import { Login } from './components/pages/LoginPage/Login'
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage'
import { Footer } from './components/pages/Footer/Footer'
import { Home } from './components/pages/HomePage/Home'
import { Register } from './components/pages/RegisterPage/Register'
import { About } from './components/pages/HomePage/About'

const MyApp = () => {
    let navigate = useNavigate()
    let goBack = () => {
        navigate(-1)
    }

    //TODO if not authorized user - implement logic for the forbidden page
    // const Forbidden = () => (
    //     <Result
    //       status="403"
    //       title="403"
    //       subTitle="Sorry, you are not authorized to access this page."
    //       extra={<Button type="primary">Back Home</Button>}
    //     />
    //   );

    return (
        <AuthProvider>
            <App style={{ fontFamily: 'var(--body-font-family)' }}>
                <Header />
                <main>
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <Result
                                    style={{
                                        alignSelf: 'center',
                                        margin: '0 auto',
                                    }}
                                    status="404"
                                    title="Грешка 404, не е намерена страница."
                                    subTitle="Страницата, която търсите не съществува."
                                    extra={
                                        <button onClick={goBack} className="button-primary">
                                            Назад
                                        </button>
                                    }
                                />
                            }
                        />
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
