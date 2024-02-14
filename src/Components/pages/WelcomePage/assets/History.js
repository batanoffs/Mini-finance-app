import blocks from "../custom-block.module.css";

export const History = () => {
    return (
        <div className={blocks.customBlock}>
            <h5 >История на плащания</h5>

            <div id="pie-chart"></div>
            <div className={blocks.customBlock}>
                <div id="chart"></div>
            </div>
        </div>
    );
};
