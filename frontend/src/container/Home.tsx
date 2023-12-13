import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation} from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { userQuery } from "../utils/data";
import axios from "axios";
import Result from "./Result";
import Searchbar from "./SearchBar";
import { ResultProps } from "./Result";
import RestaurantList from "../components/RestaurantList";
import "../styles/Home.css";
import RestaurantProfile from "../components/RestaurantProfile";
import FilterButtons from "../components/FilterButtons";
import { buttonConfigs } from "../utils/data";



const Home = () => {
  const userItem = localStorage.getItem("user");
  let location = useLocation();
  const userInfo =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();
  const [result, setResult] = useState<any[]>([]);
  const navigate = useNavigate(); // hook for navigation
  const [activeFilterCategory, setActiveFilterCategory] = useState<
    string | null
  >(null);

  const [resetKey, setResetKey] = useState<number>(0); // Add a state to trigger a reset

  const handleResetFilters = () => {
    // Reset all filters
    setActiveFilterCategory(null);
    // Trigger a reset by updating the resetKey
    setResetKey((prevKey) => prevKey + 1);
  };

  const fetchData = async (value: any) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );

    return data.products;
  };

  const handleUserImageClick = () => {
    // Navigate to the user profile page
    navigate(`/user-profile/${userInfo.id}`);
  };
  const handleHomeClick = () => {
    // Navigate to the home page
    navigate("/");
  };

  function handleLogout() {
    navigate("/login");
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <h1 className="header">
        <div className="title" onClick={handleHomeClick}>
          Bear <img className="iconTop" src="/logo.png" alt="Logo"></img> Bites
        </div>
        <div className="userIm" onClick={handleUserImageClick}>
          <img src="/user.png" alt="Clickable Button" />
          <div className="dropdown-menu">
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </h1>

      <div>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/restaurant-profile/:restaurantId"
            element={<RestaurantProfile />}
          />
          <Route path="/*" />
        </Routes>
      </div>

      {location.pathname === "/" && (
        <div>
          {/* Search Bar */}
          <div className="search-bar-container">
            <Searchbar
              fetchData={fetchData}
              setResult={setResult}
              suggestionKey="title"
            />
            {result.map((item: ResultProps, index: number) => (
              <Result key={index} {...item} />
            ))}
            <p className="search-bar-line"></p>{" "}
          </div>

          {/* Row of Buttons */}
          <div className="button-row">
            {buttonConfigs.map((config, index) => (
              <FilterButtons
                key={index}
                category={config.category}
                options={config.options}
                activeCategory={activeFilterCategory}
                setActiveCategory={setActiveFilterCategory}
                resetKey={resetKey} // Pass the resetKey as a prop to trigger a reset
              />
            ))}
            {/* Add the Reset button with styling */}
            <div className="reset-button-container">
              <button className="reset-button" onClick={handleResetFilters}>
                Reset
              </button>
            </div>
          </div>

          <p className="search-bar-line"></p>
        </div>
      )}

      {location.pathname === "/" && (
        <div className="restaurant-box-container">
          <RestaurantList />
        </div>
      )}
    </div>
  );
};

export default Home;
