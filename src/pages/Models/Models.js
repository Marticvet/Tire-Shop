import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../providers/authentication.js";
import { UsersService } from "../../services/users.service.js";
import "./styles/Manufacturer-Models.css";
import "./styles/Models.css";

function Models({
    models,
    dropDownCriteria,
    speedIndexCriteria,
    loadIndexCriteria,
    seasonCriteria,
    carTypeCriteria,
    priceCriteria,
    messageAlert,
    setOpenNavbar,
    modelQuantity,
    setModelQuantity,
}) {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(AuthContext);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(4);
    const copiedModels = models.map((model) => {
        return { ...model };
    });

    useEffect(() => {
        if (addedToCart && isLoggedIn) {
            const userService = new UsersService();

            const item = JSON.parse(sessionStorage.getItem("item"));
            item.user_id = user.sub;

            (async () => {
                await userService
                    .addItemInShoppingCart(item)
                    .then(({ message }) => {
                        if (message.includes("Successfully")) {
                            navigate("/shopping_cart");
                            sessionStorage.clear();
                        }
                    });
            })();

            return;
        }
    }, [addedToCart, navigate, isLoggedIn, user]);

    function sortingSystem(a, b) {
        if (dropDownCriteria === "category") {
            return a.tire_model_id - b.tire_model_id;
        } else if (dropDownCriteria === "asc") {
            return a.tire_price - b.tire_price;
        } else if (dropDownCriteria === "desc") {
            return b.tire_price - a.tire_price;
        } else if (dropDownCriteria === "aphabeticaly") {
            return a.model_name.localeCompare(b.model_name);
        } else if (dropDownCriteria === "reverseAlphabeticaly") {
            return b.model_name.localeCompare(a.model_name);
        }
    }

    function addItemHandler(id) {
        return async () => {
            const userService = new UsersService();

            const item = {
                quantity,
                tire_id: id,
            };

            if (isLoggedIn) {
                item.user_id = user.sub;

                await userService
                    .addItemInShoppingCart(item)
                    .then(({ message }) => {
                        if (message.includes("Successfully")) {
                            navigate("/shopping_cart");
                            sessionStorage.clear();
                        }
                    });

                return;
            }

            setOpenNavbar(true);
            setAddedToCart(true);
            sessionStorage.setItem("item", JSON.stringify(item));
        };
    }

    const availableSpeedIndex = [];

    models.forEach((model) => {
        if (!availableSpeedIndex.includes(model.tire_speed_rating)) {
            availableSpeedIndex.push(model.tire_speed_rating);
        }
    });

    function updateQuantity(id, currQuantity) {
        const newState = modelQuantity.map((model) => {
            if (model.id === id) {
                return { ...model, quantity: currQuantity };
            }

            return model;
        });

        setModelQuantity(newState);
    }

    return (
        <div className={copiedModels.length > 0 ? "manufacturer" : "nomodels"}>
            {copiedModels.length > 0 ? (
                copiedModels
                    .sort(sortingSystem)
                    .filter(
                        ({ tire_speed_rating }) =>
                            speedIndexCriteria[tire_speed_rating] ||
                            !Object.values(speedIndexCriteria).includes(true)
                    )
                    .filter(
                        ({ tire_load_index }) =>
                            loadIndexCriteria[tire_load_index] ||
                            !Object.values(loadIndexCriteria).includes(true)
                    )
                    .filter(
                        ({ tire_season }) =>
                            seasonCriteria[tire_season] ||
                            !Object.values(seasonCriteria).includes(true)
                    )
                    .filter(
                        ({ car_type }) =>
                            carTypeCriteria[car_type] ||
                            !Object.values(carTypeCriteria).includes(true)
                    )
                    .filter(
                        ({ tire_price }) =>
                            priceCriteria.minPrice <= tire_price &&
                            tire_price <= priceCriteria.maxPrice
                    )
                    .map((model) => {
                        const index = modelQuantity.findIndex((m) => {
                            if (model.id === m.id) {
                                return m;
                            }

                            return null;
                        });

                        if (index === -1) {
                            return null;
                        }

                        return (
                            <div
                                className="manufacturer__models"
                                key={model.id}
                            >
                                <div className="image__container">
                                    <Link
                                        to={`/tires/manufacturers/${model.manufacturer_name}/tire-model/${model.id}`}
                                    >
                                        <img
                                            src={model.model_imageUrl}
                                            alt={model.modelName}
                                            className="image__container--img"
                                        />
                                    </Link>
                                </div>

                                <div className="model__info">
                                    <Link
                                        to={`/tires/manufacturers/${model.manufacturer_name}/tire-model/${model.id}`}
                                        className="font-size model__info--link"
                                    >
                                        {model.manufacturer_name} <br />{" "}
                                        {model.model_name}
                                    </Link>
                                    <p className="model__info--size font-size">
                                        <span>Size:</span>{" "}
                                        {model.dimention_width +
                                            " " +
                                            model.dimention_height +
                                            " " +
                                            model.dimention_diameter}
                                    </p>
                                    <p className="model__info--season font-size">
                                        <span>Season:</span>
                                        {model.tire_season}
                                    </p>
                                    <p className="model__info--loadIndex font-size">
                                        <span>Load Index:</span>{" "}
                                        {model.tire_load_index}
                                    </p>
                                    <p className="model__info--speadRating font-size">
                                        <span>Speed Index:</span>{" "}
                                        {model.tire_speed_rating}
                                    </p>
                                    <p className="model__info--loudness font-size">
                                        <span>Loudness Level:</span>{" "}
                                        {model.tire_loudness_level} db
                                    </p>{" "}
                                    <p className="model__info--carType font-size">
                                        <span>Car Type:</span> {model.car_type}
                                    </p>
                                </div>

                                <div className="price__info">
                                    <span>Total Price:</span>
                                    <h2 className="price__info--totalPrice">
                                        $
                                        {(model.tire_price *
                                            modelQuantity[index].quantity).toFixed(2)}
                                    </h2>

                                    <span>Per Tire:</span>
                                    <h2 className="price__info--price">
                                        ${model.tire_price}
                                    </h2>
                                    <p className="price__info--availability">
                                        Availability:{" "}
                                        <b>
                                            {" "}
                                            {model.tire_quantity > 0
                                                ? "In stock"
                                                : "Out of Stock"}
                                        </b>
                                    </p>
                                    {model.tire_quantity > 0 && (
                                        <button
                                            className="price__info--btn"
                                            onClick={addItemHandler(model.id)}
                                        >
                                            &#128722; Add to Cart
                                        </button>
                                    )}
                                    {model.tire_quantity > 0 && (
                                        <select
                                            className="price__info--quantity"
                                            defaultValue={4}
                                            onChange={(event) => {
                                                const currQuantity = Number(
                                                    event.target.value
                                                );

                                                updateQuantity(
                                                    model.id,
                                                    currQuantity
                                                );
                                                setQuantity(currQuantity);
                                            }}
                                        >
                                            <option value="1">Qty: 1</option>
                                            <option value="2">Qty: 2</option>
                                            <option value="3">Qty: 3</option>
                                            <option value="4">Qty: 4</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        );
                    })
            ) : (
                <h1>{messageAlert !== undefined && messageAlert.message}</h1>
            )}
        </div>
    );
}

export default Models;
