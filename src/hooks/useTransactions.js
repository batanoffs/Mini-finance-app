import { useState, useEffect, useCallback, useContext } from 'react';

import { notificationService, transactionService } from '../services';
import { AuthContext } from '../contexts/AuthContext';
import { getUserToken } from '../utils';

export const useTransactions = (transactionType = 'nonVerified') => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);
    const { token } = getUserToken();

    const fetchTransactions = useCallback(
        async (type) => {
            setIsLoading(true);
            setError(null);

            try {
                let transactions = [];

                switch (type) {
                    case 'verified':
                        transactions = await transactionService.getAllTransactions(
                            auth.objectId,
                            token
                        );

                        if (!Array.isArray(transactions)) {
                            throw new Error('Invalid response');
                        }
                        break;
                    case 'nonVerified':
                        const [verifiedTxs, pendingTxs] = await Promise.all([
                            transactionService.getAllTransactions(auth.objectId, token),
                            notificationService.getMoneyRequestNotifications(auth.objectId, token),
                        ]);
                        transactions = [...verifiedTxs, ...pendingTxs];

                        if (!Array.isArray(transactions)) {
                            throw new Error('Invalid response');
                        }

                        break;
                    default:
                        const [allVerified, allPending] = await Promise.all([
                            transactionService.getAllTransactions(auth.objectId, token),
                            notificationService.getMoneyRequestNotifications(auth.objectId, token),
                        ]);
                        transactions = [...allVerified, ...allPending];
                }

                setTransactions(transactions);
            } catch (error) {
                setError(error.message || 'Failed to fetch transactions');
            } finally {
                setIsLoading(false);
            }
        },
        [auth.objectId, token]
    );

    useEffect(() => {
        fetchTransactions(transactionType);
    }, [fetchTransactions]);

    return {
        transactions,
        setTransactions,
        isLoading,
        error,
    };
};
