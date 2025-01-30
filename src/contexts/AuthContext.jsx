import { useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearUserData, getUserToken } from '../utils';
import { INITIAL_AUTH_STATE } from './constants';
import { useMessage, useSessionStorage } from '../hooks';
import { authService } from '../services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, INITIAL_AUTH_STATE);
    const navigate = useNavigate();
    const message = useMessage();

    const onLogoutHandler = async () => {
        try {
            const { token } = getUserToken();
            if (!token) throw new Error('User not authenticated!');

            const response = await authService.logout(token);

            if (response !== undefined) throw new Error(response.message);

            clearUserData();
            setAuth({});
            navigate('/');
        } catch (error) {
            console.log('Logout failed: ', error);
            message('error', error.message || 'Logout failed. Please refresh the page.');
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
