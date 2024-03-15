import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ContactInfo } from "../assets/ContactInfo";
import { ProfileDetails } from "../OverviewTab/assets/profileDetails/ProfileDetails";
import Cards from "react-credit-cards-2";
import styles from "../welcome-page-layout.module.css";
import blocks from "../custom-block.module.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Friends } from "../assets/Friends/Friends";

export const ProfileTab = () => {
    const { adress, country, name, phone, virtualcard, picture, email } = useContext(AuthContext);
    const date = new Date(virtualcard.created);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const createdDate = `${day}, ${month}, ${year}`;

    return (
        <div className={styles.contentContainer}>
            <section className={styles.bentoMainColumn}>
                <ProfileDetails adress={adress} country={country} email={email} phone={phone} name={name} picture={picture}/>

                <div className={`${blocks.customBlock} ${blocks.customBlockProfile}`}>
                    <section> 
                        <h5>Виртуална карта</h5>

                        <strong>Номер:</strong>
                        <span> {virtualcard.number}</span>
                    
                        <strong>Вид:</strong>
                        <span> {virtualcard.brand}</span>

                        <strong>Създадена на:</strong>
                        <span> {createdDate}</span>

                        <strong>Валидна до:</strong>
                        <span> {virtualcard.expiration}</span>
                    </section>
                    
                    <Cards
                        number={virtualcard.number}
                        expiry={virtualcard.expiration}
                        cvc={virtualcard.cvv}
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
    );
};
