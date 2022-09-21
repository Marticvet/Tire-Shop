import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { createSession } from "../../providers/authentication.js";
import { UsersService } from "../../services/users.service.js";
import "./styles/LoginInformation.css";
import SuccessfulPopup from "../Popup/SuccessfulPopup.js";
import Service from "../Service/Service.js";

function LoginInformation({ currentProfileBtn, setCurrentProfileBtn }) {
    const { user, setAuthState, isLoggedIn } = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    function updateHandler(event) {
        event.preventDefault();
        const userService = new UsersService();
        const userId = user.sub;
        const { email, name, password, confirmPassword } = userInfo;

        if (password !== confirmPassword) {
            window.alert(
                `Passwords must be same! Please fill again the fields!`
            );

            setUserInfo({ ...userInfo, password: "", confirmPassword: "" });
            return;
        }

        const index = name.indexOf(" ");
        const first_name = name.slice(0, index);
        const last_name = name.slice(index + 1);

        (async () => {
            await userService
                .updateUser({ email, first_name, last_name, password }, userId)
                .then(({ message, token, user }) => {
                    if (!token) {
                        window.alert(`Please fill again the fields!`);

                        setUserInfo({
                            ...userInfo,
                            password: "",
                            confirmPassword: "",
                        });
                        return;
                    }
                    const isSessionCreated = createSession(token, {
                        user,
                        setAuthState,
                        isLoggedIn,
                    });

                    if (isSessionCreated) {
                        setShowPopup(true);
                        setUserInfo({
                            ...userInfo,
                            email: "",
                            name: "",
                            password: "",
                            confirmPassword: "",
                        });
                    }
                });
        })();
    }

    function logoutHandler(event) {
        event.preventDefault();
        const userService = new UsersService();

        (async () => {
            await userService.logoutUser().then((response) => {
                if (response.status === 200) {
                    localStorage.clear();
                    setAuthState({
                        user: null,
                        isLoggedIn: false,
                    });

                    navigate("/");
                }
            });
        })();
    }

    return (
        <div className="loginInformation">
            <h1 className="loginInformation__heading">My Account</h1>
            <div className="loginInformation__details">
                <div className="sideBar">
                    <Link
                        className={
                            currentProfileBtn.includes("orders")
                                ? "sideBar__button active"
                                : "sideBar__button"
                        }
                        to="/loginInformation"
                        onClick={() => {
                            setCurrentProfileBtn("orders");
                        }}
                    >
                        Order History & Tracking
                    </Link>{" "}
                    <Link
                        className={
                            currentProfileBtn.includes("settings")
                                ? "sideBar__button active"
                                : "sideBar__button"
                        }
                        to="/loginInformation"
                        onClick={() => {
                            setCurrentProfileBtn("settings");
                        }}
                    >
                        Account Settings
                    </Link>{" "}
                    <Link
                        className={
                            currentProfileBtn.includes("loginInfo")
                                ? "sideBar__button active"
                                : "sideBar__button"
                        }
                        to="/loginInformation"
                        onClick={() => {
                            setCurrentProfileBtn("loginInfo");
                        }}
                    >
                        Login Information
                    </Link>{" "}
                    <Link
                        className="sideBar__button"
                        to={"/"}
                        onClick={logoutHandler}
                    >
                        Logout
                    </Link>
                </div>

                {currentProfileBtn.includes("settings") ||
                currentProfileBtn.includes("orders") ? (
                    <div className="functionallity">
                        <h1>Our developers're working on this functionality</h1>
                        <h1>Please try later!</h1>
                    </div>
                ) : null}

                {currentProfileBtn.includes("loginInfo") && (
                    <div className="update">
                        <form className="update__form" onSubmit={updateHandler}>
                            <label
                                className="update__form--label"
                                htmlFor="name"
                            >
                                Name:{" "}
                            </label>
                            <input
                                className="update__form--input"
                                type="text"
                                required
                                placeholder="First name and last name"
                                onChange={(event) => {
                                    setUserInfo({
                                        ...userInfo,
                                        name: event.target.value,
                                    });
                                }}
                                value={userInfo.name}
                            />

                            <label
                                className="update__form--label"
                                htmlFor="email"
                            >
                                Email Adress:{" "}
                            </label>
                            <input
                                className="update__form--input"
                                type="email"
                                required
                                placeholder="Email Adress"
                                value={userInfo.email}
                                onChange={(event) => {
                                    setUserInfo({
                                        ...userInfo,
                                        email: event.target.value.trim(),
                                    });
                                }}
                            />

                            <label
                                className="update__form--label"
                                htmlFor="new password"
                            >
                                New Password:{" "}
                            </label>
                            <input
                                className="update__form--input"
                                type="password"
                                required
                                placeholder="Password"
                                value={userInfo.password}
                                onChange={(event) => {
                                    setUserInfo({
                                        ...userInfo,
                                        password: event.target.value.trim(),
                                    });
                                }}
                            />

                            <label
                                className="update__form--label"
                                htmlFor="confirm password"
                            >
                                Confirm Password:{" "}
                            </label>
                            <input
                                className="update__form--input"
                                type="password"
                                required
                                placeholder="Confirm assword"
                                value={userInfo.confirmPassword}
                                onChange={(event) => {
                                    setUserInfo({
                                        ...userInfo,
                                        confirmPassword:
                                            event.target.value.trim(),
                                    });
                                }}
                            />

                            <button className="update__form--updateBtn">
                                Update
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <SuccessfulPopup
                trigger={showPopup}
                setTrigger={setShowPopup}
                message={"Your data has been successfully changed."}
            />
            <Service />
        </div>
    );
}

export default LoginInformation;
