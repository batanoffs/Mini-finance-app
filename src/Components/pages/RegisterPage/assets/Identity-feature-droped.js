import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; // added useState

import faceIO from "@faceio/fiojs";

export const Identity = ({ currentStepsHandler }) => {
    const [faceio, setFaceio] = useState(null);
    const [error, setError] = useState(null);

    // Use useEffect hook to initialize FaceIO instance when component mounts
    useEffect(() => {
        const initializeFaceIO = async () => {
            try {
                // Create a new instance of FaceIO with your public ID
                const faceioInstance = new faceIO("fioacd5c");
                // Update state with the instance
                setFaceio(faceioInstance);
            } catch (error) {
                // Set error state if initialization fails
                setError("Failed to initialize FaceIO: " + error.message);
            }
        };
        initializeFaceIO();
    }, []);

    // Define function to handle enrollment
    const handleEnroll = async () => {
        try {
            // Call the enroll method of the FaceIO instance with necessary options
            const response = await faceio.enroll({
                locale: "auto",
                payload: {
                    email: "example@gmail.com",
                    pin: "12345",
                },
            });
            // Log enrollment details to the console
            if (response.facialId) {
            }
        } catch (error) {
            // Set error state if enrollment fails
            setError("Enrollment failed: " + error.message);
        }
    };

    // Render the component
    return (
        <div className="form-container">
            <div className="form-content">
                <h5 style={{ textAlign: "center", marginBottom: "2em" }}>
                    Лицево разпознаване
                </h5>
                <button className="button-primary" onClick={handleEnroll}>
                    Зпочнете процеса
                </button>
                {error && <div className="error">{error}</div>}
                <footer>
                    <Link
                        to={"/register/userinfo"}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Назад
                    </Link>
                    {!error}
                    <Link
                        to={"/register/terms"}
                        type="submit"
                        name="next"
                        className="button-primary"
                        onClick={currentStepsHandler}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
