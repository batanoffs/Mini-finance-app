import { ContactInfo } from '../assets/ContactInfo'

import styles from '../welcome-page-layout.module.css'
import blocks from '../custom-block.module.css'

export const HelpCenterTab = () => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <div className={blocks.customBlock}>
                    <form action="#" method="post">
                        <header>
                            <h5>How can we help you?</h5>
                        </header>
                        <label htmlFor="search">Search by topic: </label>
                        <input
                            className="form-control"
                            name="search"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <footer>
                            <input type="submit" value="Send" className="button-primary" />
                        </footer>
                    </form>
                </div>

                <div className={blocks.customBlock}>
                    <h5>Frequently Asked Questions</h5>

                    <strong>How do I create a new card?</strong>

                    <p>To create a new card, click on the "Create a card" button.</p>

                    <strong>Where can I change my profile picture?</strong>

                    <p>
                        To change your profile picture, navigate to Settings - Profile and click on
                        the "Choose a picture" button.
                    </p>

                    <strong>How do I change my password?</strong>

                    <p>
                        To change your password, navigate to Settings - Password and click on the
                        "Save changes" button after entering your new password.
                    </p>
                </div>
            </main>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    )
}
