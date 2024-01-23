// import React, { useState, useEffect, useRef } from "react";
// import Globe from "vanta/dist/vanta.globe.min";
import pic from "../../images/svg/florid-web-wallet-and-online-banking.gif";
import logo from "../../images/logo/logoa.svg";
import "./home.css";
export const Home = () => {
    // const [vantaEffect, setVantaEffect] = useState(null);
    // const myRef = useRef(null);
    // useEffect(() => {
    //     if (!vantaEffect) {
    //         setVantaEffect(
    //             Globe({
    //                 el: myRef.current,
    //                 mouseControls: true,
    //                 touchControls: true,
    //                 gyroControls: true,
    //                 minHeight: 200.0,
    //                 minWidth: 200.0,
    //                 scale: 1.0,
    //                 scaleMobile: 1.0,
    //                 color: 0x109fc2,
    //                 // color: 0x44CFCB,
    //                 color2: 0xc29282,
    //                 backgroundColor: 0xffffff,
    //                 size: 0.5,
    //             })
    //         );
    //     }
    //     return () => {
    //         if (vantaEffect) vantaEffect.destroy();
    //     };
    // }, [vantaEffect]);
    return (
        //  ref={myRef}
        <div className="home-container">
            <div className="text-container" id="home">
                <div className="first-title-container">
                    <h2 style={{paddingBottom: "10px"}}>Добре дошли,</h2>
                    <h4>
                        Създадохме тази платформа безплатна, за да бъде достъпна
                        за всеки един от вас.
                    </h4>
                </div>
                <div className="second-title-container">
                    <h5>
                        Отворете банков акаунт и вземете вашата виртуална карта
                        като се регистрирате.
                        {/* <img
                            className="logo"
                            src={logo}
                            style={{ 
                                width: "250px",
                                position: "relative",
                                top: "34px",
                            }}
                            alt="logo"
                        ></img> */}
                    </h5>
                </div>
            </div>
            <div className="image-container">
                <img src={pic} style={{ height: "60%" }} alt="gif" />
            </div>
        </div>
    );
};
