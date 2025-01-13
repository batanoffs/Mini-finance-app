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
    <li className={isActive ? styles.active : ''} onClick={onClick} name="friends">
        <img className={styles.avatar} src={suggestion.avatar} alt={suggestion.name} />
        <p>{suggestion.name}</p>
    </li>
)
