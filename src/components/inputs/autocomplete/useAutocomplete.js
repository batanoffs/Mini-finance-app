import { useState, useEffect } from 'react';

const useAutocomplete = (suggestions, userInput, setUserInput) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filterSuggestions = (input, suggestionsList) => {
        if (!suggestionsList?.length) return [];
        
        // Only filter if there's input, otherwise return empty array
        if (!input?.trim()) return [];
        
        const searchTerm = input.toLowerCase();
        return suggestionsList.filter(suggestion => 
            suggestion?.name?.toLowerCase().includes(searchTerm)
        );
    };

    useEffect(() => {
        if (!suggestions?.length) {
            setFilteredSuggestions([]);
            return;
        }

        const currentInput = userInput.friends || '';
        const filtered = filterSuggestions(currentInput, suggestions);
        
        setFilteredSuggestions(filtered);
        setActiveSuggestion(0);
    }, [userInput.friends, suggestions]);

    const inputChangeHandler = (event) => {
        const input = event.target.value;
        const name = event.target.name;
        
        setUserInput(prev => ({
            ...prev,
            [name]: input,
            selectedFriendId: '',
        }));
        
        setShowSuggestions(true);
    };

    const listSelectHandler = (suggestion) => {
        if (!suggestion) return;

        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        
        setUserInput(prev => ({
            ...prev,
            friends: suggestion.name,
            selectedFriendId: suggestion.objectId,
        }));
    };

    const keyboardPressHandler = (event) => {
        if (!showSuggestions || !filteredSuggestions.length) return;

        switch (event.keyCode) {
            case 13: // Enter key
                event.preventDefault(); // Prevent form submission
                if (filteredSuggestions[activeSuggestion]) {
                    listSelectHandler(filteredSuggestions[activeSuggestion]);
                }
                break;
            case 38: // Arrow Up key
                event.preventDefault(); // Prevent cursor movement
                if (activeSuggestion > 0) {
                    setActiveSuggestion(activeSuggestion - 1);
                }
                break;
            case 40: // Arrow Down key
                event.preventDefault(); // Prevent cursor movement
                if (activeSuggestion < filteredSuggestions.length - 1) {
                    setActiveSuggestion(activeSuggestion + 1);
                }
                break;
            case 27: // Escape key
                setShowSuggestions(false);
                break;
            default:
                break;
        }
    };

    return {
        inputChangeHandler,
        keyboardPressHandler,
        listSelectHandler,
        filteredSuggestions,
        activeSuggestion,
        showSuggestions,
        setShowSuggestions,
    };
};

export default useAutocomplete;
