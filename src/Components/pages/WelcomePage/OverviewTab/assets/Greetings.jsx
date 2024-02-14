import blocks from "../../custom-block.module.css";

export const Greetings = ({ name }) => {
    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockBottom}`}>
            <div className="title-group">
                <h5 style={{ paddingBottom: "0px"}}>Добре дошъл, {name}!</h5>
            </div>
        </div>
    );
};
