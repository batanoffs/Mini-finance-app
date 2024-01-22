import { useEffect } from "react";
import { Link } from "react-router-dom";
import faceIO from "@faceio/fiojs";

export const Identity = ({changeHandler, identity, currentStepsHendler}) => {
    let faceio;
    useEffect(() => {
        faceio = new faceIO("fioacd5c");
    }, []);

    const handleSignIn = async (e) => {
        try {
          let response = await faceio.enroll({
            locale: "auto",
            payload: {
              email: "example@gmail.com",
              pin: "12345",
            },
          });
    
          console.log(` Unique Facial ID: ${response.facialId}
          Enrollment Date: ${response.timestamp}
          Gender: ${response.details.gender}
          Age Approximation: ${response.details.age}`);
          identity = response;
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className="form-container">
            <div className="form-content">
                <button className="button-primary" onClick={handleSignIn}>
                    Проверка на идентичност
                </button>
                <footer>
                    <Link
                        to={"/register/creditcard"}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={currentStepsHendler}
                    >
                        Назад
                    </Link>
                    <Link
                        to={"/register/terms"}
                        type="submit"
                        name="next"
                        className="button-primary"
                        onClick={currentStepsHendler}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
