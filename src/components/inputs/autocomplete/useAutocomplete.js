import { useState, useCallback, useMemo } from 'react';

const useAutocomplete = (suggestions = [], userInput, setUserInput) => {
    const [state, setState] = useState({
        activeSuggestion: 0,
        showSuggestions: false
    });

    // Memoize filtered suggestions
    const filteredSuggestions = useMemo(() => {
        const currentInput = userInput.friends || '';
        if (!suggestions?.length || !currentInput?.trim()) {
            return [];
        }

        const searchTerm = currentInput.toLowerCase();
        return suggestions.filter(suggestion => 
            suggestion?.name?.toLowerCase().includes(searchTerm)
        );
    }, [suggestions, userInput.friends]);

    const setShowSuggestions = useCallback((show) => {
        setState(prev => ({ ...prev, showSuggestions: show }));
    }, []);

    const inputChangeHandler = useCallback((event) => {
        const { value: input, name } = event.target;
        
        setUserInput(prev => ({
            ...prev,
            [name]: input,
            selectedFriendId: ''
        }));
        
        setState(prev => ({
            ...prev,
            showSuggestions: !!input.trim(),
            activeSuggestion: 0
        }));
    }, [setUserInput]);

    const listSelectHandler = useCallback((suggestion) => {
        if (!suggestion) return;
        
        setUserInput(prev => ({
            ...prev,
            friends: suggestion.name,
            selectedFriendId: suggestion.objectId,
        }));

        setState({
            activeSuggestion: 0,
            showSuggestions: false
        });
    }, [setUserInput]);

    const keyboardPressHandler = useCallback((event) => {
        if (!state.showSuggestions || !filteredSuggestions.length) return;

        switch (event.keyCode) {
            case 13: // Enter
                event.preventDefault();
                if (filteredSuggestions[state.activeSuggestion]) {
                    listSelectHandler(filteredSuggestions[state.activeSuggestion]);
                }
                break;
            case 38: // Up
                event.preventDefault();
                setState(prev => ({
                    ...prev,
                    activeSuggestion: Math.max(0, prev.activeSuggestion - 1)
                }));
                break;
            case 40: // Down
                event.preventDefault();
                setState(prev => ({
                    ...prev,
                    activeSuggestion: Math.min(
                        filteredSuggestions.length - 1,
                        prev.activeSuggestion + 1
                    )
                }));
                break;
            case 27: // Escape
                setState(prev => ({ ...prev, showSuggestions: false }));
                break;
            default:
                break;
        }
    }, [state.showSuggestions, state.activeSuggestion, filteredSuggestions, listSelectHandler]);

    return {
        inputChangeHandler,
        keyboardPressHandler,
        listSelectHandler,
        filteredSuggestions,
        activeSuggestion: state.activeSuggestion,
        showSuggestions: state.showSuggestions,
        setShowSuggestions
    };
};

export default useAutocomplete;
