import "./styles/Home.css";
import Service from "../Service/Service.js";
import Banner from "./Banner.js";
import Partners from "./Partners.js";

function Home () {
    return (
        <div className="home">
            <Banner />
            <Partners />
            <Service />
        </div>
    );
}

export default Home;
