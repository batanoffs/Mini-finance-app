import { createBrowserRouter, Navigate } from 'react-router-dom'
import { App } from 'antd'

import { Dashboard, Home, Register, Login, About } from './pages'
import { HelpCenterTab, OverviewTab, ProfileTab, Upgrade, UserSettingsTab, WalletTab } from './pages/dashboard/assets'
import { AuthProvider } from './contexts/AuthContext'
import { PageNotFound } from './components/utils/404'
import { RootLayout } from './layout/RootLayout'
import { restrictLoginPage, restrictDashboard } from './guards'

import styles from './pages/dashboard/dashboard-layout.module.css'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <AuthProvider>
                    <App style={{ fontFamily: 'var(--body-font-family)' }}>
                        <RootLayout />
                    </App>
                </AuthProvider>
            ),
            children: [
                { index: true, element: <Home />, loader: restrictLoginPage },
                { path: 'about', element: <About />, loader: restrictLoginPage },
                { path: 'login', element: <Login />, loader: restrictLoginPage },
                { path: 'register', element: <Register />, loader: restrictLoginPage },
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                    loader: restrictDashboard,

                    children: [
                        {
                            index: true, // if user goes to /dashboard, redirect to /dashboard/overview
                            element: <Navigate to="overview" replace />,
                        },
                        {
                            path: 'overview',
                            element: <OverviewTab styles={styles} />,
                        },
                        {
                            path: 'wallet',
                            element: <WalletTab styles={styles} />,
                        },
                        {
                            path: 'profile',
                            element: <ProfileTab styles={styles} />,
                        },
                        {
                            path: 'settings',
                            element: <UserSettingsTab styles={styles} />,
                        },
                        {
                            path: 'help-center',
                            element: <HelpCenterTab styles={styles} />,
                        },
                        {
                            path: 'upgrade',
                            element: <Upgrade styles={styles} />,
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
)

export default router
