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
    sx = {},
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
}) => {
    // Split camel case name into separate words and capitalize first letter
    const fieldName = name ? splitCamelCase(name) : '';

    // Create label with error star if there's an error
    const label = (
        <>
            {fieldName + ':'}
            {required && <small>*</small>}
        </>
    );
    return (
        <div style={sx}>
            <div className={styles.formGroup}>
                {name && <label htmlFor={id}>{label}</label>}
                <input
                    type={type}
                    name={name}
                    autoComplete={autoComplete}
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className={`${className} ${styles.input}`}
                    placeholder={placeholder}
                />
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
