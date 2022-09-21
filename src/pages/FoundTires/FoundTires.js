import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchService } from "../../services/search.service.js";
import { SizesService } from "../../services/sizes.service.js";
import DropDownFilterCategories from "../DropDownFilterCategories/DropDownFilterCategories.js";
import Models from "../Models/Models.js";
import Sidebar from "../Sidebar/Sidebar.js";

function FoundTires({isSidebarOpen, setIsSidebarOpen}) {
    const { pathname, search } = useLocation();
    const [models, setModels] = useState([]);
    const [dropDownCategory, setDropDownCategory] = useState("");
    const [messageAlert, setMessageAlert] = useState({});
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [dropDownCriteria, setDropDownCriteria] = useState("category");
    const [priceCriteria, setPriceCriteria] = useState({
        minPrice: 0,
        maxPrice: 383.99,
    });
    const [speedIndexCriteria, setSpeedIndexCriteria] = useState({
        L: false,
        M: false,
        N: false,
        P: false,
        Q: false,
        R: false,
        S: false,
        T: false,
        U: false,
        H: false,
        V: false,
        W: false,
        Y: false,
    });

    const [loadIndexCriteria, setLoadIndexCriteria] = useState({
        80: false,
        81: false,
        82: false,
        83: false,
        84: false,
        85: false,
        86: false,
        87: false,
        88: false,
        89: false,
        90: false,
        91: false,
        92: false,
        93: false,
        94: false,
        95: false,
        96: false,
        97: false,
        98: false,
        99: false,
        100: false,
        101: false,
        102: false,
        103: false,
        104: false,
        105: false,
        106: false,
        107: false,
        108: false,
        109: false,
        110: false,
        111: false,
        112: false,
        113: false,
        114: false,
        115: false,
        116: false,
        117: false,
        118: false,
        119: false,
        120: false,
        121: false,
        122: false,
        123: false,
        124: false,
        125: false,
    });

    const [widht, setWidth] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [diameter, setDiameter] = useState(undefined);
    const [manufacturer, setManufacturer] = useState(undefined);
    const [word, setWord] = useState("");

    const [seasonCriteria, setSeasonCriteria] = useState({
        Summer: false,
        Winter: false,
        "All - Season": false,
    });

    const [carTypeCriteria, setCarTypeCriteria] = useState({
        Car: false,
        SUV: false,
    });
    const [modelQuantity, setModelQuantity] = useState([]);

    function splitParams(params) {
        const w = params[0].split("=")[1];
        const h = params[1].split("=")[1];
        const d = params[2].split("=")[1];
        const s =
            params[3].split("=")[1] === "no" ? "" : params[3].split("=")[1];
        const m =
            params[4].split("=")[1] === "no" ? "" : params[4].split("=")[1];

        setWidth(w);
        setHeight(h);
        setDiameter(d);
        setManufacturer(m);

        return { w, h, d, s, m };
    }

    function capitalizeModelName(manufacturerName, modelName) {
        if (modelName) {
            const name = modelName
                .split(" ")
                .map((name) => {
                    return name[0].toUpperCase() + name.slice(1);
                })
                .join(" ");
            setWord(name);
            return;
        }

        if (manufacturerName !== "no") {
            const name = manufacturerName
                .split(" ")
                .map((name) => {
                    return name[0].toUpperCase() + name.slice(1);
                })
                .join(" ");

            setWord(name);
        }
    }

    useEffect(() => {
        const searched = search.slice(1).split("&");
        const lastPath = pathname.split("/").slice(1)[1];

        if (lastPath === "sizes") {
            const sizesService = new SizesService();
            const { w, h, d, s, m } = splitParams(searched);

            (async () => {
                await sizesService.getModelSizes(w, h, d, s, m).then((data) => {
                    if (!Array.isArray(data) || data.length === 0) {
                        setMessageAlert(data);
                        return;
                    }

                    setModels(data);
                });
            })();
        }

        if (lastPath === "models") {
            const searchService = new SearchService();
            const manufacturerName = searched[0].split("=")[1];
            const modelName = searched[1].split("=")[1].split("%20").join(" ");
            capitalizeModelName(modelName);

            (async () => {
                searchService
                    .searchModelByName(manufacturerName, modelName)
                    .then((data) => {

                        if (!Array.isArray(data)) {
                            setMessageAlert(data);
                            setModels([]);
                            return;
                        }

                        setModels(data);
                    });
            })();
        }
    }, [pathname, search, manufacturer]);

    useEffect(() => {
        const res = models.map((model) => {
            return { id: model.id, quantity: 4 };
        });

        setModelQuantity(res);
    }, [pathname, search, manufacturer, models]);

    return (
        <div className="manufacturerModels">
            <DropDownFilterCategories
                isActiveDropdown={isActiveDropdown}
                setIsActiveDropdown={setIsActiveDropdown}
                dropDownCategory={dropDownCategory}
                setDropDownCategory={setDropDownCategory}
                setDropDownCriteria={setDropDownCriteria}
                widht={widht}
                height={height}
                diameter={diameter}
                lastPath={pathname.split("/").slice(1)[1]}
                searchedWord={word}
            />
            <div className="content">
                <Sidebar
                    models={models}
                    speedIndexCriteria={speedIndexCriteria}
                    setSpeedIndexCriteria={setSpeedIndexCriteria}
                    loadIndexCriteria={loadIndexCriteria}
                    setLoadIndexCriteria={setLoadIndexCriteria}
                    seasonCriteria={seasonCriteria}
                    setSeasonCriteria={setSeasonCriteria}
                    carTypeCriteria={carTypeCriteria}
                    setCarTypeCriteria={setCarTypeCriteria}
                    priceCriteria={priceCriteria}
                    setPriceCriteria={setPriceCriteria}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Models
                    models={models}
                    speedIndexCriteria={speedIndexCriteria}
                    loadIndexCriteria={loadIndexCriteria}
                    seasonCriteria={seasonCriteria}
                    carTypeCriteria={carTypeCriteria}
                    priceCriteria={priceCriteria}
                    dropDownCriteria={dropDownCriteria}
                    messageAlert={messageAlert}
                    modelQuantity={modelQuantity}
                    setModelQuantity={setModelQuantity}
                />
            </div>
        </div>
    );
}

export default FoundTires;
