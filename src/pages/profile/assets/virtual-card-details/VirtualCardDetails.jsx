import { useContext } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { AuthContext } from '../../../../contexts/AuthContext';
import containers from './VirtualCardDetails.module.css';

export const VirtualCardDetails = () => {
    const { auth } = useContext(AuthContext);
    const { address, country, fullName, phoneNumber, virtualCard, avatar, email } = auth;

    const date = new Date(virtualCard.created);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const createdDate = `${day}, ${month}, ${year}`;

    return (
        <div className={`${containers.customBlock} ${containers.customBlockProfile}`}>
            <section>
                <h5>Virtual Card</h5>

                <strong>Number:</strong>
                <span> {virtualCard.number}</span>

                <strong>Type:</strong>
                <span> {virtualCard.brand}</span>

                <strong>Created on:</strong>
                <span> {createdDate}</span>

                <strong>Valid until:</strong>
                <span> {virtualCard.expiration}</span>
            </section>
            <Cards
                number={virtualCard.number}
                expiry={virtualCard.expiration}
                cvc={virtualCard.cvv}
                name={fullName}
            />
        </div>
    );
};
