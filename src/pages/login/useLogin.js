import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { dataService } from '../../services/userDataService';
import { useMessage } from '../../hooks/useMessage';

export const useLogin = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const message = useMessage();

    const login = async (formData) => {
        // construct the data object
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

            const ownerId = response['ownerId'];

            if (!ownerId) throw new Error('No ownerId found in response');

            const userDataResponse = await dataService.getUserData(ownerId);

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
            console.error('Errors found during login', error);
        }
    };

    return { login };
};
