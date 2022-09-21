import "./styles/Contacts.css";
import { useState } from "react";
import SuccessfulPopup from "../Popup/SuccessfulPopup.js";

function Contacts() {
    const [showPopup, setShowPopup] = useState(false);
    const [isValidFormData, setIsvalidFormData] = useState(false);
    const [isFirstInputValid, setFirstInputValid] = useState(false);
    const [isSecondInputValid, setSecondInputValid] = useState(false);
    const [isThirdInputValid, setThirdInputValid] = useState(false);
    const [isFourthInputValid, setFourthInputValid] = useState(false);
    const [isFifthInputValid, setFifthInputValid] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        message: "",
        gender: "Mr",
    });

    function handlerSubmit(event) {
        event.preventDefault();

        if (!Object.values(formData).includes("")) {
            setIsvalidFormData(true);
            setShowPopup(true);
            setFirstInputValid(false);
            setSecondInputValid(false);
            setThirdInputValid(false);
            setFourthInputValid(false);
            setFifthInputValid(false);

            setFormData({
                ...formData,
                firstName: "",
                lastName: "",
                email: "",
                mobileNumber: "",
                message: "",
                gender: "Mr",
            });

            return;
        }

        setIsvalidFormData(false);

        if (formData.firstName.includes("")) {
            setFirstInputValid(true);
        }

        if (formData.lastName.includes("")) {
            setSecondInputValid(true);
        }

        if (formData.email.includes("")) {
            setThirdInputValid(true);
        }

        if (formData.mobileNumber.includes("")) {
            setFourthInputValid(true);
        }

        if (formData.message.includes("")) {
            setFifthInputValid(true);
        }
    }

    return (
        <div className="wrapper">
            <div className="contact">
                <h1 className="contact__heading--1">Contact</h1>
                <p className="contact__paragraph contact__paragraph--1">
                    Do you have questions concerning a particular topic, or
                    would you like to learn more TireShop? The easiest way is to
                    contact us right here.
                </p>
                <p className="contact__paragraph contact__paragraph--2">
                    You can call us from Monday to Friday between 8:00 a.m. and
                    8:00 p.m. CET.{" "}
                </p>
                <p className="contact__paragraph contact__paragraph--3">
                    Phone: +49 511 123210-10
                </p>
                <p className="contact__paragraph contact__paragraph--4">
                    Fax: +49 511 123210-99
                </p>
                <p className="contact__paragraph contact__paragraph--5">
                    Email: tireshop@reifen.com
                </p>
            </div>

            <div className="form">
                <form className="form__table" onSubmit={handlerSubmit}>
                    <label
                        className="form__label form__label--1"
                        htmlFor="First name"
                    >
                        First Name:<span>*</span>
                    </label>
                    <input
                        className={
                            isFirstInputValid === true
                                ? "form__input form__input--1 invalid--input"
                                : "form__input form__input--1"
                        }
                        type="text"
                        placeholder="First name"
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                firstName: event.target.value,
                            });
                        }}
                        value={formData.firstName}
                        required
                    />
                    <label
                        className="form__label form__label--2"
                        htmlFor="Last name"
                    >
                        Last Name:<span>*</span>
                    </label>
                    <input
                        className={
                            isSecondInputValid === true
                                ? "form__input form__input--2 invalid--input"
                                : "form__input form__input--2"
                        }
                        type="text"
                        placeholder="Last name"
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                lastName: event.target.value,
                            });
                        }}
                        value={formData.lastName}
                        required
                    />
                    <label
                        className="form__label form__label--3"
                        htmlFor="Email"
                    >
                        Email:<span>*</span>
                    </label>
                    <input
                        className={
                            isThirdInputValid === true
                                ? "form__input form__input--3 invalid--input"
                                : "form__input form__input--3"
                        }
                        type="text"
                        placeholder="Email"
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            });
                        }}
                        value={formData.email}
                        required
                    />
                    <label
                        className="form__label form__label--4"
                        htmlFor="Mobile nummber"
                    >
                        Mobile nummber:<span>*</span>
                    </label>
                    <input
                        className={
                            isFourthInputValid === true
                                ? "form__input form__input--4 invalid--input"
                                : "form__input form__input--4"
                        }
                        type="tel"
                        placeholder="Mobile number"
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                mobileNumber: event.target.value,
                            });
                        }}
                        value={formData.mobileNumber}
                        required
                    />
                    <label
                        className="form__label form__label--5"
                        htmlFor="Message"
                    >
                        Message:<span>*</span>
                    </label>
                    <input
                        className={
                            isFifthInputValid === true
                                ? "form__input form__input--5 invalid--input"
                                : "form__input form__input--5"
                        }
                        type="text"
                        placeholder="Message"
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                message: event.target.value,
                            });
                        }}
                        value={formData.message}
                        required
                    />
                    <select
                        className="form__select"
                        value={formData.gender}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                gender: event.target.value,
                            })
                        }
                    >
                        <option value={"Mr"}>Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                    </select>
                    <input
                        className="form__input form__input--submit"
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
            {isValidFormData && (
                <SuccessfulPopup trigger={showPopup} setTrigger={setShowPopup} message={"The message was successfully sent."} />
            )}
        </div>
    );
}

export default Contacts;
