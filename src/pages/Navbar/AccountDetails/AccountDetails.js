import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../providers/authentication.js";

function AccountDetails({
    logoutHandler,
    setOpenNavbar,
    setCurrentProfileBtn,
}) {
    const { user, isLoggedIn } = useContext(AuthContext);

    return (
        <div className="accountDetails">
            {isLoggedIn && (
                <div className="accountDetails__info">
                    <h4 className="accountDetails__info--heading-4">
                        {user.firstName + " " + user.lastName}
                    </h4>
                    <h5 className="accountDetails__info--heading-5">
                        {user.email}
                    </h5>
                </div>
            )}

            <div className="list">
                <Link
                    className="list__button list__button--loginInfo"
                    to="/loginInformation"
                    onClick={() => {
                        setOpenNavbar(false);
                        setCurrentProfileBtn("orders");
                    }}
                >
                    Order History & Tracking
                </Link>{" "}
                <Link
                    className="list__button list__button--loginInfo"
                    to="/loginInformation"
                    onClick={() => {
                        setOpenNavbar(false);
                        setCurrentProfileBtn("settings");
                    }}
                >
                    Account Settings
                </Link>{" "}
                <Link
                    className="list__button list__button--loginInfo"
                    to={"/loginInformation"}
                    onClick={() => {
                        setOpenNavbar(false);
                        setCurrentProfileBtn("loginInfo");
                    }}
                >
                    Login Information
                </Link>
                <Link
                    className="list__button list__button--logout"
                    to={"/"}
                    onClick={logoutHandler}
                >
                    Logout <span>&#x2B9E;</span>
                </Link>
            </div>
        </div>
    );
}

export default AccountDetails;
