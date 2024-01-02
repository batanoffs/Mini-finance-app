import person1 from "../../../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg"

export const ProfileTab = () => {
    return (
        <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
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
    )
}