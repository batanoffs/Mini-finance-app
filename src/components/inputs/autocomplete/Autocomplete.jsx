import { useState, useCallback, memo } from 'react';

import useAutocomplete from './useAutocomplete';
import { SuggestionItem } from './suggestion-item/SuggestionItem';
import { FormInput } from '../form-input/FormInput';

import styles from './autocomplete.module.css';

export const Autocomplete = memo(({
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
    // Move all hooks to the top level
    const [isFocused, setIsFocused] = useState(false);
    
    const {
        inputChangeHandler,
        keyboardPressHandler,
        listSelectHandler,
        setShowSuggestions,
        filteredSuggestions,
        activeSuggestion,
        showSuggestions,
    } = useAutocomplete(suggestions, userInput, setUserInput);

    // Memoize all handlers
    const handleChange = useCallback((e) => {
        inputChangeHandler(e);
        onChange?.(e);
    }, [inputChangeHandler, onChange]);

    const handleBlur = useCallback(() => {
        // Delay hiding focus state to allow click events to complete
        setTimeout(() => {
            setIsFocused(false);
            !userInput[name]?.trim() && setShowSuggestions(false);
        }, 200);
    }, [name, userInput, setShowSuggestions]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        userInput[name]?.trim() && setShowSuggestions(true);
    }, [name, userInput, setShowSuggestions]);

    const handleListItemClick = useCallback((suggestion) => {
        listSelectHandler(suggestion);
        setIsFocused(false);
    }, [listSelectHandler]);

    // Compute visibility once
    const shouldShowSuggestions = isFocused && showSuggestions && filteredSuggestions.length > 0;

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
}, (prevProps, nextProps) => {
    return (
        prevProps.userInput[prevProps.name] === nextProps.userInput[nextProps.name] &&
        prevProps.suggestions?.length === nextProps.suggestions?.length &&
        JSON.stringify(prevProps.suggestions) === JSON.stringify(nextProps.suggestions)
    );
});

Autocomplete.displayName = 'Autocomplete';
