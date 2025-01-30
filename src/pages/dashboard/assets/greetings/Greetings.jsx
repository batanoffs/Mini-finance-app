import { useAuthContext } from '../../../../contexts/AuthContext';

import { EmptyCard } from '../../../../components/cards';

export const Greetings = () => {
    const { auth } = useAuthContext();
    
    const firstName = auth?.fullName?.split(' ')[0] || "User";

    return <EmptyCard title={`Welcome back, ${firstName}!`} color="primary" />;
};
