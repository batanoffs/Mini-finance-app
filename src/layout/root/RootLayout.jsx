import { Outlet } from 'react-router-dom';

import { Footer, AppBar } from '../../pages';

export const RootLayout = () => {
    return (
        <>
            <AppBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
