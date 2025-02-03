import { splitCamelCase } from './utils';

import styles from './form-input.module.css';

export const FormInput = ({
    type,
    value,
    id = '',
    name = '',
    className = '',
    placeholder = '',
    autoComplete = 'off',
    required = false,
    error = '',
    customLabel = null,
    suffixText = '',
    sx = {},
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    ...props
}) => {
    // Split camel case name into separate words and capitalize first letter
    const fieldName = name ? splitCamelCase(name) : '';

    return (
        <div
            style={sx}
            className={`${styles.formField} ${error ? styles.hasError : ''} ${
                required ? styles.required : ''
            } ${suffixText ? styles.hasSuffix : ''}`}
        >
            <input
                type={type}
                name={name}
                autoComplete={autoComplete}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                className={`${className} ${styles.input} ${error ? styles.inputError : ''}`}
                placeholder={placeholder || customLabel || fieldName}
                {...props}
            />
            {suffixText && <span className={styles.suffixText}>{suffixText}</span>}
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
