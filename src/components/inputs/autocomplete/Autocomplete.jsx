/**
 * Autocomplete component for suggesting and selecting friends.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class name for the input element.
 * @param {string} props.inputName - The name attribute for the input element.
 * @param {string} props.userInput - The current user input state.
 * @param {Function} props.setUserInput - Function to update the user input state.
 * @param {Array} props.suggestions - List of suggestions to filter and display.
 * @param {string} [props.placeholder='John Doe'] - Placeholder text for the input element.
 * @param {Object} rest - Additional props.
 *
 * @returns {JSX.Element} The rendered Autocomplete component.
 */

import useAutocomplete from './useAutocomplete'
import { SuggestionItem } from './suggestion-item/SuggestionItem'

import styles from './autocomplete.module.css'

export const Autocomplete = ({
    className = '',
    inputName,
    userInput,
    setUserInput,
    suggestions,
    placeholder = 'John Doe',
    ...rest
}) => {
    const { inputChangeHandler, keyboardPressHandler, listSelectHandler, filteredSuggestions, activeSuggestion } =
        useAutocomplete(suggestions, userInput, setUserInput)

    const keys = Object.keys(userInput)
    const lastKey = keys[keys.length - 1]

    if (!lastKey) return <div> error </div>

    const label = lastKey[0].toUpperCase() + lastKey.slice(1) + ':'

    return (
        <div className={styles.formGroup}>
            <label htmlFor={lastKey}>{label}</label>

            <div className={styles.wrapper}>
                <input
                    name={lastKey}
                    placeholder={placeholder}
                    type="text"
                    autoComplete="off"
                    onChange={inputChangeHandler}
                    className={`${styles.formControl} ${className}`}
                    onKeyDown={keyboardPressHandler}
                    value={userInput.friends}
                    {...rest}
                />

                <ul className={styles.suggestions}>
                    {filteredSuggestions && filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                            <SuggestionItem
                                key={suggestion.objectId || index}
                                suggestion={suggestion}
                                isActive={index === activeSuggestion}
                                onClick={listSelectHandler}
                            />
                        ))
                    ) : (
                        <div className={styles.noSuggestions}>
                            <em>No matches found</em>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}
