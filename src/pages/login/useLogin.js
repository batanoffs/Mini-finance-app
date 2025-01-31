import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { authService } from '../../services';
import { useMessage } from '../../hooks';

export const useLogin = () => {
    const { setAuth } = useAuthContext();
    const navigate = useNavigate();
    const message = useMessage();

    const onLogin = async (formData) => {
        try {
            // validate the form data
            if (!formData.email || !formData.password) throw new Error('Please fill in all fields');

            // construct the auth data object
            const data = {
                login: formData.email,
                password: formData.password,
            };

            // call the login service
            const response = await authService.login(data);

            // get the user token
            const token = response['user-token'];

            // get the owner id
            const ownerId = response.ownerId;

            // validate the response
            if (response && !ownerId && !token) throw new Error(response);

            // get the user data
            const userDataResponse = await authService.getAuthUserData(ownerId);

            // check if the user data is empty
            if (userDataResponse === null || userDataResponse.length === 0)
                throw new Error('No user found with those credentials');

            const card = userDataResponse[0].virtualCard;

            if (!card) {
                throw new Error(
                    'Virtual card not found. Please contact support to resolve this issue.'
                );
            }

            // Validate required card properties
            if (
                !card.number ||
                !card.expiration ||
                !card.cvv ||
                !card.brand ||
                typeof card.balance !== 'number' ||
                !card.issuer
            ) {
                throw new Error('Invalid card data structure detected. Please contact support.');
            }

            // set the user data
            const userData = userDataResponse[0];
            userData.virtualCard = card;
            userData.email = response.email;

            // store the token in the session storage
            sessionStorage.setItem('token', token);

            // set the auth context
            setAuth(userData);

            // show success message
            message('success', 'Login successful');

            // navigate to the dashboard
            navigate('/dashboard/overview');
        } catch (error) {
            // log the error and the UI message
            console.error('Login failed', error);
            message('error', error.message || 'Login failed');
        }
    };

    return { onLogin };
};
