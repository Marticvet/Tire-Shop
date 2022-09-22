import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../providers/authentication.js";
import { SizesService } from "../../services/sizes.service.js";
import { ManufacturerService } from "../../services/tires.service.js";
import { UsersService } from "../../services/users.service.js";
import "./styles/Model.css";
import { RevolvingDot } from "react-loader-spinner";

const images = {
    michelin: require("../../img/michelin1-logo-vector.jpg"),
    bridgestone: require("../../img/bridgestone-logo1.jpg"),
    continental: require("../../img/continental-logo.png"),
    cooper: require("../../img/cooper-logo.png"),
    firestone: require("../../img/firestone-logo.png"),
    general: require("../../img/general-logo.jpg"),
    goodyear: require("../../img/goodyear_logo.png"),
    hankook: require("../../img/Hankook_logo.png"),
    pirelli: require("../../img/Logo_Pirelli.svg.png"),
    yokohama: require("../../img/Yokohama_logo.jpg"),
};

function Model({ setOpenNavbar }) {
    const navigate = useNavigate();
    const { manufacturer_name, tireId } = useParams();
    const [model, setModel] = useState({});
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableDiameters, setAvailableDiameters] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(4);
    const { user, isLoggedIn } = useContext(AuthContext);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isActive, setIsActive] = useState({
        description: true,
        sizes: false,
    });
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const manifacturerService = new ManufacturerService();
        const sizesService = new SizesService();

        Promise.all([
            manifacturerService.getManufacturerModelById(
                manufacturer_name,
                tireId
            ),
            sizesService.getSizesByModelId(model.tire_model_id),
        ])
            .then(([result1, result2]) => {
                setModel(result1[0]);
                setAvailableSizes(result2);
            })
            .catch((error) => console.log("error", error));
    }, [manufacturer_name, tireId, model.tire_model_id]);

    useEffect(() => {
        setSelectedSize(
            `${model.dimention_width}/${model.dimention_height}R${model.dimention_diameter} ${model.tire_load_index}${model.tire_speed_rating}`
        );

        availableSizes.forEach((s) => {
            if (!availableDiameters.includes(s.dimention_diameter)) {
                setAvailableDiameters([
                    ...availableDiameters,
                    s.dimention_diameter,
                ]);
            }
        });
    }, [model, availableSizes, availableDiameters]);

    useEffect(() => {
        setTimeout(
            () =>
                Object.keys(model).length > 0 ? setIsLoading(false) : setIsLoading(true),
            500
        );
    }, [model]);

    if (isLoading) {
        return (
            <div className="nomodel">
                <RevolvingDot
                    height="1000"
                    width="1000"
                    radius="60"
                    color="#4fa94d"
                    secondaryColor=""
                    ariaLabel="revolving-dot-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    const manufactrerName = model.manufacturer_name.toLowerCase().trim();

    async function addItemHandler() {
        const userService = new UsersService();

        const item = {
            quantity,
            tire_id: model.id,
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
    }

    return (
        <div className="model">
            <div className="product">
                <div className="product__img">
                    <img src={model.model_imageUrl} alt={model.model_name} />
                </div>

                <div className="product__details">
                    <img
                        className="product__details--img"
                        src={images[manufactrerName]}
                        alt={model.model_name}
                    />
                    <h4 className="product__details--heading-4">
                        {`${model.model_name} - Size: `}
                        {`${model.dimention_height}R${model.dimention_diameter}` !==
                        selectedSize
                            ? selectedSize
                            : `${model.dimention_height}R${model.dimention_diameter}`}
                    </h4>

                    <div className="details">
                        <div className="details__sizes">
                            <ul className="details__sizes--ul">
                                <li>
                                    Size:{" "}
                                    <span>{`${model.dimention_width}/${model.dimention_height}R${model.dimention_diameter}`}</span>
                                </li>
                                <li>
                                    Season: <span>{model.tire_season}</span>
                                </li>
                                <li>
                                    Load Index:{" "}
                                    <span>{model.tire_load_index}</span>
                                </li>
                                <li>
                                    Speed Index:{" "}
                                    <span>{model.tire_speed_rating}</span>
                                </li>{" "}
                                <li>
                                    Loudness Level:{" "}
                                    <span>{model.tire_loudness_level} db</span>
                                </li>
                                <li>
                                    Car Type: <span>{model.car_type}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="details__price">
                            <span>Total Price:</span>
                            <h2 className="details__price--totalPrice">
                                ${model.tire_price * quantity}
                            </h2>

                            <span>Per Tire:</span>
                            <h2 className="details__price--price">
                                ${model.tire_price}
                            </h2>

                            <p className="details__price--availability">
                                Availability:{" "}
                                <span>
                                    {" "}
                                    {model.tire_quantity > 0
                                        ? "In stock"
                                        : "Out of Stock"}
                                </span>
                            </p>
                            {model.tire_quantity > 0 && (
                                <button
                                    className="details__price--btn"
                                    onClick={addItemHandler}
                                >
                                    &#128722; Add to Cart
                                </button>
                            )}
                            {model.tire_quantity > 0 && (
                                <select
                                    className="details__price--quantity"
                                    defaultValue={4}
                                    onChange={(event) => {
                                        const currQuantity = Number(
                                            event.target.value
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
                </div>
            </div>

            <div className="information">
                <div className="information__choose">
                    <ul className="information__choose--buttons">
                        <li
                            onClick={() =>
                                isActive.description === true
                                    ? setIsActive({
                                          ...isActive,
                                          sizes: false,
                                      })
                                    : setIsActive({
                                          ...isActive,
                                          description: true,
                                          sizes: false,
                                      })
                            }
                            className={isActive.description ? "active" : ""}
                        >
                            Description
                        </li>
                        <li
                            onClick={() =>
                                isActive.sizes === true
                                    ? setIsActive({
                                          ...isActive,
                                          description: false,
                                      })
                                    : setIsActive({
                                          ...isActive,
                                          description: false,
                                          sizes: true,
                                      })
                            }
                            className={isActive.sizes ? "active" : ""}
                        >
                            Sizes
                        </li>
                    </ul>
                </div>

                <div className="information__content">
                    <div
                        className={
                            isActive.description
                                ? "information__content--description"
                                : "hidden"
                        }
                    >
                        {model.model_description
                            .split(/(?<=\.|!|\?)\s(?=[A-Z])/g)
                            .map((p, i) => {
                                if (p === "") {
                                    return null;
                                }

                                return (
                                    <p
                                        className="paragraph paragraph__description"
                                        key={i}
                                    >
                                        {p.trim()}
                                    </p>
                                );
                            })}
                    </div>
                    <div
                        className={
                            isActive.sizes
                                ? "information__content--sizes"
                                : "hidden"
                        }
                    >
                        <h1 className="information__content--sizes-heading">
                            Selected Size
                        </h1>
                        <p className="information__content--sizes-paragraph">
                            {selectedSize}
                        </p>
                        <h1 className="information__content--sizes-heading">
                            All Sizes
                        </h1>

                        {availableDiameters.sort().map((diameter, index) => {
                            return (
                                <div className="sizes" key={index}>
                                    <div className="sizes__wrapper">
                                        <h1>{diameter}</h1>
                                        <ul className="sizes__ul">
                                            {availableSizes.map((s, index) => {
                                                if (
                                                    diameter ===
                                                        s.dimention_diameter &&
                                                    index % 2 === 0
                                                ) {
                                                    return (
                                                        <Link
                                                            to={`/tires/manufacturers/${model.manufacturer_name}/tire-model/${s.id}`}
                                                            key={index}
                                                            className={
                                                                selectedSize ===
                                                                `${s.dimention_width}/${s.dimention_height}R${s.dimention_diameter} ${s.load_index}${s.speed_rating}`
                                                                    ? "sizes__ul--link-selected color-grey"
                                                                    : "sizes__ul--link color-grey"
                                                            }
                                                        >
                                                            <li>
                                                                {`${s.dimention_width}/${s.dimention_height}R${s.dimention_diameter}`}{" "}
                                                                <span>
                                                                    {
                                                                        s.load_index
                                                                    }
                                                                    {
                                                                        s.speed_rating
                                                                    }
                                                                </span>
                                                            </li>
                                                        </Link>
                                                    );
                                                } else if (
                                                    diameter ===
                                                    s.dimention_diameter
                                                ) {
                                                    return (
                                                        <Link
                                                            to={`/tires/manufacturers/${model.manufacturer_name}/tire-model/${s.id}`}
                                                            key={index}
                                                            className={
                                                                selectedSize ===
                                                                `${s.dimention_width}/${s.dimention_height}R${s.dimention_diameter} ${s.load_index}${s.speed_rating}`
                                                                    ? "sizes__ul--link-selected"
                                                                    : "sizes__ul--link"
                                                            }
                                                        >
                                                            <li>
                                                                {`${s.dimention_width}/${s.dimention_height}R${s.dimention_diameter}`}{" "}
                                                                <span>
                                                                    {
                                                                        s.load_index
                                                                    }
                                                                    {
                                                                        s.speed_rating
                                                                    }
                                                                </span>
                                                            </li>
                                                        </Link>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Model;
