import { useEffect, useRef } from 'react';
import { Login } from '../index';
import { RainbowButton, SecondaryButton } from './assets';
import { Preview } from './assets';
import { title, subTitle } from './constants';

import styles from './home.module.css';

export const Home = () => {
    const heroContentRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (heroContentRef.current) {
            observer.observe(heroContentRef.current);
        }

        return () => {
            if (heroContentRef.current) {
                observer.unobserve(heroContentRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.backgroundWrapper}>
            <div className={styles.heroContainer}>
                <section className={styles.heroSection}>
                    <div ref={heroContentRef} className={styles.heroContent}>
                        <h1>{title}</h1>
                        <h5>{subTitle}</h5>
                    </div>
                    <Preview />
                </section>
                <aside className={styles.actions}>
                    <div>
                        <RainbowButton to="/register" text="Get your card" />
                        <SecondaryButton to="/about" text="Find out more" />
                    </div>
                    <div className={styles.divider}>
                        <h6> OR </h6>
                    </div>
                    <Login className={styles.login} />
                </aside>
            </div>
        </div>
    );
};
