import { useState } from 'react'

export const useSessionStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const persistStateSerialized = sessionStorage.getItem(key)
        if (persistStateSerialized) {
            const persistState = JSON.parse(persistStateSerialized)
            return persistState
        } else {
            return initialValue
        }
    })

    const setSessionStorageState = (value) => {
        if (typeof value === 'function') {
            setState((prev) => value(prev))
        } else {
            setState(value)
            sessionStorage.setItem(key, JSON.stringify(value)) // should be serialized
        }
    }

    return [state, setSessionStorageState]
}
