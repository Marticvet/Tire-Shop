import { Link } from "react-router-dom";

function VisibleSidebar({
    isActivePriceBtn,
    setIsActivePriceBtn,
    isActiveSpeedBtn,
    setIsActiveSpeedBtn,
    priceCriteria,
    setPriceCriteria,
    speedIndexes,
    speedIndexCriteria,
    setSpeedIndexCriteria,
    availableSpeedIndex,
    isActiveLoadBtn,
    setIsActiveLoadBtn,
    models,
    loadIndexCriteria,
    setLoadIndexCriteria,
    isActiveSeasonBtn,
    setIsActiveSeasonBtn,
    seasons,
    seasonCriteria,
    setSeasonCriteria,
    isActiveTypeBtn,
    setIsActiveTypeBtn,
    carTypes,
    carTypeCriteria,
    setCarTypeCriteria,
}) {
    const availableLoadIndexes = [];

    return (
        <>
            <h2 className="sidenav__heading-2">Filter By</h2>

            <ul className="sidenav__ul">
                <li className="list list__wrapper">
                    <Link
                        to={"/"}
                        className="list__wrapper--link"
                        onClick={(event) => {
                            event.preventDefault();
                            isActivePriceBtn
                                ? setIsActivePriceBtn(false)
                                : setIsActivePriceBtn(true);
                        }}
                    >
                        Price{" "}
                        <span
                            style={
                                isActivePriceBtn
                                    ? {
                                          transform: "rotate(180deg)",
                                      }
                                    : null
                            }
                        >
                            &#9660;
                        </span>
                    </Link>

                    <ul
                        className={
                            isActivePriceBtn
                                ? "list__price--dropdown active"
                                : "list__price--dropdown"
                        }
                    >
                        <input
                            type="text"
                            name="startPrice"
                            placeholder="$0"
                            className="list__price--dropdown-input"
                            onChange={(event) => {
                                setPriceCriteria({
                                    ...priceCriteria,
                                    minPrice: Number(event.target.value),
                                });
                            }}
                        />
                        <span>to</span>

                        <input
                            type="text"
                            name="endPrice"
                            placeholder="$383.99"
                            className="list__price--dropdown-input"
                            onChange={(event) => {
                                if (
                                    Number(event.target.value) !==
                                    priceCriteria.maxPrice
                                ) {
                                    setPriceCriteria({
                                        ...priceCriteria,
                                        maxPrice: Number(event.target.value),
                                    });
                                }

                                if (event.target.value.length === 0) {
                                    setPriceCriteria({
                                        ...priceCriteria,
                                        maxPrice: 383.99,
                                    });
                                }
                            }}
                        />
                        {/* <Link to="#" className="list__price--dropdown-arrowBtn">
&#9654;
</Link> */}
                    </ul>
                </li>

                <li className="list list__wrapper">
                    <Link
                        to="#"
                        className="list__wrapper--link"
                        onClick={(event) => {
                            event.preventDefault();
                            isActiveSpeedBtn
                                ? setIsActiveSpeedBtn(false)
                                : setIsActiveSpeedBtn(true);
                        }}
                    >
                        Speed Index{" "}
                        <span
                            style={
                                isActiveSpeedBtn
                                    ? {
                                          transform: "rotate(180deg)",
                                      }
                                    : null
                            }
                        >
                            &#9660;
                        </span>
                    </Link>
                    <ul
                        className={
                            isActiveSpeedBtn
                                ? "list__speedIndex--dropdown active"
                                : "list__speedIndex--dropdown"
                        }
                    >
                        <div className="list__speedIndex--wrapper">
                            {speedIndexes.map((index) => {
                                const currentLetter = index.split(": ")[0];

                                return (
                                    <button
                                        className={`${
                                            speedIndexCriteria[
                                                currentLetter
                                            ] === true
                                                ? "list__speedIndex--wrapper-btn active__speedIndex"
                                                : "list__speedIndex--wrapper-btn"
                                        }
            ${
                !availableSpeedIndex.includes(currentLetter)
                    ? "list__speedIndex--wrapper-btn unavailable"
                    : "list__speedIndex--wrapper-btn"
            }
            `}
                                        disabled={
                                            !availableSpeedIndex.includes(
                                                currentLetter
                                            )
                                        }
                                        key={index}
                                        onClick={() => {
                                            speedIndexCriteria[
                                                currentLetter
                                            ] === true
                                                ? setSpeedIndexCriteria({
                                                      ...speedIndexCriteria,
                                                      [currentLetter]: false,
                                                  })
                                                : setSpeedIndexCriteria({
                                                      ...speedIndexCriteria,
                                                      [currentLetter]: true,
                                                  });
                                        }}
                                    >
                                        {index}
                                    </button>
                                );
                            })}
                        </div>
                    </ul>
                </li>

                <li className="list list__wrapper">
                    <Link
                        to="#"
                        className="list__wrapper--link"
                        onClick={(event) => {
                            event.preventDefault();
                            isActiveLoadBtn
                                ? setIsActiveLoadBtn(false)
                                : setIsActiveLoadBtn(true);
                        }}
                    >
                        Load Index{" "}
                        <span
                            style={
                                isActiveLoadBtn
                                    ? {
                                          transform: "rotate(180deg)",
                                      }
                                    : null
                            }
                        >
                            &#9660;
                        </span>
                    </Link>
                    <ul
                        className={
                            isActiveLoadBtn
                                ? "list__loadIndex--dropdown active"
                                : "list__loadIndex--dropdown"
                        }
                    >
                        <div className="list__loadIndex--wrapper">
                            {models
                                .sort(
                                    (a, b) =>
                                        a.tire_load_index - b.tire_load_index
                                )
                                .map((m) => {
                                    if (
                                        !availableLoadIndexes.includes(
                                            m.tire_load_index
                                        )
                                    ) {
                                        availableLoadIndexes.push(
                                            m.tire_load_index
                                        );

                                        return (
                                            <button
                                                className={`${
                                                    loadIndexCriteria[
                                                        m.tire_load_index
                                                    ] === true
                                                        ? "list__loadIndex--wrapper-btn active__speedIndex"
                                                        : "list__loadIndex--wrapper-btn"
                                                }`}
                                                key={m.tire_load_index}
                                                onClick={() => {
                                                    loadIndexCriteria[
                                                        m.tire_load_index
                                                    ] === true
                                                        ? setLoadIndexCriteria({
                                                              ...loadIndexCriteria,
                                                              [m.tire_load_index]: false,
                                                          })
                                                        : setLoadIndexCriteria({
                                                              ...loadIndexCriteria,
                                                              [m.tire_load_index]: true,
                                                          });
                                                }}
                                            >
                                                Index: {m.tire_load_index}
                                            </button>
                                        );
                                    }
                                    return null;
                                })}
                        </div>
                    </ul>
                </li>

                <li className="list list__wrapper">
                    <Link
                        to="/"
                        className="list__wrapper--link"
                        onClick={(event) => {
                            event.preventDefault();
                            isActiveSeasonBtn
                                ? setIsActiveSeasonBtn(false)
                                : setIsActiveSeasonBtn(true);
                        }}
                    >
                        Season{" "}
                        <span
                            style={
                                isActiveSeasonBtn
                                    ? {
                                          transform: "rotate(180deg)",
                                      }
                                    : null
                            }
                        >
                            &#9660;
                        </span>
                    </Link>
                    <ul
                        className={
                            isActiveSeasonBtn
                                ? "list__season--dropdown active"
                                : "list__season--dropdown"
                        }
                    >
                        {seasons.map((s) => {
                            return (
                                <li className="list__season--wrapper" key={s}>
                                    <input
                                        type="checkbox"
                                        name={s}
                                        value={s}
                                        className="season__input"
                                        checked={
                                            seasonCriteria[s] === true
                                                ? true
                                                : false
                                        }
                                        onChange={() => {
                                            seasonCriteria[s] === true
                                                ? setSeasonCriteria({
                                                      ...seasonCriteria,
                                                      [s]: false,
                                                  })
                                                : setSeasonCriteria({
                                                      ...seasonCriteria,
                                                      [s]: true,
                                                  });
                                        }}
                                    />
                                    <button
                                        className="season__btn"
                                        onClick={() => {
                                            seasonCriteria[s] === true
                                                ? setSeasonCriteria({
                                                      ...seasonCriteria,
                                                      [s]: false,
                                                  })
                                                : setSeasonCriteria({
                                                      ...seasonCriteria,
                                                      [s]: true,
                                                  });
                                        }}
                                    >
                                        {s}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </li>

                <li className="list list__wrapper">
                    <Link
                        to="/"
                        className="list__wrapper--link"
                        onClick={(event) => {
                            event.preventDefault();
                            isActiveTypeBtn
                                ? setIsActiveTypeBtn(false)
                                : setIsActiveTypeBtn(true);
                        }}
                    >
                        Type Car{" "}
                        <span
                            style={
                                isActiveTypeBtn
                                    ? {
                                          transform: "rotate(180deg)",
                                      }
                                    : null
                            }
                        >
                            &#9660;
                        </span>
                    </Link>
                    <ul
                        className={
                            isActiveTypeBtn
                                ? "list__type--dropdown active"
                                : "list__type--dropdown"
                        }
                    >
                        {carTypes.map((t) => {
                            return (
                                <li className="list__type--wrapper" key={t}>
                                    <input
                                        type="checkbox"
                                        name={t}
                                        value={t}
                                        className="carType__input"
                                        checked={
                                            carTypeCriteria[t] === true
                                                ? true
                                                : false
                                        }
                                        onChange={() => {
                                            carTypeCriteria[t] === true
                                                ? setCarTypeCriteria({
                                                      ...carTypeCriteria,
                                                      [t]: false,
                                                  })
                                                : setCarTypeCriteria({
                                                      ...carTypeCriteria,
                                                      [t]: true,
                                                  });
                                        }}
                                    />
                                    <button
                                        className="carType__btn"
                                        onClick={() => {
                                            carTypeCriteria[t] === true
                                                ? setCarTypeCriteria({
                                                      ...carTypeCriteria,
                                                      [t]: false,
                                                  })
                                                : setCarTypeCriteria({
                                                      ...carTypeCriteria,
                                                      [t]: true,
                                                  });
                                        }}
                                    >
                                        {t}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default VisibleSidebar;
