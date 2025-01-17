import { BentoGrid } from '../grid/BentoGrid';

export const UserSettingsLayout = ({ aside = [], NavComponent = () => null }) => {
    
    // Render the aside components if they exist
    const renderAsideComponents = () => 
        aside.map((Component, index) => <Component key={index} />);

    return (
        <>
            <BentoGrid.Fill>
                <NavComponent />
            </BentoGrid.Fill>

            <BentoGrid.Aside>
                {aside.length > 0 && renderAsideComponents()}
            </BentoGrid.Aside>
        </>
    );
};
