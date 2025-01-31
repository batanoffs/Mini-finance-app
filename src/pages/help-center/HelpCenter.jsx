import { ContactInfo } from '../assets';
import { FormInput } from '../../components/inputs';
import { BentoGrid } from '../../layout';

import styles from './help-center.module.css';
import { useMessage } from '../../hooks';

export const HelpCenter = () => {
    const message = useMessage();
    
    const onSearchHandler = (e) => {
        e.preventDefault();
        message('info', 'Search not implemented yet!');
    };

    return (
        <>
            <BentoGrid.Fill>
                <div className={styles.customBlock}>
                    <form onSubmit={onSearchHandler}>
                        <header style={{ marginBottom: `0.5em` }}>
                            <h5>How can we help you?</h5>
                        </header>
                        <div className={styles.searchForm}>
                            <FormInput
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Type your question here"
                                sx={{ flex: '2' }}
                                aria-label="Search"
                            />

                            <FormInput
                                type="submit"
                                value="Search"
                                style={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                }}
                                sx={{ flex: '1' }}
                            />
                        </div>
                    </form>
                </div>

                <div className={styles.customBlock}>
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
            </BentoGrid.Fill>

            <BentoGrid.Aside>
                <ContactInfo />
            </BentoGrid.Aside>
        </>
    );
};
