import { Link } from "react-router-dom";
import "./styles/Service.css";

const images = {
    group: require("../../img/group.png"),
};

function Service() {
    return (
        <div className="services">
            <div className="service__photo">
                <img src={images.group} alt="group" />
            </div>
			
            <div className="service__wrapper">
                <h2 className="service__heading--2">SERVICE WITH A SMILE</h2>
                <p className="service__paragraph">
                    Need help choosing the right products for your vehicle? Our
                    team of highly trained experts has the knowledge and passion
                    to help. Just pick up the phone and give us a ring. Or let's
                    chat via email. We love solving problems and lending a hand
                    (or an ear).
                </p>
                <Link className="service__btn" to={"/contacts"}>
                    Contact Us
                </Link>
            </div>
        </div>
    );
}

export default Service;
