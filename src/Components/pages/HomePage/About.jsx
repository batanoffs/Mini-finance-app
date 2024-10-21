import { Link } from 'react-router-dom'

import style from './about.module.css'

export const About = () => {
    return (
        <section className={style.about}>
            <div className={style.container}>
                <div className={style.aboutContent}>
                    <h2>About the App</h2>
                    <p>
                        Welcome to Mini Finance Innovations, your go-to solution for managing your
                        finances with ease. Whether you need to top up your virtual card, add friends,
                        make transactions, or track your financial history, we've got you covered.
                    </p>
                    <div className={style.features}>
                        <div className={style.feature}>
                            <img
                                src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/sf6hdgxcph0mjc0ovqww.png"
                                alt="Virtual Card"
                                className={style.featureImg}
                            />
                            <h5>Top Up Your Virtual Card</h5>
                            <p>
                                Easily top up your virtual card and use it for online and offline
                                purchases.
                            </p>
                        </div>
                        <div className={style.feature}>
                            <img
                                src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/lxwrha0dkp2zkgctrtri.png"
                                alt="Add Friends"
                                className={style.featureImg}
                            />
                            <h5>Add Friends</h5>
                            <p>
                                Connect with friends and family to share accounts and send money
                                instantly.
                            </p>
                        </div>
                        <div className={style.feature}>
                            <img
                                src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/thchf4tdrkuqmjula8nv.png"
                                alt="Make Transactions"
                                className={style.featureImg}
                            />
                            <h5>Make Transactions</h5>
                            <p>
                                Send and receive money securely, pay bills, and manage your finances
                                hassle-free.
                            </p>
                        </div>
                        <div className={style.feature}>
                            <img
                                src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729500566/w6du8mo8c2p9jswc8b62.png"
                                alt="Track History"
                                className={style.featureImg}
                            />
                            <h5>Track Your History</h5>
                            <p>
                                Keep a record of your financial habits and history for better
                                management of your money.
                            </p>
                        </div>
                    </div>
                    <p>
                        Our platform is designed to provide a seamless and secure experience, allowing
                        you to manage your finances with confidence and convenience.
                    </p>
                    <p>
                        At Mini Finance Innovations, we understand the importance of financial well-being.
                        That's why our team is dedicated to providing innovative solutions tailored to
                        your needs, to help you achieve your financial goals.
                    </p>
                    <Link
                        to="/"
                        style={{ fontFamily: 'Montserrat', color: 'white', margin: '2em auto' }}
                        className="button-primary"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    )
}

