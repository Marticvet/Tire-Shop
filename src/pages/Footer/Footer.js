import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";
import SuccessfulPopup from "../Popup/SuccessfulPopup.js";

function Footer() {
    const [showPopup, setShowPopup] = useState(false);
    const [isInputValid, setIsinputValid] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    });

    function handlerSubmit(event) {
        event.preventDefault();

        if (
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
        ) {
            setIsinputValid(false);
            setFormData({ ...formData, email: "" });
            setShowPopup(true);

            return;
        }

        setIsinputValid(true);
    }

    return (
        <div className="footer">
            <div className=" footer__contact">
                <form
                    onSubmit={handlerSubmit}
                    action="#"
                    className=" footer__form"
                >
                    <label htmlFor="" className=" footer__form--label">
                        Get on Our Email List
                    </label>
                    <div>
                        <input
                            className={
                                isInputValid === true
                                    ? "footer__form--email invalid--input"
                                    : "footer__form--email"
                            }
                            type="email"
                            name="email"
                            placeholder="example@domain.com"
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    email: event.target.value,
                                })
                            }
                            value={formData.email}
                        />
                        <button className="footer__form--signup">
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="footer__paragraph--main">
                    Sales & Customer Service Hours
                </p>
                <p className="footer__paragraph--secondary">
                    Sales: 888-541-1777
                </p>
                <p className="footer__paragraph--secondary">
                    Customer Service: 888-981-3953
                </p>
                <p className="footer__paragraph--secondary">
                    Monday - Friday 8:00 - 8:00 ET
                </p>
                <p className="footer__paragraph--secondary">
                    Saturday 9:00 - 4:00 ET
                </p>
            </div>

            <div className="footer__support">
                <ul>
                    <h2 className="footer__support--heading">
                        Customer Support
                    </h2>
                    <li>
                        <Link className="footer__support--links" to={"/contacts"}>
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__support--links" to={"/contacts"}>
                            Order Tracking
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__support--links" to={"/contacts"}>
                            Warranty Information
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__support--links" to={"/contacts"}>
                            My Account
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__support--links" to={"/contacts"}>
                            Accessibility
                        </Link>
                    </li>
                </ul>
            </div>

            <div className=" footer__about">
                <ul>
                    <h2 className="footer__about--heading">About Tire Shop</h2>
                    <li>
                        <Link className="footer__about--links" to={"/contacts"}>
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__about--links" to={"/contacts"}>
                            Order Tracking
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__about--links" to={"/contacts"}>
                            Warranty Information
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__about--links" to={"/contacts"}>
                            My Account
                        </Link>
                    </li>
                    <li>
                        <Link className="footer__about--links" to={"/contacts"}>
                            Accessibility
                        </Link>
                    </li>
                </ul>
            </div>

            <SuccessfulPopup
                trigger={showPopup}
                setTrigger={setShowPopup}
                message={"The message has been successfully sent."}
            />
        </div>
    );
}

export default Footer;
