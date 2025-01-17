export const ProfileAttributes = ({ userElements = [], styles }) => {
    const renderProfileAttribute = (label, value, hrefPrefix) => (
        <div className={styles.attributeWrapper}>
            <strong>{label}: </strong>
            {hrefPrefix ? <a href={`${hrefPrefix}:${value}`}>{value}</a> : <p>{value}</p>}
        </div>
    );

    return (
        <ul>
            {userElements &&
                userElements.map(([label, value, hrefPrefix], index) => (
                    <li key={index}>{renderProfileAttribute(label, value, hrefPrefix)}</li>
                ))}
        </ul>
    );
};
