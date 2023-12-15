import React, { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { userQuery } from "../utils/data";
import axios from "axios";
import Result from "../container/Result";
import Searchbar from "../container/SearchBar";
import { ResultProps } from "../container/Result";
import RestaurantList from "../components/RestaurantList";
import styles from "../styles/Home.module.css";
import RestaurantProfile from "./RestaurantProfile";
import { useRouter } from "next/router";
import { api } from "~/src/utils/api";

const Home = () => {
  const router = useRouter();

  // const { user } = api.profile.getById.useQuery({

  // });


  const userItem =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  // This line checks if the code is running in a browser environment (client-side) by checking if the "window" object is defined.
  // If it is, it retrieves the value of the "user" key from the browser's local storage using the "getItem" method of the "localStorage" object.
  // Otherwise, it sets the "userItem" variable to null.

  let location = useLocation();
  // This line initializes a variable called "location" using the "useLocation" hook.
  // The "useLocation" hook is typically used in React Router to get the current location object.

  const userInfo =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();
  // This line checks if the "userItem" variable has a truthy value and is not equal to the string "undefined".
  // If it is, it parses the value of "userItem" as JSON using the "JSON.parse" method and assigns it to the "userInfo" variable.
  // Otherwise, it clears the local storage using the "clear" method of the "localStorage" object.

  const query = userQuery(userInfo?.sub);
  // This line calls a function called "userQuery" and passes the value of "userInfo?.sub" as an argument.
  // The "?." operator is used to safely access the "sub" property of the "userInfo" object, in case it is null or undefined.

  const [result, setResult] = useState<any[]>([]);
  // This line initializes a state variable called "result" using the "useState" hook.
  // The initial value of "result" is an empty array ([]), and the "setResult" function is used to update its value.

  const [activeButton, setActiveButton] = useState<string | null>(null);
  // This line initializes a state variable called "activeButton" using the "useState" hook.
  // The initial value of "activeButton" is null, and the "setActiveButton" function is used to update its value.

  const [dropdownSelection, setDropdownSelection] = useState<string | null>(
    null
  );
  // This line initializes a state variable called "dropdownSelection" using the "useState" hook.
  // The initial value of "dropdownSelection" is null, and the "setDropdownSelection" function is used to update its value.

  const [activeDropdownButton, setActiveDropdownButton] = useState<
    string | null
  >(null);
  // This line initializes a state variable called "activeDropdownButton" using the "useState" hook.
  // The initial value of "activeDropdownButton" is null, and the "setActiveDropdownButton" function is used to update its value.

  //const navigate = useNavigate(); // hook for navigation

  const fetchData = async (value: any) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );

    return data.products;
  };

  const handleUserImageClick = () => {
    // Navigate to the user profile page
    //router.push(`/user-profile/${userInfo.id}`);
  };

  const handleHomeClick = () => {
    // Navigate to the home page
    router.push("/home");
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
      <div className={styles.dropdown}>
        {options.map((option, index) => (
          <div
            key={index}
            className={styles.dropdownItem}
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
      <div className={styles.buttonContainer} key={buttonName}>
        <button
          className={`toggle-button ${
            activeButton === buttonName ? "active" : ""
          }`}
          onClick={() => handleButtonToggle(buttonName)}
        >
          {dropdownSelection || buttonName}
          {dropdownOptions && <span className={styles.dropdownIcon}>&#9660;</span>}
        </button>
        {dropdownOptions &&
          activeButton === buttonName &&
          renderDropdown(dropdownOptions)}
      </div>
    );
  };

  return (
    <div>
      <h1 className="header">
        <div className="title" onClick={handleHomeClick}>
          Bear <img className={styles.iconTop} src="/logo.png" alt="Logo"></img>{" "}
          Bites
        </div>
        <div className={styles.userIm} onClick={handleUserImageClick}>
          <img src="/user.png" alt="Clickable Button" />
        </div>
      </h1>
      <p className={styles.headerLine} />

      {location.pathname === "/" && (
        <div>
          {/* Search Bar */}
          <div className={styles.searchBarContainer}>
            <Searchbar
              fetchData={fetchData}
              setResult={setResult}
              suggestionKey="title"
            />
            {result.map((item: ResultProps, index: number) => (
              <Result key={index} {...item} />
            ))}
            <p className={styles.searchBarLine}></p>{" "}
          </div>

          {/* Row of Buttons */}
          <div className={styles.buttonRow}>
            <button
              className={`toggleButton ${
                activeButton === "price" ? "active" : ""
              }`}
              onClick={() => handleButtonToggle("price")}
            >
              Price
              <span className={styles.dropdownIcon}>&#9660;</span>
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
              <span className={styles.dropdownIcon}>&#9660;</span>
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
              <span className={styles.dropdownIcon}>&#9660;</span>
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
              <span className={styles.dropdownIcon}>&#9660;</span>
              {activeButton === "ratings" &&
                renderDropdown(["High to low", "Low to high", "5 star only"])}
            </button>
          </div>
          <p className={styles.searchBarLine}></p>
        </div>
      )}

      {location.pathname === "/" && (
        <div className={styles.restaurantBoxContainer}>
          <RestaurantList />
        </div>
      )}
    </div>
  );
};

export default Home;
