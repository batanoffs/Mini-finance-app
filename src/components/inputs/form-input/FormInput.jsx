import styles from './form-input.module.css';

export const FormInput = ({
    type,
    name = '',
    id = '',
    value,
    autoComplete = 'off',
    error = '',
    className = '',
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    placeholder = '',
    required = false,
}) => {
    // Split camelCase name into words and capitalize the first letter of each word
    const splitCamelCase = (str) => {
        return str
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const fieldName = name ? splitCamelCase(name) : '';

    // Create label with error star if there's an error
    const label = (
        <>
            {fieldName + ':'}
            {required && <small>*</small>}
        </>
    );
    return (
        <div>
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
                    className={className}
                    placeholder={placeholder}
                />
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
