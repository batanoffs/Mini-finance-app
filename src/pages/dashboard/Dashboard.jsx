import { Outlet } from 'react-router-dom'
import { Sidebar } from './assets/index'

export const Dashboard = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />

            <Outlet />
        </div>
    )
}
