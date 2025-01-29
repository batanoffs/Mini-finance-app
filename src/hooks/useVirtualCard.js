import { useCallback, useContext, useState, useEffect } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { transactionService } from '../services';
import { getUserToken } from '../utils';

export const useVirtualCard = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [card, setCard] = useState(auth.virtualCard);
    const { token } = getUserToken();

    // Fetch the card balance
    const fetchBalance = useCallback(() => {
        transactionService
            .updateBalance(auth.objectId, card.objectId, token)
            .then((response) => {
                // Check error
                if (!response.success)
                    throw new Error(response.message || 'Error during fetch card balance');

                // Update the card balance and auth context
                setCard({ ...card, balance: response.results.updateBalance.result.balance });
                setAuth({
                    ...auth,
                    virtualCard: {
                        ...card,
                        balance: response.results.updateBalance.result.balance,
                    },
                });
            })
            .catch((error) => console.error(error || 'Error during fetch card balance'));
    }, []);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return [card, auth];
};
