import { useContext, useEffect, useState } from "react";
import AuthContext from "../../providers/authentication.js";
import { UsersService } from "../../services/users.service.js";
import { Link } from "react-router-dom";
import "./styles/Shopping-Cart.css";

function ShoppingCart() {
    const { user } = useContext(AuthContext);
    const [models, setModels] = useState([]);
    const [modelQuantity, setModelQuantity] = useState([]);

    useEffect(() => {
        const userService = new UsersService();

        (async () => {
            await userService.getUserCartItems(user.sub).then((data) => {
                if (!Array.isArray(data)) {
                    setModels([]);
                    return;
                }
                setModels(data);
            });
        })();
    }, [user.sub]);

    function changeQuantityHandler(id) {
        return async (event) => {
            const quantity = event.target.value;
            const userService = new UsersService();

            await userService
                .editItemQuantity(id, { quantity })
                .then(({ message, item }) => {
                    if (message.includes("Successfully")) {
                        const updatedModels = models.map((model) =>
                            model.id === item.id ? item : model
                        );
                        setModels(updatedModels);
                        return;
                    }
                });
        };
    }

    function deleteItemHandler(id) {
        return async () => {
            const userService = new UsersService();
            const confirmation = window.confirm(
                "Are you sure you want to delete?"
            );

            if (confirmation) {
                await userService
                    .deleteItemInShoppingCart(id)
                    .then(({ status }) => {
                        if (status === 204) {
                            const deletedModel = models.filter(
                                (model) => model.id !== id
                            );
                            setModels(deletedModel);
                            return;
                        }
                    });
            }
        };
    }

    useEffect(() => {
        const res = models.map((model) => {
            return { id: model.id, quantity: model.quantity };
        });

        setModelQuantity(res);
    }, [models]);

    const totalPrice = models.reduce((prev, current) => {
        return prev + Number(current.tire_price * current.quantity);
    }, 0);

    const totalQuantity = models.reduce((prev, current) => {
        return prev + Number(current.quantity);
    }, 0);

    return (
        <div className="shoppingCart">
            <div className="shoppingCart__header">
                <h3 className="shoppingCart__header--heading">SHOPPING CART</h3>
                <p className="shoppingCart__header--paragraph">
                    Confirm your items, delivery & installation method, total
                    cost, then proceed.
                </p>
            </div>

            <div className={models.length > 0 ? "content" : null}>
                {models.length > 0 && (
                    <div className="sideBar">
                        <span className="sidebar__subtotal">
                            Subtotal ({totalQuantity} items):{" "}
                            <b>${totalPrice.toFixed(2)}</b>
                        </span>

                        <button
                            onClick={() => {
                                window.alert(
                                    "Our developers're working on this functionality. Please Try later!"
                                );

                                return;
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}

                <div
                    className={models.length > 0 ? "manufacturer" : "nomodels"}
                >
                    {models.length > 0 ? (
                        [...models].reverse().map((model) => {
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
                                    key={index}
                                >
                                    <div className="image__container">
                                        <Link
                                            to={`/tires/manufacturers/${model.manufacturer_name}/tire-model/${model.tire_id}`}
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
                                            to={`/tires/manufacturers/${model.manufacturer_name}/tire-model/${model.tire_id}`}
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
                                            <span>Car Type:</span>{" "}
                                            {model.car_type}
                                        </p>
                                    </div>

                                    <div className="price__info">
                                        <span>Total Price:</span>
                                        <h2 className="price__info--totalPrice">
                                            $
                                            {(
                                                model.tire_price *
                                                modelQuantity[index].quantity
                                            ).toFixed(2)}
                                        </h2>

                                        <span>Per Tire:</span>
                                        <h2 className="price__info--price">
                                            ${model.tire_price}
                                        </h2>
                                        <p className="price__info--availability">
                                            Availability:{" "}
                                            {model.tire_quantity > 0
                                                ? "In stock"
                                                : "Out of Stock"}
                                        </p>
                                        <button
                                            className="price__info--btn"
                                            onClick={deleteItemHandler(
                                                model.id
                                            )}
                                        >
                                            Delete Item
                                        </button>

                                        <select
                                            className="price__info--quantity"
                                            defaultValue={model.quantity}
                                            onChange={changeQuantityHandler(
                                                model.id
                                            )}
                                        >
                                            <option value="1">Qty: 1</option>
                                            <option value="2">Qty: 2</option>
                                            <option value="3">Qty: 3</option>
                                            <option value="4">Qty: 4</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h1>Your shopping cart is empty!</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
