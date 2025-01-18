import { useCallback, useContext, useState, useEffect } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { transactionService } from '../services';
import { getUserToken } from '../utils';

export const useVirtualCard = () => {
    const [card, setCard] = useState(auth.virtualCard);
    const { auth, setAuth } = useContext(AuthContext);
    const { token } = getUserToken();

    const fetchBalance = useCallback(() => {
        transactionService
            .updateBalance(auth.objectId, card.objectId, token)
            .then((data) => {
                setCard({ ...card, balance: data.results.updateMoney.result.balance });
                setAuth({
                    ...auth,
                    virtualCard: { ...card, balance: data.results.updateMoney.result.balance },
                });
            })
            .catch((err) => console.log('Error during fetch card balance', err.message));
    }, []);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return [card, auth];
};
