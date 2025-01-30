import { useState, useEffect, useCallback } from 'react';

import { transactionService } from '../services';
import { useAuthContext } from '../contexts/AuthContext';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useAuthContext();

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await transactionService.getByUserId(auth.objectId);

            setTransactions(response);
        } catch (error) {
            console.error(error);
            setError(error.message || 'Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    }, [auth.objectId]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    return {
        transactions,
        setTransactions,
        isLoading,
        error,
    };
};
