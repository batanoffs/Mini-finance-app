import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // added useState
import faceIO from "@faceio/fiojs";

export const Identity = ({ currentStepsHandler }) => {
    // const navigate = useNavigate();
    // const [initFaceID, setInitFaceID] = useState(null); // added useState
    const [faceio, setFaceio] = useState(null);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const init = async () => {
    //         try {
    //             const faceId = new faceIO("fioacd5c");
    //             setInitFaceID(faceId);
    //         } catch (error) {
    //             console.log(error); // handle error
    //         }
    //     };
    //     init();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         if (!initFaceID) {
    //             console.log("Face ID not initialized"); // handle null pointer reference
    //             return;
    //         }

    //         const response = await initFaceID.enroll({
    //             locale: "auto",
    //             payload: {
    //                 email: "example@gmail.com",
    //                 pin: "12345",
    //             },
    //         });

    //         console.table(response);

    //         if (response) {
    //             alert("Аутентикацията е успешна!");
    //             navigate("/mini-finance/register/confirm");
    //         }
    //     } catch (error) {
    //         console.log(error); // handle unhandled exceptions
    //     }
    // };
    // fetchData();

    // Set up state variables for FaceIO instance and error messages

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
            console.log(
                `Unique Facial ID: ${response.facialId} Enrollment Date: ${response.timestamp} Gender: ${response.details.gender} Age Approximation: ${response.details.age}`
            );
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
                        to={"/mini-finance/register/userinfo"}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={currentStepsHandler} // corrected spelling of currentStepsHandler
                    >
                        Назад
                    </Link>
                    {!error}
                    <Link
                        to={"/mini-finance/register/terms"}
                        type="submit"
                        name="next"
                        className="button-primary"
                        onClick={currentStepsHandler} // corrected spelling of currentStepsHandler
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
//     return (
//         <div className="form-container">
//                 <div className="form-content">
//                     <footer>
//                         <Link
//                             to={"/mini-finance/register/userinfo"}
//                             type="submit"
//                             name="prev"
//                             className="button-secondary"
//                             onClick={currentStepsHandler} // corrected spelling of currentStepsHandler
//                         >
//                             Назад
//                         </Link>
//                         <Link
//                             to={"/mini-finance/register/terms"}
//                             type="submit"
//                             name="next"
//                             className="button-primary"
//                             onClick={currentStepsHandler} // corrected spelling of currentStepsHandler
//                         >
//                             Напред
//                         </Link>
//                     </footer>
//                 </div>
//         </div>
//     );
// };
