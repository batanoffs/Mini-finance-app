import { useState } from "react";

export const useValidate = (initialState) => {
  const [error, setErrors] = useState(initialState);

  const errorHandler = (e) => {
    const newErrors = { ...error };
    const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validateUsername = /^[a-zA-Z0-9-]{3,16}$/;
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const validatePhone = /^\0(7|8|9)\d{3}\d{4}$/;

    const errorMessage = {
      email: "Invalid email",
      firstName: "Min 2 chars",
      lastName: "Min 2 chars",
      address: "Min 5 chars",
      country: "Min 2 chars",
      town: "Min 2 chars",
      phoneNumber: "Invalid phone number",
      username: "3-16 chars, -, a-z, A-Z",
      password: "Upper, lower, digit, min 8 chars",
      confirmPassword: "Passwords don't match",
    };

    newErrors[e.target.name] =
      errorMessage[e.target.name] || newErrors[e.target.name];

    switch (e.target.name) {
      case "email":
        newErrors[e.target.name] = validateEmail.test(e.target.value)
          ? ""
          : newErrors[e.target.name];
        break;
      case "firstName":
      case "lastName":
        newErrors[e.target.name] = e.target.value.length >= 2
          ? ""
          : newErrors[e.target.name];
        break;
      case "address":
      case "country":
      case "town":
        newErrors[e.target.name] = e.target.value.length >= 5
          ? ""
          : newErrors[e.target.name];
        break;
      case "phoneNumber":
        newErrors[e.target.name] = validatePhone.test(e.target.value)
          ? ""
          : newErrors[e.target.name];
        break;
      case "username":
        newErrors[e.target.name] = validateUsername.test(e.target.value)
          ? ""
          : newErrors[e.target.name];
        break;
      case "password":
        newErrors[e.target.name] = validatePassword.test(e.target.value)
          ? ""
          : newErrors[e.target.name];
        break;
      case "confirmPassword":
        newErrors[e.target.name] =
          e.target.value === e.target.form["password"].value
            ? ""
            : newErrors[e.target.name];
        break;
      default:
        break;
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");

    return hasErrors;
  };



  const clearErrorHandler = (e) => {
    setErrors((error) => ({ ...error, [e.target.name]: "" }));
  };

  return {
    error,
    errorHandler,
    clearErrorHandler,
  };
};

// import { useState } from "react";

// export const useValidate = (initialState) => {
//     const [error, setError] = useState(initialState);

//     const errorHandler = (e) => {
//         setError((state) => {
//             const newState = { ...state };
//             if (!e.target.value) {
//                 newState[e.target.name] = "полето е задължително";
//             }
//             return newState;
//         });
//     };

//     const clearErrorHandler = (e) => {
//         setError((state) => ({ ...state, [e.target.name]: "" }));
//     };

//     // const resetFormHandler = (e) => {
//     //     if (e) {
//     //         setValues((state) => ({
//     //             ...state,
//     //             [e.target.name]: e.target.value,
//     //         }));
//     //     }
//     //     setValues({
//     //         email: "",
//     //         password: "",
//     //         confirmPassword: "",
//     //     });
//     // };

//     return {
//         error,
//         errorHandler,
//         clearErrorHandler,
//     };
// };