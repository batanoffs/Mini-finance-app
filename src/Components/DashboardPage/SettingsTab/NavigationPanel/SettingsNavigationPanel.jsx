import { Link } from "react-router-dom"

export const SettingsNavigationPanel = () => {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <Link to={'profile'} className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" role="tab" aria-controls="profile-tab-pane" aria-selected="true">Профил</Link>
            </li>

            <li className="nav-item" role="presentation">
                <Link to={'password'} className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" role="tab" aria-controls="password-tab-pane" aria-selected="false">Парола</Link>
            </li>

            <li className="nav-item" role="presentation">
                <Link to={'notifications'} className="nav-link" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification-tab-pane" role="tab" aria-controls="notification-tab-pane" aria-selected="false">Известия</Link>
            </li>

            <li className="nav-item" role="presentation">
                <Link to={'credit-card'} className="nav-link" id="credit-card-tab" data-bs-toggle="tab" data-bs-target="#credit-card-tab-pane" role="tab" aria-controls="credit-card-tab-pane" aria-selected="false">Карта</Link>
            </li>
        </ul>
    )
}