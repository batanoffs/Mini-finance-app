/**
 * Custom hook for handling autocomplete functionality.
 *
 * @param {Object} params - Parameters for the hook.
 * @returns {Object} - An object containing handlers and render function for autocomplete.
 * @returns {Function} inputChangeHandler - Handler for input change events.
 * @returns {Function} keyboardPressHandler - Handler for keyboard press events.
 * @returns {Function} renderSuggestionsList - Function to render the suggestions list.
 */

import { useState, useEffect } from 'react'

const useAutocomplete = (suggestions, userInput, setUserInput) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [debouncedInput, setDebouncedInput] = useState('')

    const inputKeys = Object.keys(userInput)
    const lastKey = inputKeys[inputKeys.length - 1]

    useEffect(() => {
        const handler = setTimeout(() => {
            const filtered = filterSuggestions(debouncedInput, suggestions)
            setActiveSuggestion(0)
            setFilteredSuggestions(filtered)
            setShowSuggestions(true)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [debouncedInput, suggestions])

    const inputChangeHandler = (event) => {
        const input = event.target.value.toLowerCase().trim()
        setDebouncedInput(input)
        updateUserInput(event.target.name, event.target.value)
    }

    const updateUserInput = (name, value) => {
        setUserInput((state) => ({
            ...state,
            [name]: value,
        }))
    }

    const listSelectHandler = (event) => {
        if (event?.target?.innerText) {
            setActiveSuggestion(0)
            setFilteredSuggestions([])
            setShowSuggestions(false)
            updateUserInput(lastKey, event.target.innerText)
        }
    }

    const keyboardPressHandler = (event) => {
        switch (event.keyCode) {
            case 13: // Enter key
                handleEnterKey()
                break
            case 38: // Arrow Up key
                handleArrowUpKey()
                break
            case 40: // Arrow Down key
                handleArrowDownKey()
                break
            default:
                break
        }
    }

    const handleEnterKey = () => {
        setActiveSuggestion(0)
        setShowSuggestions(false)
        updateUserInput(lastKey, filteredSuggestions[activeSuggestion].name)
    }

    const handleArrowUpKey = () => {
        if (activeSuggestion > 0) setActiveSuggestion(activeSuggestion - 1)
    }

    const renderSuggestionsList = () => {
        if (!showSuggestions || !userInput?.friends || !filteredSuggestions.length) return null
        if (filteredSuggestions.length && userInput.friends) return filteredSuggestions
    }

    return {
        inputChangeHandler,
        keyboardPressHandler,
        listSelectHandler,
        filteredSuggestions: renderSuggestionsList(),
        activeSuggestion,
    }
}

const filterSuggestions = (input, suggestions) => {
    return suggestions.filter((suggestion) => suggestion.name.toLowerCase().includes(input))
}

export default useAutocomplete
