import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { useAuthContext } from '../../../../contexts/AuthContext';

import styles from './VirtualCardDetails.module.css';

export const VirtualCardDetails = () => {
    const { auth } = useAuthContext();

    const { fullName, virtualCard } = auth;

    return (
        <div className={`${styles.customBlock} ${styles.customBlockProfile}`}>
            <Cards
                number={virtualCard.number}
                expiry={virtualCard.expiration}
                cvc={virtualCard.cvv}
                name={fullName}
            />
        </div>
    );
};
