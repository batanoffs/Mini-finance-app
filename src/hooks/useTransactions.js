import { useState, useEffect, useCallback, useContext } from 'react';

import { transactionService } from '../services';
import { AuthContext } from '../contexts/AuthContext';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await transactionService.getByUserId(auth.objectId);

            if (response?.length === 0) throw new Error('Failed to fetch transactions');

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
