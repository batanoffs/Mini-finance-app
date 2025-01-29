import { useState } from 'react';
import useAutocomplete from './useAutocomplete';
import { SuggestionItem } from './suggestion-item/SuggestionItem';
import { FormInput } from '../form-input/FormInput';

import styles from './autocomplete.module.css';

export const Autocomplete = ({
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

    const handleChange = (e) => {
        inputChangeHandler(e);
        if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = () => {
        // Delay hiding suggestions to allow click events to fire
        setTimeout(() => {
            setIsFocused(false);
            if (!userInput[name]) {
                setShowSuggestions(false);
            }
        }, 200);
    };

    const handleFocus = () => {
        setIsFocused(true);
        // Only show suggestions if there's input
        if (userInput[name]?.trim()) {
            setShowSuggestions(true);
        }
    };

    const shouldShowSuggestions = isFocused && showSuggestions && userInput[name]?.trim() && filteredSuggestions?.length > 0;

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
                {filteredSuggestions?.map((suggestion, index) => (
                    <SuggestionItem
                        key={suggestion.objectId || index}
                        suggestion={suggestion}
                        isActive={index === activeSuggestion}
                        onClick={() => {
                            listSelectHandler(suggestion);
                            setIsFocused(false);
                        }}
                    />
                ))}
            </ul>
        </div>
    );
};
