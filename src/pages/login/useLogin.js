import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { authService, dataService } from '../../services';
import { useMessage } from '../../hooks';

export const useLogin = () => {
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();
    const message = useMessage();

    const onDemoLogin = () => {
        message('info', 'Demo login not implemented yet');
    };

    const login = async (formData) => {
        // construct the auth data object
        const data = {
            login: formData.email,
            password: formData.password,
        };

        try {
            const response = await authService.login(data);

            if (response && response.message) return response;

            const token = response['user-token'];

            if (!token) throw new Error('No token found in response');

            sessionStorage.setItem('token', token);

            const userId = response['ownerId'];

            if (!userId) throw new Error('No id found in response');

            const userDataResponse = await dataService.getUserDataByAttribute('ownerId', userId, [
                // load relations
                'virtualCard',
                'friends',
                'favorite_friends',
            ]);

            if (userDataResponse === null || userDataResponse.length === 0)
                throw new Error('No user found with those credentials');

            const card = userDataResponse[0].virtualCard[0];

            if (card === null) throw new Error('card not found');

            const userData = userDataResponse[0];
            userData.virtualCard = card;
            userData.email = response.email;

            setAuth(userData);
            navigate('/dashboard/overview');
            message('success', 'Login successful');
        } catch (error) {
            console.error('Login failed', error);
            message('error', error.message || 'Login failed');
        }
    };

    return { login, onDemoLogin };
};
