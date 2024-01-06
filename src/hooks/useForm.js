import { useState } from "react";

export const useForm = (initialState, onLogin, onRegister) => {
    const [values, setValues] = useState(initialState);
        
    const changeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };    

    const resetFormHandler = (e) => {
        if(e) {            
            setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
        }
        setValues({
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        onLogin(values); 
        resetFormHandler();       
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        onRegister(values);
        resetFormHandler();  
    }

    return {
        values,
        changeHandler,
        onSubmitLogin,
        resetFormHandler,
        onSubmitRegister
    };
};
