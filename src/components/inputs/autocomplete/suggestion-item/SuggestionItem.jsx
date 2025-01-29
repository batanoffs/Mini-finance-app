/**
 * SuggestionItem component for rendering individual suggestion.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.suggestion - The suggestion object.
 * @param {boolean} props.isActive - Whether the suggestion is active.
 * @param {Function} props.onClick - Click handler for the suggestion.
 *
 * @returns {JSX.Element} The rendered SuggestionItem component.
 */

import styles from './suggestion-item.module.css'

export const SuggestionItem = ({ suggestion, isActive, onClick }) => (
    <li 
        className={`${styles.suggestionItem} ${isActive ? styles.active : ''}`}
        onClick={onClick}
    >
        {suggestion.avatar && (
            <img 
                className={styles.avatar} 
                src={suggestion.avatar} 
                alt=""
                onError={(e) => e.target.style.display = 'none'} 
            />
        )}
        <p className={styles.name}>{suggestion.name}</p>
    </li>
);
