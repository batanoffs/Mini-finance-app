import preview from "../../images/website-dashboard.png";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        //  ref={myRef}
        <div className="home-container">
            <div className="text-container">
                <div className="title-container">
                    {/* <h2 style={{ paddingBottom: "10px" }}>Добре дошли,</h2> */}
                    <h1>Отворете банков акаунт и вземете вашата карта</h1>
                    <p>
                        Създадохме тази платформа безплатна, за да бъде достъпна
                        за всеки един от вас.
                    </p>
                </div>
                <div className="button-container">
                    <Link
                        to="/about"
                        className="button-secondary"
                        style={{ backgroundColor: "transparent" }}
                    >
                        Научи повече
                    </Link>
                    <Link to="/register" className="button-primary">
                        Вземи своята карта
                    </Link>
                </div>
            </div>
            <div className="image-container">
                <svg
                    viewBox="0 -23.52 109.908 109.908"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                >
                    <defs>
                        <pattern
                            id="imagePattern"
                            patternUnits="userSpaceOnUse"
                            width="120"
                            height="100"
                        >
                            <image
                                href={preview}
                                x="0"
                                y="0"
                                width="91.5"
                                height="53.184"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </pattern>
                    </defs>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <g
                            id="laptop_macbook_pro"
                            data-name="laptop macbook pro"
                            transform="translate(-649.324 -1577.937)"
                        >
                            <rect
                                id="Rectangle_2"
                                data-name="Rectangle 2"
                                width="91.5"
                                height="53.184"
                                transform="translate(658.5 1581.085)"
                                fill="url(#imagePattern)"
                            ></rect>
                            <path
                                id="Path_7"
                                data-name="Path 7"
                                d="M749.076,1577.937h-90.6a2.252,2.252,0,0,0-2.24,2.244v56.543h96.076v-56.543a2.252,2.252,0,0,0-2.24-2.244zm.186,56.332h-90.8v-53.184h91.5v53.184Z"
                                fill="#163844"
                            ></path>
                            <g id="Group_2" data-name="Group 2">
                                <path
                                    id="Path_8"
                                    data-name="Path 8"
                                    d="M759.232,1639.962a.84.84,0,0,1-.845.84H650.162a.837.837,0,0,1-.838-.84v-2.4a.837.837,0,0,1,.838-.836H758.387a.84.84,0,0,1,.845.836Z"
                                    fill="#e4e7e7"
                                ></path>
                            </g>
                            <path
                                id="Path_9"
                                data-name="Path 9"
                                d="M704.825,1579.505a.548.548,0,1,1-.548-.553A.549.549,0,0,1,704.825,1579.505Z"
                                fill="#fbfbfb"
                            ></path>
                            <path
                                id="Path_10"
                                data-name="Path 10"
                                d="M695.832,1636.724v.652a.841.841,0,0,0,.84.836h15.21a.843.843,0,0,0,.838-.836v-.652Z"
                                fill="#c9d1d1"
                            ></path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};
