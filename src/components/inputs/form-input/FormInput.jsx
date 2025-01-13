export const FormInput = ({ type, name = '', id = '', value, className, onChange = () => {}, placeholder = '' }) => {
    // Capitalize the first letter of the name
    const label = name ? name.charAt(0).toUpperCase() + name.slice(1) + ':' : ''

    return (
        <div className="form-group">
            {name && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
            />
        </div>
    )
}
