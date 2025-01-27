import { useNavigate } from 'react-router-dom';

import { useMessage } from '../../hooks/useMessage';
import { authService, cardService, dataService } from '../../services';

export const useRegister = () => {
    const navigate = useNavigate();
    const showMessage = useMessage();

    const onRegister = async (formData) => {
        try {
            if (
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword ||
                !formData.firstName ||
                !formData.lastName ||
                !formData.gender ||
                !formData.country ||
                !formData.phoneNumber ||
                !formData.address ||
                !formData.town
            ) {
                throw new Error('Null or empty value in formData');
            }

            if (formData.password !== formData.confirmPassword)
                throw new Error('Passwords do not match');

            const registerData = {
                email: formData.email,
                password: formData.password,
            };

            const registerResponse = await authService.register(registerData);

            const cardIdResponse = await cardService.assignNewCardId();
            if (cardIdResponse && cardIdResponse.message) {
                showMessage('error', cardIdResponse.message);
                return;
            }
            const setUserDataResponse = await dataService.setUserData({
                address: formData.address,
                cardId: formData.cardId,
                country: formData.country,
                gender: formData.gender,
                fullName: formData.firstName + ' ' + formData.lastName,
                phoneNumber: formData.phoneNumber,
                town: formData.town,
                ownerId: registerResponse['ownerId'],
            });
            const getCardResponse = await cardService.generateCard(cardIdResponse);

            await cardService.setVirtualCardRelation(setUserDataResponse.objectId, [
                getCardResponse.objectId,
            ]);

            navigate('/login');
            showMessage('success', 'Successful registration');
        } catch (error) {
            console.log(error.message || error);
            showMessage('error', 'Unsuccessful registration');
        }
    };

    return { onRegister };
};
