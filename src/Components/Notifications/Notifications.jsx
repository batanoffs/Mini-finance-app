import './notifications.css'
export const Notifications = () => {
    return (
        <ul className="dropdown-menu dropdown-menu-lg-end notifications-block-wrap bg-white shadow" aria-labelledby="navbarLightDropdownMenuLink">
            <small>Notifications</small>

            <li className="notifications-block border-bottom pb-2 mb-2">
                <a className="dropdown-item d-flex  align-items-center" href="#">
                    <div className="notifications-icon-wrap bg-success">
                        <i className="notifications-icon bi-check-circle-fill"></i>
                    </div>

                    <div>
                        <span>Your account has been created successfuly.</span>

                        <p>12 days ago</p>
                    </div>
                </a>
            </li>

            <li className="notifications-block border-bottom pb-2 mb-2">
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="notifications-icon-wrap bg-info">
                        <i className="notifications-icon bi-folder"></i>
                    </div>

                    <div>
                        <span>Please check. We have sent a Daily report.</span>

                        <p>10 days ago</p>
                    </div>
                </a>
            </li>

            <li className="notifications-block">
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="notifications-icon-wrap bg-danger">
                        <i className="notifications-icon bi-question-circle"></i>
                    </div>

                    <div>
                        <span>Account verification failed.</span>

                        <p>1 hour ago</p>
                    </div>
                </a>
            </li>
        </ul>
    )
}