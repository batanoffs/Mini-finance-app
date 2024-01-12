import React, { useState, useEffect, useRef } from "react";
import Globe from "vanta/dist/vanta.globe.min";

import "./home.css";
export const Home = () => {
    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                Globe({
                    el: myRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: true,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x249fc2,
                    color2: 0xc28282,
                    backgroundColor: 0xffffff,
                    size: 0.8,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);
    return (
        <div ref={myRef}>
            <div className="home-container">
                <div className="text-container" id="home">
                    <div className="first-title-container">
                        <h2>
                            Oнлайн банкирането е вече достъпно
                            за всеки потребител.
                        </h2>
                    </div>
                    <div className="second-title-container">
                        <h3>
                            Отвори нов банков акаунт в{" "}
                            <label className="bi-box"> Mini Finance App</label>.
                            <button className="title-btn">
                                Влез в системата
                            </button>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
