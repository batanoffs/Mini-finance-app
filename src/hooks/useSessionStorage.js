import { useState } from "react";

export const useSessionStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const presistStateSerialized = sessionStorage.getItem(key);
        if (presistStateSerialized) {
            const presistState = JSON.parse(presistStateSerialized);
            return presistState;
        } else {
            return initialValue;
        }
    });

    const setSessionStorageState = (value) => {
        setState(value);

        sessionStorage.setItem(key, JSON.stringify(value)); // предполага се да е селиризуем стейта
    };

    return [
        state,
        setSessionStorageState,
    ];
};
