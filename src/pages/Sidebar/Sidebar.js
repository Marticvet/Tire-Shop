import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import "./styles/Sidebar.css";
import HiddenSidebar from "./HiddenSidebar.js";
import VisibleSidebar from "./VisibleSidebar.js";

const sidebarVariant = {
    hidden: {
        opacity: 0,
        x: "-100vw",
        transition: { type: "tween", duration: 1 },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "tween", duration: 0.5 },
    },
    exit: {
        opacity: 0,
        x: "-100vw",
        transition: { type: "tween", duration: 1 },
    },
};

function Sidebar({
    priceCriteria,
    setPriceCriteria,
    models,
    speedIndexCriteria,
    setSpeedIndexCriteria,
    loadIndexCriteria,
    setLoadIndexCriteria,
    seasonCriteria,
    setSeasonCriteria,
    carTypeCriteria,
    setCarTypeCriteria,
    isSidebarOpen,
    setIsSidebarOpen,
}) {
    const [isActivePriceBtn, setIsActivePriceBtn] = useState(true);
    const [isActiveLoadBtn, setIsActiveLoadBtn] = useState(false);
    const [isActiveSpeedBtn, setIsActiveSpeedBtn] = useState(false);
    const [isActiveSeasonBtn, setIsActiveSeasonBtn] = useState(false);
    const [isActiveTypeBtn, setIsActiveTypeBtn] = useState(false);
    const speedIndexes = [
        "L: 120",
        "M: 130",
        "N: 140",
        "P: 150",
        "Q: 160",
        "R: 170",
        "S: 180",
        "T: 190",
        "U: 200",
        "H: 210",
        "V: 240",
        "W: 270",
        "Y: 300",
    ];
    const seasons = ["Summer", "Winter", "All-Season"];
    const carTypes = ["Car", "SUV"];

    const availableSpeedIndex = [];

    models.forEach((model) => {
        if (!availableSpeedIndex.includes(model.tire_speed_rating)) {
            availableSpeedIndex.push(model.tire_speed_rating);
        }
    });

    const [mQuery, setMQuery] = useState({
        matches: window.innerWidth < 800 ? true : false,
    });

    useEffect(() => {
        let mediaQuery = window.matchMedia("(max-width: 800px)");
        mediaQuery.addListener(setMQuery);

        if (!mQuery.matches && isSidebarOpen) {
            setIsSidebarOpen(false);
            setIsActivePriceBtn(true);
            setIsActiveLoadBtn(false);
            setIsActiveSpeedBtn(false);
            setIsActiveSeasonBtn(false);
            setIsActiveTypeBtn(false);
        }
        // this is the cleanup function to remove the listener
        return () => mediaQuery.removeListener(setMQuery);
    }, [isSidebarOpen, setIsSidebarOpen, mQuery]);

    return (
        <AnimatePresence>
            <motion.div className={mQuery.matches ? "hamburger" : "sidenav"}>
                {mQuery.matches && !isSidebarOpen && (
                    <div
                        className="hamburger__sidenav"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                )}

                {!mQuery.matches && !isSidebarOpen && (
                    <VisibleSidebar
                        isActivePriceBtn={isActivePriceBtn}
                        setIsActivePriceBtn={setIsActivePriceBtn}
                        isActiveSpeedBtn={isActiveSpeedBtn}
                        setIsActiveSpeedBtn={setIsActiveSpeedBtn}
                        priceCriteria={priceCriteria}
                        setPriceCriteria={setPriceCriteria}
                        speedIndexes={speedIndexes}
                        speedIndexCriteria={speedIndexCriteria}
                        setSpeedIndexCriteria={setSpeedIndexCriteria}
                        availableSpeedIndex={availableSpeedIndex}
                        isActiveLoadBtn={isActiveLoadBtn}
                        setIsActiveLoadBtn={setIsActiveLoadBtn}
                        models={models}
                        loadIndexCriteria={loadIndexCriteria}
                        setLoadIndexCriteria={setLoadIndexCriteria}
                        isActiveSeasonBtn={isActiveSeasonBtn}
                        setIsActiveSeasonBtn={setIsActiveSeasonBtn}
                        seasons={seasons}
                        seasonCriteria={seasonCriteria}
                        setSeasonCriteria={setSeasonCriteria}
                        isActiveTypeBtn={isActiveTypeBtn}
                        setIsActiveTypeBtn={setIsActiveTypeBtn}
                        carTypes={carTypes}
                        carTypeCriteria={carTypeCriteria}
                        setCarTypeCriteria={setCarTypeCriteria}
                    />
                )}

                {mQuery.matches && isSidebarOpen && (
                    <HiddenSidebar
                        sidebarVariant={sidebarVariant}
                        setOpen={setIsSidebarOpen}
                        isActivePriceBtn={isActivePriceBtn}
                        setIsActivePriceBtn={setIsActivePriceBtn}
                        isActiveSpeedBtn={isActiveSpeedBtn}
                        setIsActiveSpeedBtn={setIsActiveSpeedBtn}
                        priceCriteria={priceCriteria}
                        setPriceCriteria={setPriceCriteria}
                        speedIndexes={speedIndexes}
                        speedIndexCriteria={speedIndexCriteria}
                        setSpeedIndexCriteria={setSpeedIndexCriteria}
                        availableSpeedIndex={availableSpeedIndex}
                        isActiveLoadBtn={isActiveLoadBtn}
                        setIsActiveLoadBtn={setIsActiveLoadBtn}
                        models={models}
                        loadIndexCriteria={loadIndexCriteria}
                        setLoadIndexCriteria={setLoadIndexCriteria}
                        isActiveSeasonBtn={isActiveSeasonBtn}
                        setIsActiveSeasonBtn={setIsActiveSeasonBtn}
                        seasons={seasons}
                        seasonCriteria={seasonCriteria}
                        setSeasonCriteria={setSeasonCriteria}
                        isActiveTypeBtn={isActiveTypeBtn}
                        setIsActiveTypeBtn={setIsActiveTypeBtn}
                        carTypes={carTypes}
                        carTypeCriteria={carTypeCriteria}
                        setCarTypeCriteria={setCarTypeCriteria}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}

export default Sidebar;
