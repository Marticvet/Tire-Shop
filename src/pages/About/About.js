import "./styles/About.css";

const images = {
    workshop: require("../../img/tire-storage.jpg"),
    tires: require("../../img/tires.jpg"),
    manager: require("../../img/manager.jpg"),
    meeting: require("../../img/meeting.jpg"),
    orders: require("../../img/order-worker.jpg"),
    call: require("../../img/call-worker.jpg"),
    ceo: require("../../img/ceo1.jpg"),
};

function About() {
    return (
        <div className="about">
            <img
                className="workshop__img"
                src={images.workshop}
                alt="Our workshop"
            />

            <div className="information">
                <div className="information__expert">
                    <h1 className="information__expert--heading">
                        The Tire expert
                    </h1>
                    <p className="information__expert--paragraph">
                        Tire Shop is Germany's multi-channel specialist offering
                        a wide range of tyres. In addition to the tireshop.com
                        online shop, we have 37 branches in Germany and a total
                        of 3,750 assembly partners for additional services. Tire
                        Shop is active in France, Austria, Italy, Switzerland
                        and Denmark, each with their own additional shop and
                        over 4,160 cooperating assembly partners. Our product
                        range includes tyres for cars, motorcycles, off-road and
                        transport vehicles and bicycles, as well as rims,
                        complete wheels and accessories.
                    </p>
                </div>
                <img
                    className="information__img"
                    src={images.tires}
                    alt="Tires"
                />
            </div>

            <div className="workers">
                <img className="workers__images" src={images.manager} alt="" />
                <img className="workers__images" src={images.meeting} alt="" />
                <img className="workers__images" src={images.orders} alt="" />
                <img className="workers__images" src={images.call} alt="" />
            </div>

            <div className="ceo">
                <img className="ceo__img" src={images.ceo} alt="" />

                <div className="ceo__information">
                    <h1 className="ceo__information--heading">Michael Härle – Managing Director:</h1>
                    <p className="ceo__information--paragraph">
                        "We at reifencom GmbH set the standard. With its diverse
                        and wide range of products, reifen.com is a powerful
                        partner. We undertake to adhere to the highest standards
                        and we stand for thorough, collaborative work."
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
