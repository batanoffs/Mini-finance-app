import "./footer.css";
export const Footer = () => {
    return (
        <footer className="site-footer">
                    <div className="footer-container">
                        <p className="copyright-text">
                            Всички права запазени © Mini Finance Innovations 2030. Дизайн от - {" "}
                            <a
                                href="https://github.com/batanoffs"
                            >
                                batanoffs github.
                            </a>{" "}
                            Illustration by{" "}
                            <a href="https://icons8.com/illustrations/author/627444">
                                Julia G
                            </a>{" "}
                            from{" "}
                            <a href="https://icons8.com/illustrations">Ouch!</a>
                        </p>
                    </div>
        </footer>
    );
};
