import "./home.css";
export const Home = () => {
    return (
        <div className="home" id="home">
            <div className="first-title">
                <h2>Опитай от бъдещето и бъди от най-добрите.</h2>
            </div>
            <div className="vantaGlobe"></div>
            <div className="second-title">
                <h3>
                    Отвори нов банков акаунт в{" "}
                    <label className="bi-box"> Mini Finance App</label>.
                    <button className="title-btn">Влез в системата</button>
                </h3>
            </div>
        </div>
    );
};
