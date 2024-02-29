import style from "./about.module.css";

export const About = () => {
    return (
        <section id="about">
            <div className="container">
                <div className="about-content">
                    <h2>About Us</h2>
                    <p>
                        Welcome to Finance App, your ultimate solution for
                        managing your finances with ease. Whether it's topping
                        up your virtual card, adding friends, making
                        transactions, or tracking your financial history, we've
                        got you covered.
                    </p>
                    <div className={style.features}>
                        <div className={style.feature}>
                            <img
                                src="virtual-card.png"
                                alt="Virtual Card"
                                className={style.featureImg}
                            />
                            <h3>Virtual Card Top-Up</h3>
                            <p>
                                Easily top up your virtual card and use it for
                                online and in-store purchases.
                            </p>
                        </div>
                        <div className={style.feature}>
                            <img
                                src="add-friends.png"
                                alt="Add Friends"
                                className={style.featureImg}
                            />
                            <h3>Add Friends</h3>
                            <p>
                                Connect with friends and family to split bills
                                and send money instantly.
                            </p>
                        </div>
                        <div className={style.feature}>
                            <img
                                src="make-transactions.png"
                                alt="Make Transactions"
                                className={style.featureImg}
                            />
                            <h3>Make Transactions</h3>
                            <p>
                                Securely send and receive money, pay bills, and
                                manage your finances hassle-free.
                            </p>
                        </div>
                        <div className={style.feature}>
                            <img
                                src="track-history.png"
                                alt="Track History"
                                className={style.featureImg}
                            />
                            <h3>Track History</h3>
                            <p>
                                Keep track of your spending habits and financial
                                history for better money management.
                            </p>
                        </div>
                    </div>
                    <p>
                        Our platform is designed to provide a seamless and
                        secure experience, allowing you to manage your finances
                        confidently and conveniently.
                    </p>
                    <p>
                        At Finance App, we understand the importance of
                        financial well-being. That's why our team is dedicated
                        to delivering innovative solutions tailored to your
                        needs, empowering you to achieve your financial goals.
                    </p>
                </div>
            </div>
        </section>
    );
};
