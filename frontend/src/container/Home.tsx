import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import RestaurantBox from "../components/RestaurantBox";
import { userQuery } from "../utils/data";
import { decodedMockResponse } from "../mockedUser/user1Mock";
import axios from "axios";
import Result from "./Result";
import Searchbar from "./SearchBar";
import { ResultProps } from "./Result";

const Home = () => {
  const userItem = localStorage.getItem("user");
  const userInfo =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();
  const query = userQuery(userInfo?.sub);

  const [result, setResult] = useState<any[]>([]);
  const [activeButton, setActiveButton] = useState<string | null>(null);

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

   const handleButtonToggle = (buttonName: string) => {
     setActiveButton((prev) => (prev === buttonName ? null : buttonName));
   };

   const renderDropdown = (options: string[]) => {
     return (
       <div className="dropdown">
         {options.map((option, index) => (
           <div key={index} className="dropdown-item">
             {option}
           </div>
         ))}
       </div>
     );
   };

  return (
    <div>
      <h1 className="header">
        <div className="title">
          Bear <img className="iconTop" src="logo.png" alt="Logo"></img> Bites
        </div>
        <div className="userIm" onClick={handleUserImageClick}>
          <img src="user.png" alt="Clickable Button" />
        </div>
      </h1>
      <p className="headerLine" />

      <div>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/restaurant-profile/:restaurantId"
            element={
              <RestaurantBox
                restaurantData={{
                  imageUrl: "",
                  name: "",
                  cuisineType: "",
                  dollarSigns: undefined,
                  stars: undefined,
                  address: undefined,
                }}
              />
            }
          />
          <Route path="/*" />
        </Routes>
      </div>
      <div className="search-bar-container">
        <Searchbar
          fetchData={fetchData}
          setResult={setResult}
          suggestionKey="title"
        />

        {result.map((item: ResultProps, index: number) => (
          <Result key={index} {...item} />
        ))}
        {/* Brown line after the search bar */}
        <p className="search-bar-line"></p>
      </div>

      {/* Row of buttons */}
      <div className="button-row">
        {/* Price Button */}
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

      {/* Container for the restaurant boxes */}
      <div className="restaurant-box-container">
        {/* Sample RestaurantBox components */}
        <RestaurantBox
          restaurantData={
            {
              /* Sample data */
            }
          }
        />
        {/* Add more RestaurantBox components as needed */}
      </div>
    </div>
  );
};

export default Home;
