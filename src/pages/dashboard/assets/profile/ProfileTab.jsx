import { useContext } from 'react'
import Cards from 'react-credit-cards-2'

import { ProfileCard } from '../../../../components/cards'
import { Friends } from './assets/index'
import { AuthContext } from '../../../../contexts/AuthContext'
import { ContactInfo } from '../overview/assets'

import 'react-credit-cards-2/dist/es/styles-compiled.css'
import containers from './profile-tab.module.css'

export const ProfileTab = ({ styles }) => {
    const { address, country, name, phone, virtualCard, picture, email } = useContext(AuthContext)
    const date = new Date(virtualCard.created)
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDate()
    const createdDate = `${day}, ${month}, ${year}`

    return (
        <div className={styles.contentContainer}>
            <section className={styles.bentoMainColumn}>
                <ProfileCard
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
            <section className={styles.bentoFillColumn}>
                <Friends />
            </section>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    )
}
