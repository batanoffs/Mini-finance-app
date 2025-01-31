/**
 * @component Autocomplete
 * @description A reusable autocomplete input component that provides suggestion filtering and keyboard navigation.
 * Designed to work with any array of suggestions and manages its own state for user interactions.
 */

import { useState, useCallback, memo } from 'react';

import { SuggestionItem } from './suggestion-item/SuggestionItem';
import { FormInput } from '../form-input/FormInput';
import useAutocomplete from './useAutocomplete';

import styles from './autocomplete.module.css';

export const Autocomplete = memo(
    ({
        userInput = { friends: '' },
        setUserInput,
        suggestions = [],
        className = '',
        placeholder = 'John Doe',
        onChange,
        name = 'friends',
        customLabel = null,
        ...rest
    }) => {
        // Tracks if the input is currently focused
        const [isFocused, setIsFocused] = useState(false);

        // Custom hook that manages suggestion filtering and keyboard navigation
        const {
            inputChangeHandler,
            keyboardPressHandler,
            listSelectHandler,
            setShowSuggestions,
            filteredSuggestions,
            activeSuggestion,
            showSuggestions,
        } = useAutocomplete(suggestions, userInput, setUserInput);

        // Memoized change handler that combines custom hook logic with optional onChange prop
        const handleChange = useCallback(
            (e) => {
                inputChangeHandler(e);
                onChange?.(e);
            },
            [inputChangeHandler, onChange]
        );

        // Memoized blur handler with delay to allow click events to complete
        const handleBlur = useCallback(() => {

            // Delay blur event to allow click events to complete
            setTimeout(() => {
                setIsFocused(false);

                // Hide suggestions if input is empty
                !userInput[name]?.trim() && setShowSuggestions(false);

            }, 200);
        }, [name, userInput, setShowSuggestions]);

        // Memoized focus handler that shows suggestions if input has value
        const handleFocus = useCallback(() => {
            setIsFocused(true);
            userInput[name]?.trim() && setShowSuggestions(true);
        }, [name, userInput, setShowSuggestions]);

        // Memoized click handler for suggestion list items
        const handleListItemClick = useCallback(
            (suggestion) => {
                listSelectHandler(suggestion);
                setIsFocused(false);
            },
            [listSelectHandler]
        );

        // Computed value to determine if suggestion list should be visible
        const shouldShowSuggestions =
            isFocused && showSuggestions && filteredSuggestions.length > 0;

        return (
            <div className={styles.autocomplete}>
                <FormInput
                    name={name}
                    placeholder={customLabel || placeholder}
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    onKeyDown={keyboardPressHandler}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={userInput[name] || ''}
                    className={className}
                    {...rest}
                />
                <ul className={`${styles.suggestions} ${shouldShowSuggestions ? styles.show : ''}`}>
                    {shouldShowSuggestions &&
                        filteredSuggestions.map((suggestion, index) => (
                            <SuggestionItem
                                key={suggestion.objectId || index}
                                suggestion={suggestion}
                                isActive={index === activeSuggestion}
                                onClick={() => handleListItemClick(suggestion)}
                            />
                        ))}
                </ul>
            </div>
        );
    },
    (prevProps, nextProps) => {
        // Custom comparison function for React.memo to prevent unnecessary re-renders
        // Only re-render if the input value or suggestions array has changed
        return (
            prevProps.userInput[prevProps.name] === nextProps.userInput[nextProps.name] &&
            prevProps.suggestions?.length === nextProps.suggestions?.length &&
            JSON.stringify(prevProps.suggestions) === JSON.stringify(nextProps.suggestions)
        );
    }
);

Autocomplete.displayName = 'Autocomplete';
