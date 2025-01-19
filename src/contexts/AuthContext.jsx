import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearUserData, getUserToken } from '../utils';
import { INITIAL_AUTH } from '../constants';
import { useSessionStorage } from '../hooks';
import { authService } from '../services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, INITIAL_AUTH);
    const navigate = useNavigate();

    const onLogoutHandler = async () => {
        try {
            const { token } = getUserToken();

            await authService.logout(token);

            clearUserData();
            setAuth({});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const authDataContext = {
        onLogoutHandler,
        setAuth,
        auth,
    };

    return <AuthContext.Provider value={{ ...authDataContext }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};
