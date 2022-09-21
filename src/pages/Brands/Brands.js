import { Link } from "react-router-dom";
import "./styles/Brands.css";

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
    logo: require("../../img/Tire Shop-logos_transparent.png"),
};

function Brands() {
    const brands = [
        "michelin",
        "bridgestone",
        "continental",
        "cooper",
        "firestone",
        "general",
        "goodyear",
        "hankook",
        "pirelli",
        "yokohama",
    ];

    return (
        <div className="brands">
            <div className="partners">
                <div className="partners__info">
                    <h2 className="heading heading--2">
                        You have a wide selection of the best tire
                        manufacturers in the world
                    </h2>
                    <p className="paragraph">
                        Our priority is that our customers are first and
                        foremost satisfied with the products we offer. We have
                        proven ourselves over time and for the last 10 years
                        have been number one in Europe. We focus on quality, not
                        quantity, and we try to satisfy all the needs of our
                        customers and especially their cars, so that they can
                        travel calmly and safely. Тhat's exactly why we've
                        chosen to work with these time-proven tire
                        manufacturers.
                    </p>
                </div>
                <div className="partners__logo">
                    <img
                        className="partners__logo--img"
                        src={images.logo}
                        alt=""
                    />
                </div>
            </div>

            <div className="gallery">
                {brands.map((brand, index) => {
                    return (
                        <Link
                            to={`/tires/manufacturers/${brand}/tire-models`}
                            className={`gallery__item gallery__item--${index + 1} custom__height`}
                            key={index}
                        >
                            <img
                                className="gallery__img"
                                src={images[brand]}
                                alt={`${
                                    brand[0].toUpperCase() + brand.slice(1)
                                } Logo`}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Brands;
