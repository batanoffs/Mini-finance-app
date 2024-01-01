import person1 from "../images/profile/senior-man-white-sweater-eyeglasses.jpg"

export const Settings = () => {
    return (
        <>  
        <div className="title-group mb-3">
                        <h1 className="h2 mb-0">Settings</h1>
                    </div>

                    <div className="row my-4">
                        <div className="col-lg-7 col-12">
                            <div className="custom-block bg-white">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true">Profile</button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password</button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification-tab-pane" type="button" role="tab" aria-controls="notification-tab-pane" aria-selected="false">Notification</button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <h6 className="mb-4">User Profile</h6>

                                        <form className="custom-form profile-form" action="#" method="post">
                                            <input className="form-control" type="text" name="profile-name" id="profile-name" placeholder="John Doe"/>

                                            <input className="form-control" type="email" name="profile-email" id="profile-email" placeholder="Johndoe@gmail.com"/>

                                            <div className="input-group mb-1">
                                                <img src={person1} className="profile-image img-fluid" alt="person"/>

                                                <input type="file" className="form-control" id="inputGroupFile02"/>
                                            </div>

                                            <div className="d-flex">
                                                <button type="button" className="form-control me-3">
                                                    Reset
                                                </button>

                                                <button type="submit" className="form-control ms-2">
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade" id="password-tab-pane" role="tabpanel" aria-labelledby="password-tab" tabindex="0">
                                        <h6 className="mb-4">Password</h6>

                                        <form className="custom-form password-form" action="#" method="post">
                                            <input type="password" name="password" id="password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Current Password" required=""/>

                                            <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="New Password" required=""/>

                                            <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Confirm Password" required=""/>

                                            <div className="d-flex">
                                                <button type="button" className="form-control me-3">
                                                    Reset
                                                </button>

                                                <button type="submit" className="form-control ms-2">
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade" id="notification-tab-pane" role="tabpanel" aria-labelledby="notification-tab" tabindex="0">
                                        <h6 className="mb-4">Notification</h6>

                                        <form className="custom-form notification-form" action="#" method="post">

                                            <div className="form-check form-switch d-flex mb-3 ps-0">
                                                <label className="form-check-label" for="flexSwitchCheckCheckedOne">Account activity</label>

                                                <input className="form-check-input ms-auto" type="checkbox" name="form-check-input" role="switch" id="flexSwitchCheckCheckedOne" checked/>
                                            </div>

                                            <div className="form-check form-switch d-flex mb-3 ps-0">
                                                <label className="form-check-label" for="flexSwitchCheckCheckedTwo">Payment updated</label>

                                                <input className="form-check-input ms-auto" type="checkbox" name="form-check-input" role="switch" id="flexSwitchCheckCheckedTwo" checked/>
                                            </div>

                                            <div className="d-flex mt-4">
                                                <button type="button" className="form-control me-3">
                                                    Reset
                                                </button>

                                                <button type="submit" className="form-control ms-2">
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade active show" id="password-tab-pane" role="tabpanel" aria-labelledby="password-tab" tabindex="0">
                                        <h6 className="mb-4">Password</h6>

                                        <form className="custom-form password-form" action="#" method="post">
                                            <input type="password" name="password" id="password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Current Password" required=""/>

                                            <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="New Password" required=""/>

                                            <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Confirm Password" required=""/>

                                            <div className="d-flex">
                                                <button type="button" className="form-control me-3">
                                                    Reset
                                                </button>

                                                <button type="submit" className="form-control ms-2">
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade active show" id="notification-tab-pane" role="tabpanel" aria-labelledby="notification-tab" tabindex="0">
                                        <h6 className="mb-4">Notification</h6>

                                        <form className="custom-form notification-form" action="#" method="post">

                                            <div className="form-check form-switch d-flex mb-3 ps-0">
                                                <label className="form-check-label" for="flexSwitchCheckCheckedOne">Account activity</label>

                                                <input className="form-check-input ms-auto" type="checkbox" name="form-check-input" role="switch" id="flexSwitchCheckCheckedOne" checked=""/>
                                            </div>

                                            <div className="form-check form-switch d-flex mb-3 ps-0">
                                                <label className="form-check-label" for="flexSwitchCheckCheckedTwo">Payment updated</label>

                                                <input className="form-check-input ms-auto" type="checkbox" name="form-check-input" role="switch" id="flexSwitchCheckCheckedTwo" checked=""/>
                                            </div>

                                            <div className="d-flex mt-4">
                                                <button type="button" className="form-control me-3">
                                                    Reset
                                                </button>

                                                <button type="submit" className="form-control ms-2">
                                                    Update Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 col-12">
                            <div className="custom-block custom-block-contact">
                                <h6 className="mb-4">Still can’t find what you looking for?</h6>

                                <p>
                                    <strong>Call us:</strong>
                                    <a href="tel: 305-240-9671" className="ms-2">
                                        (60) 
                                        305-240-9671
                                    </a>
                                </p>

                                <a href="#" className="btn custom-btn custom-btn-bg-white mt-3">
                                    Chat with us
                                </a>
                            </div>
                        </div>
                    </div>
        </>
    )
}