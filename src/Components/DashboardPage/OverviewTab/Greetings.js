export const Greetings = ({ name }) => {
    return (
        <div className="title-group mb-3">
            <h1 className="h2 mb-0">Основна информация</h1>

            <small className="text-muted">{name}, добре дошъл !</small>
        </div>
    );
};
