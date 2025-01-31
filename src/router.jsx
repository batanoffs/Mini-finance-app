import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from 'antd';

import {
    Home,
    Register,
    Login,
    About,
    Dashboard,
    HelpCenter,
    Profile,
    Subscription,
    Wallet,
    UserSettingsNav,
    ResetPassword,
} from './pages';
import { NavBar, ContactInfo } from './pages/assets';
import { RootLayout, DashboardLayout, UserSettingsLayout } from './layout';
import { AuthProvider } from './contexts/AuthContext';
import { PageNotFound } from './components/utils';
import { restrictLoginPage, restrictDashboard } from './guards';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <AuthProvider>
                    <App>
                        <RootLayout />
                    </App>
                </AuthProvider>
            ),
            children: [
                { index: true, element: <Home />, loader: restrictLoginPage },
                { path: 'about', element: <About />, loader: restrictLoginPage },
                { path: 'login', element: <Login />, loader: restrictLoginPage },
                { path: 'register', element: <Register />, loader: restrictLoginPage },
                { path: 'reset', element: <ResetPassword />, loader: restrictLoginPage }, // Add the new route
                {
                    path: 'dashboard',
                    element: <DashboardLayout NavComponent={NavBar} />,
                    loader: restrictDashboard,

                    children: [
                        {
                            index: true, // if user goes to /dashboard, redirect to /dashboard/overview
                            element: <Navigate to="overview" replace />,
                        },
                        {
                            path: 'overview',
                            element: <Dashboard />,
                        },
                        {
                            path: 'wallet',
                            element: <Wallet />,
                        },
                        {
                            path: 'profile',
                            element: <Profile />,
                        },
                        {
                            path: 'settings',
                            element: (
                                <UserSettingsLayout
                                    NavComponent={UserSettingsNav}
                                    aside={[ContactInfo]}
                                />
                            ),
                        },
                        {
                            path: 'help-center',
                            element: <HelpCenter />,
                        },
                        {
                            path: 'subscription',
                            element: <Subscription />,
                        },
                    ],
                },
                { path: '*', element: <PageNotFound /> },
            ],
        },
    ],
    {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

export default router;
