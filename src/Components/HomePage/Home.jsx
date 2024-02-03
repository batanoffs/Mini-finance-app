// import React, { useState, useEffect, useRef } from "react";
// import Globe from "vanta/dist/vanta.globe.min";
import pic from "../../images/svg/florid-web-wallet-and-online-banking.gif";
import "./home.css";

export const Home = () => {
    return (
        //  ref={myRef}
        <div class="background home-container">
            <div className="text-container" id="home">
                <div className="first-title-container">
                    <h2 style={{ paddingBottom: "10px" }}>Добре дошли,</h2>
                    <h4>
                        Създадохме тази платформа безплатна, за да бъде достъпна
                        за всеки един от вас.
                    </h4>
                    <div class="button-container">
                        <button className="button-secondary" style={{ backgroundColor: "transparent" }}>Learn more</button>
                        <button className="button-primary" >Get Started</button>
                    </div>
                </div>
                <div className="second-title-container">
                    <h5>
                        Отворете банков акаунт и вземете вашата виртуална карта
                        като се регистрирате.
                    </h5>
                </div>
            </div>
            <div className="image-container">
                <img src={pic} style={{ height: "60%" }} alt="gif" />
            </div>
        </div>
    );
};
