export const Greetings = ({ name }) => {
    return (
        <div className="title-group">
            <h4>Основна информация</h4>

            <small className="text-muted">Добре дошъл, {name}!</small>
        </div>
    );
};
