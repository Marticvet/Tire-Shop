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

function Partners() {
    return (
        <div className="gallery">
            <div className=" gallery__container">
                <h1 className="gallery__heading-1">Our Partners</h1>
                <p className="gallery__paragraph">
                    We're working with 10 of the best Tire Brands in the World.
                </p>
            </div>

            <div className="gallery__item gallery__item--1">
                <img
                    className="gallery__img"
                    src={images.michelin}
                    alt="Michelin Logo"
                />
            </div>

            <div className="gallery__item gallery__item--2">
                <img
                    className="gallery__img"
                    src={images.bridgestone}
                    alt="Bridgestone Logo"
                />
            </div>

            <div className="gallery__item gallery__item--3 custom__height">
                <img
                    className="gallery__img"
                    src={images.continental}
                    alt="Continental Logo"
                />
            </div>

            <div className="gallery__item gallery__item--4 custom__height">
                <img
                    className="gallery__img"
                    src={images.cooper}
                    alt="Cooper Logo"
                />
            </div>

            <div className="gallery__item gallery__item--5 custom__height custom__width">
                <img
                    className="gallery__img"
                    src={images.firestone}
                    alt="Firestone Logo"
                />
            </div>

            <div className="gallery__item gallery__item--6 custom__height">
                <img
                    className="gallery__img"
                    src={images.general}
                    alt="General Logo"
                />
            </div>

            <div className="gallery__item gallery__item--7 custom__height custom__width">
                <img
                    className="gallery__img"
                    src={images.goodyear}
                    alt="Goodyear Logo"
                />
            </div>

            <div className="gallery__item gallery__item--8 custom__height custom__width">
                <img
                    className="gallery__img"
                    src={images.hankook}
                    alt="Hankook Logo"
                />
            </div>

            <div className="gallery__item gallery__item--9 custom__height custom__width">
                <img
                    className="gallery__img"
                    src={images.pirelli}
                    alt="Pirelli Logo"
                />
            </div>

            <div className="gallery__item gallery__item--10 custom__height custom__width">
                <img
                    className="gallery__img"
                    src={images.yokohama}
                    alt="Yokohama Logo"
                />
            </div>
        </div>
    );
}

export default Partners;
