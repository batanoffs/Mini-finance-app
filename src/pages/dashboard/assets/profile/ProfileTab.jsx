
import { ProfileCard } from '../../../../components/cards'
import { Friends } from './assets/index'
import { ContactInfo } from '../overview/assets'

import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { VirtualCardDetails } from './assets/VirtualCardDetails'

export const ProfileTab = ({ styles }) => {
    return (
        <div className={styles.contentContainer}>
            <section className={styles.bentoMainColumn}>
                <ProfileCard />
                <VirtualCardDetails />
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
