import { useState } from 'react';
import { useMessage } from '../../../../../../hooks';
import { transactionService } from '../../../../../../services';
import { getUserToken } from '../../../../../../utils';

export const useQuickSend = (setShowModal) => {
    const [amount, setAmount] = useState('');
    const showMessage = useMessage();
    const token = getUserToken();
    
    const onChange = (e) => {
        const value = e.target.value;
        if (!value) return;
        setAmount(value);
    };

    const onSubmit = async (userId, userFullName, receiverId) => {
        try {
            // Validate input
            if (!receiverId) throw new Error('Receiver data not found');
            if (!userId || !userFullName) throw new Error('Unauthorized');
            if (!amount) throw new Error('Please fill amount');
            if (isNaN(amount) || amount <= 0) throw new Error('Please enter a valid amount');

            const response = await transactionService.send(
                userFullName,
                receiverId,
                amount,
                userId,
                token
            );

            if (!response.success) throw new Error(response.error.message);

            // Only close modal and reset form on success
            setAmount('');
            setShowModal(false);
            showMessage('success', `Successfully send the money`);
        } catch (error) {
            console.error(error);
            showMessage('error', `Error during sending: ${error.message || 'Unknown error'}`);
        }
    };

    return {
        onChange,
        onSubmit,
        amount,
    };
};
