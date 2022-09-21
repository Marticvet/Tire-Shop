import { Link } from "react-router-dom";

function Banner() {
    return (
        <div className="banner">
            <div className="banner__details">
                <h2 className="detail--heading-2">WE'LL HELP YOU GET THERE</h2>

                <p className="detail--paragraph">
                    The best selection, advice, and proper fit. Free tire Road
                    Hazard Protection with roadside assistance. Convenient
                    mobile tire installation service available in many areas.
                </p>

                <div className="banner__button--container">
                    <Link to={"/search"} className="btn btn__tires">
                        Find Tires
                    </Link>

                    <Link to={"/brands"} className="btn btn__products">
                        Find By Brands
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
