import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./Components/pages/Header/Header";
import { Login } from "./Components/pages/LoginPage/Login";
import { WelcomePage } from "./Components/pages/WelcomePage/WelcomePage";
import { Footer } from "./Components/pages/Footer/Footer";
import { Home } from "./Components/pages/HomePage/Home";
import { Register } from "./Components/pages/RegisterPage/Register";
import { Result } from "antd";

function App() {
    let navigate = useNavigate();
    let goBack = () => {
        navigate(-1);
    };
    return (
        <AuthProvider>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <Result
                                style={{
                                    alignSelf: "center",
                                    margin: "0 auto",
                                }}
                                status="404"
                                title="Грешка 404, не е намерена страница."
                                subTitle="Страницата, която търсите не съществува."
                                extra={
                                    <button
                                        onClick={goBack}
                                        className="button-primary"
                                    >
                                        Назад
                                    </button>
                                }
                            />
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register/*" element={<Register />} />
                    <Route path="/dashboard/*" element={<WelcomePage />} />
                </Routes>
            </main>
            <Footer />
        </AuthProvider>
    );
}

export default App;
