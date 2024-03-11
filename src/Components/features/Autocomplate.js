import React, { useState } from "react";
import "./autocomplate.css";

export const Autocomplete = ( props ) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const onChange = (e) => {
        const input = e.target.value;
        const suggestions = props.suggestions;
        const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1);

        setActiveSuggestion(0);
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
        props.setUserInput((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        
    };

    const onClick = (e) => {
        if (e && e.target && e.target.innerText) {
            setActiveSuggestion(0);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            props.setUserInput((state) => ({...state, friends: e.target.innerText}));
        } else {
            return;
        }
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            props.setUserInput(filteredSuggestions[activeSuggestion]);
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    let suggestionsListComponent;

    if (showSuggestions && props.userInput.friends) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        if (index === activeSuggestion) {
                            className = "suggestion-active";
                        }
                        return (
                            <li
                                className={className}
                                key={suggestion}
                                onClick={onClick}
                                name="friends"
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>Няма съвпадения</em>
                </div>
            );
        }
    }

    return (
        <>
            <div className="suggestions-wrapper">
                <input
                    className="suggestion-box"
                    name="friends"
                    placeholder="Иван Иванов"
                    type="text"
                    style={{ marginBottom: "0px", border: "0px", borderBottom: "1px solid var(--border-color)"}}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={props.userInput.friends}
                />
                {suggestionsListComponent}
            </div>
        </>
    );
};