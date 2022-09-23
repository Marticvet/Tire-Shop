import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import About from "./pages/About/About.js";
import Brands from "./pages/Brands/Brands.js";
import Contacts from "./pages/Contacts/Contacts.js";
import Footer from "./pages/Footer/Footer.js";
import FoundTires from "./pages/FoundTires/FoundTires.js";
import Home from "./pages/Home/Home.js";
import LoginInformation from "./pages/LoginInformation/LoginInformation.js";
import ManufacturerModels from "./pages/Manufacturer-Models/Manufacturer-Models.js";
import Model from "./pages/Model/Model.js";
import Navbar from "./pages/Navbar/Navbar.js";
import ScrollToTop from "./pages/ScrollToTop/ScrollToTop.js";
import Search from "./pages/Search/Search.js";
import ShoppingCart from "./pages/Shopping-Cart/Shopping-Cart.js";
import AuthContext, { getUser } from "./providers/authentication.js";

function App() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [authValue, setAuthState] = useState({
        user: getUser(),
        isLoggedIn: Boolean(getUser()),
    });

    const [currentProfileBtn, setCurrentProfileBtn] = useState("orders");

    const ProtectedRoute = ({ user, children }) => {
        if (!user) {
            return <Navigate to="/" replace />;
        }

        return children;
    };

    return (
        <div className="container">
            <BrowserRouter>
                <AuthContext.Provider value={{ ...authValue, setAuthState }}>
                    <Navbar
                        openNavbar={openNavbar}
                        setOpenNavbar={setOpenNavbar}
                        currentProfileBtn={currentProfileBtn}
                        setCurrentProfileBtn={setCurrentProfileBtn}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                    <ScrollToTop>
                        <Routes>
                            <Route path="*" element={<Home />} />
                            <Route
                                path="/contacts"
                                element={<Contacts />}
                            ></Route>
                            <Route path="/brands" element={<Brands />}></Route>

                            <Route
                                path="/tires/manufacturers/:manufacturer_name/tire-model/:tireId"
                                element={
                                    <Model setOpenNavbar={setOpenNavbar} />
                                }
                            ></Route>
                            <Route path="/about" element={<About />}></Route>
                            <Route
                                path="/search/sizes"
                                element={
                                    <FoundTires
                                        isSidebarOpen={isSidebarOpen}
                                        setIsSidebarOpen={setIsSidebarOpen}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/search/models"
                                element={
                                    <FoundTires
                                        isSidebarOpen={isSidebarOpen}
                                        setIsSidebarOpen={setIsSidebarOpen}
                                    />
                                }
                            ></Route>
                            <Route path="/search" element={<Search />}></Route>
                            <Route
                                path="/shopping_cart"
                                element={
                                    <ProtectedRoute user={authValue.isLoggedIn}>
                                        <ShoppingCart />
                                    </ProtectedRoute>
                                }
                            ></Route>
                            <Route
                                path="/loginInformation"
                                element={
                                    <LoginInformation
                                        currentProfileBtn={currentProfileBtn}
                                        setCurrentProfileBtn={
                                            setCurrentProfileBtn
                                        }
                                    />
                                }
                            ></Route>
                            <Route
                                path="/tires/manufacturers/:name/tire-models"
                                element={
                                    <ManufacturerModels
                                        setOpenNavbar={setOpenNavbar}
                                        isSidebarOpen={isSidebarOpen}
                                        setIsSidebarOpen={setIsSidebarOpen}
                                    />
                                }
                            ></Route>
                        </Routes>
                    </ScrollToTop>
                </AuthContext.Provider>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
