/**
 * @hook useAutocomplete
 * @description Custom hook that manages the autocomplete functionality including suggestion filtering,
 * keyboard navigation, and selection handling.
 * 
 * @param {Array} suggestions - Array of suggestion objects containing name and objectId
 * @param {Object} userInput - Current input state object containing friends and selected friend
 * @param {Function} setUserInput - Function to update the parent component's input state
 * @returns {Object} Object containing handlers and state for autocomplete functionality
 */

import { useState, useCallback, useMemo } from 'react';

const useAutocomplete = (suggestions = [], userInput, setUserInput) => {
    // Internal state for managing active suggestion index and visibility
    const [state, setState] = useState({
        activeSuggestion: 0,        
        showSuggestions: false      
    });

    // Memoized computation of filtered suggestions based on current input
    // Prevents re-filtering on every render unless dependencies change
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

    // Memoized handler for externally controlling suggestions visibility
    const setShowSuggestions = useCallback((show) => {
        setState(prev => ({ ...prev, showSuggestions: show }));
    }, []);

    // Handles input changes: updates parent state and resets suggestion navigation
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

    // Handles suggestion selection: updates parent state with selected friend
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

    // Handles keyboard navigation through suggestions list
    // Supports: Enter (select), Up/Down (navigate), Escape (close)
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
        inputChangeHandler,          // Handler for input changes
        keyboardPressHandler,        // Handler for keyboard navigation
        listSelectHandler,           // Handler for suggestion selection
        filteredSuggestions,         // Filtered array of suggestions
        activeSuggestion: state.activeSuggestion,  // Current active suggestion index
        showSuggestions: state.showSuggestions,    // Visibility state
        setShowSuggestions          // Function to control suggestions visibility
    };
};

export default useAutocomplete;
