import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Search.css";
const images = {
    tirerack: require("../../img/tirerack.png"),
    callCenter: require("../../img/call-center.jpg"),
};

function Search() {
    const availableWidths = [
        185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 295, 285, 305, 315,
        335, 325, 345, 355,
    ];
    const availableHeights = [
        25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    ];
    const availableDiameters = [15, 16, 17, 18, 19, 20, 21, 22];
    const availableSeasons = ["Summer", "Winter", "All - Season"];
    const availableBrands = [
        "Michelin",
        "Continental",
        "Yokohama",
        "Goodyear",
        "Bridgestone",
        "Cooper",
        "Pirelli",
        "Hankook",
        "Firestone",
        "General",
    ];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        width: 0,
        height: 0,
        diameter: 0,
        season: "",
        brand: "",
    });
    const [validFormData, setValidFormData] = useState({
        width: false,
        height: false,
        diameter: false,
    });

    function submitHandler(event) {
        event.preventDefault();

        if (validFormData.width && validFormData.height && validFormData.diameter) {
            navigate({
                pathname: "sizes",
                search: `width=${formData.width}&height=${
                    formData.height
                }&diameter=${formData.diameter}&season=${
                    formData.season === "" ? "no" : formData.season
                }&manufacturer=${
                    formData.brand === "" ? "no" : formData.brand
                }`,
            });
        }
    }

    return (
        <div className="search">
            <div className="information">
                <img
                    className="information__img"
                    src={images.callCenter}
                    alt="Call Center"
                />

                <h1 className="information__heading--1">
                    Here you can find the tires you need
                </h1>

                <p className="information__paragraph">
                    If you have a problem or you don't know which tire or brand
                    is right for you, please contact us or direct call to our
                    customer service. We'll be always online.
                </p>

                <h3 className="information__heading--3">
                    Customer Service: 888-981-3953
                </h3>
            </div>

            <form onSubmit={submitHandler} className="form" name="form">
                <div className="form__info">
                    <label className="label label__size" htmlFor="titel">
                        Tire Size
                    </label>
                    <p className="form__info--paragraph">
                        Where do I find my tire size?
                    </p>
                    <img
                        className="form__info--img"
                        src={images.tirerack}
                        alt="Size helper"
                    />
                </div>

                <div className="label__wrapper">
                    <label className="label label__width" htmlFor="width">
                        Width <span>*</span>
                    </label>

                    <label className="label label__height" htmlFor="height">
                        Height <span>*</span>
                    </label>

                    <label className="label label__diameter" htmlFor="diameter">
                        Diameter <span>*</span>
                    </label>
                </div>

                <div className="form__selector">
                    <div className="form__selector--dropdown">
                        <select
                            name="width"
                            className="dropdown dropdown__width"
                            value={formData.width}
                            onChange={(event) => {
                                const currValue = Number(event.target.value);
                                setFormData({
                                    ...formData,
                                    width: currValue,
                                });
                                setValidFormData({
                                    ...validFormData,
                                    width: currValue > 0 ? true : false,
                                });
                            }}
                        >
                            <option
                                className="option option__width"
                                defaultChecked={"width"}
                            >
                                - - - - -
                            </option>
                            {availableWidths.map((w) => {
                                return (
                                    <option
                                        className="option option__width"
                                        value={w}
                                        defaultValue={"185"}
                                        key={w}
                                    >
                                        {w}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            name="height"
                            className="dropdown dropdown__height"
                            value={formData.height}
                            onChange={(event) => {
                                const currValue = Number(event.target.value);
                                setFormData({
                                    ...formData,
                                    height: currValue,
                                });
                                setValidFormData({
                                    ...validFormData,
                                    height: currValue > 0 ? true : false,
                                });
                            }}

                            required
                        >
                            <option
                                className="option option__height"
                                value='0'
                            >
                                - - - - -
                            </option>
                            {availableHeights.map((h) => {
                                return (
                                    <option
                                        className="option option__height"
                                        value={h}
                                        key={h}
                                        defaultValue={"55"}
                                    >
                                        {h}
                                    </option>
                                );
                            })}
                        </select>
                        <select
                            name="diameter"
                            className="dropdown dropdown__diameter"
                            value={formData.diameter}
                            onChange={(event) => {
                                const currValue = Number(event.target.value);
                                setFormData({
                                    ...formData,
                                    diameter: currValue,
                                });
                                setValidFormData({
                                    ...validFormData,
                                    diameter: currValue > 0 ? true : false,
                                });
                            }}
                        >
                            <option
                                className="option option__diameter"
                                defaultChecked={"diameter"}
                            >
                                - - - - -
                            </option>
                            {availableDiameters.map((d) => {
                                return (
                                    <option
                                        className="option option__diameter"
                                        value={d}
                                        key={d}
                                        defaultValue={"15"}
                                    >
                                        {d}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <label className="label label__season" htmlFor="season">
                        Seasons
                    </label>
                    <label className="label label__brand" htmlFor="brand">
                        Brand
                    </label>

                    <div className="additional">
                        <select
                            name="season"
                            className="dropdown dropdown__season"
                            value={formData.season}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    season: event.target.value,
                                })
                            }
                        >
                            <option
                                className="option option__season"
                                defaultChecked={"season"}
                            >
                                -- Select --
                            </option>
                            {availableSeasons.map((s) => {
                                return (
                                    <option
                                        className="option option__season"
                                        value={s}
                                        key={s}
                                    >
                                        {s}
                                    </option>
                                );
                            })}
                        </select>{" "}
                        <select
                            name="brand"
                            className="dropdown dropdown__brand"
                            value={formData.brand}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    brand: event.target.value,
                                })
                            }
                        >
                            <option
                                className="option option__brand"
                                defaultChecked={"brand"}
                            >
                                -- Select --
                            </option>
                            {availableBrands.map((m) => {
                                return (
                                    <option
                                        className="option option__brand"
                                        value={m}
                                        key={m}
                                    >
                                        {m}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="find">
                    <button className="find__btn">Search</button>
                </div>
            </form>
        </div>
    );
}

export default Search;
