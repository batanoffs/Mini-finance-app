import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

import { EmptyCard } from '../../../../components/cards';

export const Greetings = () => {
    const { auth } = useContext(AuthContext);
    
    const firstName = auth?.fullName?.split(' ')[0] || "User";

    return <EmptyCard title={`Welcome back, ${firstName}!`} color="primary" />;
};
