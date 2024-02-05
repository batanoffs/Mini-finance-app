import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./Components/Header/Header";
import { Login } from "./Components/LoginPage/Login";
import { WelcomePage } from "./Components/WelcomePage/WelcomePage";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Components/HomePage/Home";
import { Register } from "./Components/RegisterPage/Register";
import { Result } from "antd";

function App() {
    return (
        <AuthProvider>
            <Header />
            <main>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <Result
                                style={{ alignSelf: "center", margin: "0 auto" }}
                                status="404"
                                title="Грешка 404, не е намерена страница."
                                subTitle="Страницата, която търсите не съществува."
                                extra={
                                    <Link
                                        to="/"
                                        className="button-primary">
                                        Начална страница
                                    </Link>
                                    }
                            />
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/register/*"
                        element={<Register />}
                    />
                    <Route
                        path="/dashboard/*"
                        element={<WelcomePage />}
                    />
                </Routes>
            </main>
            <Footer />
        </AuthProvider>
    );
}

export default App;
