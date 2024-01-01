import userProfilePicture from "../../images/medium-shot-happy-man-smiling.jpg"
export const ProfilePage = () => {
    return (
        <>  
        <div className="title-group mb-3">
                        <h1 className="h2 mb-0">Profile</h1>
                    </div>

                    <div className="row my-4">
                        <div className="col-lg-7 col-12">
                            <div className="custom-block custom-block-profile">
                                <div className="row">
                                    <div className="col-lg-12 col-12 mb-3">
                                        <h6>General</h6>
                                    </div>

                                    <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                                        <div className="custom-block-profile-image-wrap">
                                            <img src={userProfilePicture} className="custom-block-profile-image img-fluid" alt=""/>

                                            <a href="settings" className="bi-pencil-square custom-block-edit-icon"></a>
                                        </div>
                                    </div>

                                    <div className="col-lg-9 col-12">
                                        <p className="d-flex flex-wrap mb-2">
                                            <strong>Name:</strong>

                                            <span>Thomas Edison</span>
                                        </p>

                                        <p className="d-flex flex-wrap mb-2">
                                            <strong>Email:</strong>
                                            
                                            <a href="#">
                                                thomas@site.com
                                            </a>
                                        </p>

                                        <p className="d-flex flex-wrap mb-2">
                                            <strong>Phone:</strong>

                                            <a href="#">
                                                (60) 12 345 6789
                                            </a>
                                        </p>

                                        <p className="d-flex flex-wrap mb-2">
                                            <strong>Birthday:</strong>

                                            <span>March 5, 1992</span>
                                        </p>

                                        <p className="d-flex flex-wrap">
                                            <strong>Address:</strong>

                                            <span>551 Swanston Street, Melbourne</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="custom-block custom-block-profile bg-white">
                                <h6 className="mb-4">Card Information</h6>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>User ID:</strong>

                                    <span>012 395 8647</span>
                                </p>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Type:</strong>

                                    <span>Personal</span>
                                </p>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Created:</strong>

                                    <span>July 19, 2020</span>
                                </p>

                                <p className="d-flex flex-wrap mb-2">
                                    <strong>Valid Date:</strong>

                                    <span>July 18, 2032</span>
                                </p>
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