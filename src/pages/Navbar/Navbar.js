/* eslint-disable no-sequences */
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import LoginForm from "./LoginForm/LoginForm.js";
import RegisterForm from "./RegisterForm/RegisterForm.js";
import { UsersService } from "../../services/users.service.js";
import AccountDetails from "./AccountDetails/AccountDetails.js";
import AuthContext, { createSession } from "../../providers/authentication.js";
import SuccessfulPopup from "../Popup/SuccessfulPopup.js";

const images = {
    logo: require("../../img/Tire Shop-logos_transparent.png"),
};

const FormVariant = {
    hidden: {
        opacity: 0,
        x: "100vw",
        transition: { type: "tween", duration: 1 },
    },
    visible: {
        opacity: 1,
        x: 15,
        transition: { type: "tween", duration: 0.5 },
    },
    exit: {
        opacity: 0,
        x: "100vw",
        transition: { type: "tween", duration: 1 },
    },
};

function Navbar({
    openNavbar,
    setOpenNavbar,
    currentProfileBtn,
    setCurrentProfileBtn,
    setIsSidebarOpen,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });
    const [message, setMessage] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const brands = [
        "michelin",
        "bridgestone",
        "continental",
        "cooper",
        "firestone",
        "general",
        "hankook",
        "pirelli",
        "yokohama",
        "goodyear",
    ];

    const keyDownHandler = (event) => {
        if (
            event.key === "Enter" &&
            event.target.className === "searchBar__search--input"
        ) {
            event.preventDefault();
            setOpenNavbar(false);

            const filteredBrands = brands.filter((brand) => {
                return brand
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase());
            });

            if (
                filteredBrands.length > 0 &&
                filteredBrands[0] &&
                searchTerm.trim().length > 0
            ) {
                navigate(
                    `/tires/manufacturers/${filteredBrands[0]}/tire-models`
                );

                return;
            }

            if (searchTerm.trim().length > 0) {
                const manName = searchTerm.toLowerCase().trim().split(" ")[0];
                const manufacturerName = brands.includes(manName)
                    ? manName + " "
                    : "no";
                const modelName =
                    manufacturerName === "no"
                        ? searchTerm.split(" ").join(" ")
                        : searchTerm.split(" ").slice(1).join(" ");

                navigate({
                    pathname: "search/models",
                    search: `manufacturer=${manufacturerName}&model=${modelName}`,
                });
            }
        }
    };

    async function submitHandler(event) {
        event.preventDefault();
        const userService = new UsersService();
        const { email, password, first_name, last_name } = formData;

        if (isLoginForm) {
            const email = formData.email;
            const password = formData.password;

            (async () => {
                await userService
                    .loginUser({ email, password })
                    .then(({ token, user }) => {
                        if (!token) {
                            return;
                        }
                        const isSessionCreated = createSession(token, auth);

                        if (isSessionCreated) {
                            setShowPopup(true);
                            setOpenNavbar(false);
                            setMessage("Successfully Logged In!");
                        }
                    });
            })();
        } else {
            (async () => {
                await userService
                    .registerUser({ email, password, first_name, last_name })
                    .then(({ message, user }) => {
                        if (!message.includes("Successfully")) {
                            return;
                        }

                        setIsLoginForm(true);
                        setMessage("Successfully Registered!");
                    });
            })();
        }
        setFormData({
            ...formData,
            email: "",
            password: "",
            first_name: "",
            last_name: "",
        });
    }

    function logoutHandler(event) {
        event.preventDefault();
        const userService = new UsersService();

        (async () => {
            await userService.logoutUser().then((response) => {
                if (response.status === 200) {
                    localStorage.clear();
                    auth.setAuthState({
                        user: null,
                        isLoggedIn: false,
                    });
                    navigate("/");
                }
            });
        })();
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <div className="nav" onClick={() => setIsSidebarOpen(false)}>
            <div className="buttons" onClick={() => setOpenNavbar(false)}>
                <Link to={"/"} className="buttons__link">
                    <img
                        src={images.logo}
                        className="buttons__link--logo"
                        alt="Logo"
                    />
                </Link>

                <Link to={"/search"} className="buttons__link">
                    Find tires
                </Link>
                <Link to={"/about"} className="buttons__link">
                    About us
                </Link>
                <Link to={"/contacts"} className="buttons__link">
                    Contacts
                </Link>
                <Link to={"/brands"} className="buttons__link">
                    Brands
                </Link>
            </div>

            <div className="rightSide">
                <div className="searchBar" onClick={() => setOpenNavbar(false)}>
                    <div className="searchBar__search">
                        <input
                            type="text"
                            className="searchBar__search--input"
                            placeholder="Search for products or brands..."
                            onChange={(event) =>
                                setSearchTerm(event.target.value.toLowerCase())
                            }
                        />

                        <span className="material-symbols-outlined searchBar__search--submit">
                            search
                        </span>
                    </div>
                </div>

                <div className="profile">
                    <div className="profile__container">
                        <span
                            className="material-symbols-outlined profile__buttons"
                            onClick={() => {
                                openNavbar
                                    ? setOpenNavbar(false)
                                    : setOpenNavbar(true);
                                setIsLoginForm(true);
                            }}
                        >
                            account_circle
                        </span>
                        {auth.isLoggedIn && (
                            <Link
                                to={"/shopping_cart"}
                                className="profile__buttons"
                                onClick={() => setOpenNavbar(false)}
                            >
                                <span className="material-symbols-outlined">
                                    shopping_cart
                                </span>
                            </Link>
                        )}
                    </div>

                    <AnimatePresence>
                        {openNavbar && !auth.isLoggedIn ? (
                            <div
                                className="blurredBackground"
                                onClick={(event) => {
                                    if (
                                        event.target.classList.contains(
                                            "blurredBackground"
                                        )
                                    ) {
                                        setOpenNavbar(false);
                                    }
                                }}
                            >
                                <motion.div
                                    key={"login / register"}
                                    variants={FormVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={`dropdown-menu ${
                                        openNavbar ? "active" : "inactive"
                                    }`}
                                >
                                    <div className="account">
                                        <h3>
                                            {isLoginForm ? "My" : "Create"}{" "}
                                            Account
                                        </h3>
                                        <AiFillCloseCircle
                                            className="account__closeBtn"
                                            onClick={() => setOpenNavbar(false)}
                                        />
                                    </div>
                                    {isLoginForm ? (
                                        <LoginForm
                                            isLoginForm={isLoginForm}
                                            setIsLoginForm={setIsLoginForm}
                                            formData={formData}
                                            setFormData={setFormData}
                                            submitHandler={submitHandler}
                                        />
                                    ) : (
                                        <RegisterForm
                                            isLoginForm={isLoginForm}
                                            setIsLoginForm={setIsLoginForm}
                                            formData={formData}
                                            setFormData={setFormData}
                                            submitHandler={submitHandler}
                                        />
                                    )}
                                </motion.div>
                            </div>
                        ) : null}
                    </AnimatePresence>
                    <AnimatePresence>
                        {openNavbar && auth.isLoggedIn === true ? (
                            <div
                                className="blurredBackground"
                                tabIndex={1}
                                onFocus={(e) => {
                                    if (
                                        e.target.className.includes(
                                            "blurredBackground"
                                        )
                                    ) {
                                        setOpenNavbar(false);
                                    }
                                }}
                            >
                                <motion.div
                                    key={"logout"}
                                    variants={FormVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{
                                        opacity: 0,
                                        x: "100vw",
                                        transition: {
                                            type: "tween",
                                            duration: 0.7,
                                        },
                                    }}
                                    className={`dropdown-menu ${
                                        openNavbar ? "active" : "inactive"
                                    }`}
                                    tabIndex={1}
                                    onFocus={(e) => {
                                        if (
                                            e.target.className.includes(
                                                "active"
                                            )
                                        ) {
                                        }
                                    }}
                                >
                                    <div className="account">
                                        <h3>Account details</h3>
                                        <AiFillCloseCircle
                                            className="account__closeBtn"
                                            onClick={() => setOpenNavbar(false)}
                                        />
                                    </div>

                                    <AccountDetails
                                        logoutHandler={logoutHandler}
                                        setOpenNavbar={setOpenNavbar}
                                        currentProfileBtn={currentProfileBtn}
                                        setCurrentProfileBtn={
                                            setCurrentProfileBtn
                                        }
                                    />
                                </motion.div>
                            </div>
                        ) : null}
                    </AnimatePresence>
                    <SuccessfulPopup
                        trigger={showPopup}
                        setTrigger={setShowPopup}
                        message={message}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
