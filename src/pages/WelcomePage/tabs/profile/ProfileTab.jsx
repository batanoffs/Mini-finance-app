import Cards from 'react-credit-cards-2'
import { useContext } from 'react'

import { ProfileDetails, ContactInfo } from '../../assets/index'
import { Friends } from './assets/index'
import { AuthContext } from '../../../../contexts/AuthContext'

import 'react-credit-cards-2/dist/es/styles-compiled.css'
import layout from '../../welcome-layout.module.css'
import containers from '../../assets/containers.module.css'

export const ProfileTab = () => {
    const { address, country, name, phone, virtualCard, picture, email } = useContext(AuthContext)
    const date = new Date(virtualCard.created)
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDate()
    const createdDate = `${day}, ${month}, ${year}`

    return (
        <div className={layout.contentContainer}>
            <section className={layout.bentoMainColumn}>
                <ProfileDetails
                    address={address}
                    country={country}
                    email={email}
                    phone={phone}
                    name={name}
                    picture={picture}
                />

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
                        name={name}
                    />
                </div>
            </section>
            <section className={layout.bentoFillColumn}>
                <Friends />
            </section>

            <aside className={layout.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    )
}
