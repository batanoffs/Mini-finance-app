export const NotificationTab = () => {
    return (
        <div className="tab-pane fade active show" id="notification-tab-pane" role="tabpanel" aria-labelledby="notification-tab" tabIndex="0">
            <h5 className="mb-4">Известия</h5>

            <form className="custom-form notification-form" action="#" method="post">

                <div className="form-check form-switch d-flex mb-3 ps-0">
                    <label className="form-check-label" htmlFor="flexSwitchCheckCheckedOne">Последна активност</label>

                    <input className="form-check-input ms-auto" type="checkbox" onChange={() => {}} name="form-check-input" role="switch" id="flexSwitchCheckCheckedOne" checked=""/>
                </div>

                <div className="form-check form-switch d-flex mb-3 ps-0">
                    <label className="form-check-label" htmlFor="flexSwitchCheckCheckedTwo">Обновено плащане</label>

                    <input className="form-check-input ms-auto" type="checkbox" onChange={() => {}} name="form-check-input" role="switch" id="flexSwitchCheckCheckedTwo" checked=""/>
                </div>

                <div className="d-flex mt-4">
                    <button type="button" className="form-control me-3">
                        Изчисти
                    </button>

                    <button type="submit" className="form-control ms-2">
                        Запази промени
                    </button>
                </div>
            </form>
        </div>
    )
}