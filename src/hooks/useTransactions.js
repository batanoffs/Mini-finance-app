import { useState, useEffect, useCallback, useContext } from 'react';

import { transactionService } from '../services';
import { AuthContext } from '../contexts/AuthContext';
import { getUserToken } from '../utils';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);
    const { token } = getUserToken();

    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const allTransactions = await transactionService.getAllTransactions(
                auth.objectId,
                token
            );

            if (!Array.isArray(allTransactions)) {
                throw new Error('Invalid response');
            }

            setTransactions(allTransactions);
        } catch (error) {
            setError(error.message || 'Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    }, [auth.objectId, token]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return { transactions, isLoading, error };
};
