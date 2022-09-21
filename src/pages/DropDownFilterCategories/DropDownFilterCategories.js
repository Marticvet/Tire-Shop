function DropDownFilterCategories({
    isActiveDropdown,
    setIsActiveDropdown,
    dropDownCategory,
    setDropDownCategory,
    setDropDownCriteria,
    name,
    widht,
    height,
    diameter,
    lastPath,
    searchedWord,
    setIsSidebarOpen,
}) {
    return (
        <div
            className="searched__wrapper"
            onClick={() => setIsSidebarOpen(false)}
        >
            <div
                className="searched__manufacturer"
                tabIndex={1}
                onFocus={() => {
                    setIsActiveDropdown(false);
                }}
            >
                {name ? (
                    <h1 className="searched__manufacturer--heading-1">
                        <span>All tires</span> &nbsp;with Manufacturer -&nbsp;
                        <b>{name[0].toUpperCase() + name.slice(1)}</b>
                    </h1>
                ) : null}

                {lastPath === "sizes" ? (
                    <h1 className="searched__sizes--heading-1">
                        <span>All tires</span> &nbsp;with size -&nbsp;
                        <b>{`${widht}/${height}R${diameter}`}</b>
                    </h1>
                ) : null}

                {lastPath === "models" ? (
                    <h1 className="searched__manufacturer--heading-1">
                        <span>All models</span> &nbsp;with word -&nbsp;<b>{searchedWord}</b>
                    </h1>
                ) : null}
            </div>
            <div className="container">
                <div
                    className="select__box"
                    onClick={() =>
                        isActiveDropdown
                            ? setIsActiveDropdown(false)
                            : setIsActiveDropdown(true)
                    }
                    tabIndex={1}
                    onFocus={() => {
                        setIsActiveDropdown(false);
                    }}
                >
                    <div className="selected">
                        {!dropDownCategory
                            ? "Sort By: Select Category"
                            : dropDownCategory}
                    </div>

                    <div
                        className={
                            isActiveDropdown
                                ? "options__container active"
                                : "options__container"
                        }
                    >
                        <div
                            className="option"
                            onClick={() => {
                                setDropDownCriteria("category");
                                setDropDownCategory("Sort By: Category");
                            }}
                        >
                            <input
                                type="radio"
                                className="radio"
                                name="category"
                            />
                            <label htmlFor="lower price">
                                Sort By: Category
                            </label>
                        </div>

                        <div
                            className="option"
                            onClick={() => {
                                setDropDownCategory("Price: Lowest to Highest");
                                setDropDownCriteria("asc");
                            }}
                        >
                            <input
                                type="radio"
                                className="radio"
                                name="category"
                            />
                            <label htmlFor="lower price">
                                Price: Lowest to Highest
                            </label>
                        </div>

                        <div
                            className="option"
                            onClick={() => {
                                setDropDownCategory("Price: Highest to Lowest");
                                setDropDownCriteria("desc");
                            }}
                        >
                            <input
                                type="radio"
                                className="radio"
                                name="category"
                            />
                            <label htmlFor="higher price">
                                Price: Highest to Lowest
                            </label>
                        </div>

                        <div
                            className="option"
                            onClick={() => {
                                setDropDownCategory("Sort by Model: A - Z");
                                setDropDownCriteria("aphabeticaly");
                            }}
                        >
                            <input
                                type="radio"
                                className="radio"
                                name="category"
                            />
                            <label htmlFor="alphabetical sort">
                                Model: A - Z
                            </label>
                        </div>

                        <div
                            className="option"
                            onClick={() => {
                                setDropDownCategory("Sort by Model: Z - A");
                                setDropDownCriteria("reverseAlphabeticaly");
                            }}
                        >
                            <input
                                type="radio"
                                className="radio"
                                name="category"
                            />
                            <label htmlFor="alphabetical sort desc">
                                Model: Z - A
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownFilterCategories;
