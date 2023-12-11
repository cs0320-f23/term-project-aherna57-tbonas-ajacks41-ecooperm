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


const Home = () => {
  const userItem = localStorage.getItem("user");
  let location = useLocation();
  const userInfo =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();
  const query = userQuery(userInfo?.sub);

  const [result, setResult] = useState<any[]>([]);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [dropdownSelection, setDropdownSelection] = useState<string | null>(
    null
  );
  const [activeDropdownButton, setActiveDropdownButton] = useState<
    string | null
  >(null);


  const navigate = useNavigate(); // hook for navigation

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
    navigate('/');
  };

  const handleButtonToggle = (buttonName: string) => {
      setActiveButton((prev) => (prev === buttonName ? null : buttonName));
      setDropdownSelection(null); // Reset dropdown selection when toggling buttons
  };

  const handleDropdownSelect = (option: string) => {
    setDropdownSelection(option);
  };

   const renderDropdown = (options: string[]) => {
     return (
       <div className="dropdown">
         {options.map((option, index) => (
           <div
             key={index}
             className="dropdown-item"
             onClick={() => handleDropdownSelect(option)}
           >
             {option}
           </div>
         ))}
       </div>
     );
   };

   const renderButton = (
     buttonName: string,
     dropdownOptions: string[] | null = null
   ) => {
     return (
       <div className="button-container" key={buttonName}>
         <button
           className={`toggle-button ${
             activeButton === buttonName ? "active" : ""
           }`}
           onClick={() => handleButtonToggle(buttonName)}
         >
           {dropdownSelection || buttonName}
           {dropdownOptions && <span className="dropdown-icon">&#9660;</span>}
         </button>
         {dropdownOptions &&
           activeButton === buttonName &&
           renderDropdown(dropdownOptions)}
       </div>
     );
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

      <p className="headerLine" />

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
            <button
              className={`toggle-button ${
                activeButton === "price" ? "active" : ""
              }`}
              onClick={() => handleButtonToggle("price")}
            >
              Price
              <span className="dropdown-icon">&#9660;</span>
              {activeButton === "price" &&
                renderDropdown(["Low to High", "High to Low"])}
            </button>

            {/* Dietary Restrictions Button */}
            <button
              className={`toggle-button ${
                activeButton === "dietaryRestrictions" ? "active" : ""
              }`}
              onClick={() => handleButtonToggle("dietaryRestrictions")}
            >
              Dietary Restrictions
              <span className="dropdown-icon">&#9660;</span>
              {activeButton === "dietaryRestrictions" &&
                renderDropdown([
                  "Gluten Free",
                  "Vegetarian",
                  "Vegan",
                  "Kosher",
                  "Halal",
                ])}
            </button>

            {/* Cuisine Button */}
            <button
              className={`toggle-button ${
                activeButton === "cuisine" ? "active" : ""
              }`}
              onClick={() => handleButtonToggle("cuisine")}
            >
              Cuisine
              <span className="dropdown-icon">&#9660;</span>
              {activeButton === "cuisine" &&
                renderDropdown([
                  "Italian",
                  "Japanese",
                  "Asian",
                  "Healthy",
                  "Lebanese",
                  "Chinese",
                  "Fast Food",
                  "Dessert",
                  "Breakfast",
                  "Sushi",
                  "Sandwiches",
                  "Mexican",
                  "Indian",
                  "Ramen",
                  "Burgers",
                ])}
            </button>

            <button
              className={`toggle-button ${
                activeButton === "ratings" ? "active" : ""
              }`}
              onClick={() => handleButtonToggle("ratings")}
            >
              Ratings
              <span className="dropdown-icon">&#9660;</span>
              {activeButton === "ratings" &&
                renderDropdown(["High to low", "Low to high", "5 star only"])}
            </button>
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
