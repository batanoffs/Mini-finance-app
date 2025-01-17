import { useCallback, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { transactionService } from '../services/transactionService';

export const useVirtualCard = () => {
    const { token, auth, setAuth } = useContext(AuthContext);
    const [card, setCard] = useState(auth.virtualCard);

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
