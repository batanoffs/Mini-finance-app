import { useState } from "react";
// import '../tab-bar.css'

export const ProfileTab = ({name, email, phone, picture}) => {
    const [state, setState] = useState({
        fullname: name,
        email: email,
        phone_number: phone,
        picture: "",
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const onResetHandler = () => {
        console.log("resetted");
    }

    const onUpdateHandler = () => {
        console.log("updated");
    }
    return (
        <div
            className="tab-pane fade show active"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
        >
            <h6 className="mb-4">User Profile</h6>

            <form className="custom-form profile-form" action="#" method="post">
                <input
                    className="form-control"
                    type="text"
                    name="profile-name"
                    id="profile-name"
                    value={state.fullname}
                    onChange={inputChangeHandler}
                    placeholder="John Doe"
                />

                <input
                    className="form-control"
                    type="email"
                    name="profile-email"
                    value={state.email}
                    onChange={inputChangeHandler}
                    id="profile-email"
                    placeholder="Johndoe@gmail.com"
                />

                <input
                    type="number"
                    name="phone_number"
                    value={state.phone_number}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                    placeholder="Phone number"
                    className="form-control mb-3"
                />

                <div className="input-group mb-1">
                    <img
                        src={picture}
                        className="profile-image img-fluid"
                        alt="person"
                        value={state.picture}
                        onChange={inputChangeHandler}
                    />

                    <input
                        type="file"
                        onChange={inputChangeHandler}
                        value=""
                        className="form-control"
                        id="inputGroupFile02"
                    />
                </div>

                <div className="d-flex">
                    <button type="button" onClick={onResetHandler}className="form-control me-3">
                        Reset
                    </button>

                    <button type="submit" onClick={onUpdateHandler} className="form-control ms-2">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};
