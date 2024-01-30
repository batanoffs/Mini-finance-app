import { useState } from "react";

export const  useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState();

    const setLocalStorageState = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value)); // предполага се да е селиризуем стейта 
    }
    return [state, setLocalStorageState];
}