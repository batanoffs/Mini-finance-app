import { EmptyCard } from '../../../../../../components/cards'

import styles from './contact-info.module.css'

export const ContactInfo = () => {
    return (
        <EmptyCard title="Need help?" color="primary" className={styles.customBlockContact}>
            <h6>Please submit a request</h6>

            <p style={{ marginTop: '1em' }}>
                <strong>Get in touch:</strong>
                <a href="tel: 305-240-9671">(60) 305-240-9671</a>
            </p>
        </EmptyCard>
    )
}
