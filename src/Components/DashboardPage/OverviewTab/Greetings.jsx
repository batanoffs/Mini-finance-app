export const Greetings = ({ name }) => {
    return (
        <div className="title-group mb-2">
            <h1 className="h4 mb-0">Основна информация</h1>

            <small className="text-muted">Добре дошъл, {name}!</small>
        </div>
    );
};
