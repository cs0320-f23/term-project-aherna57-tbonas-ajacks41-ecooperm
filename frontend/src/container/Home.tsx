import { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import axios from "axios";
import Result from "./Result";
import Searchbar from "./SearchBar";
import { ResultProps } from "./Result";
import RestaurantList from "../components/RestaurantList";
import "../styles/Home.css";
import RestaurantProfile from "../components/RestaurantProfile";
import FilterButtons from "../components/FilterButtons";
import { buttonConfigs } from "../utils/data";

/** The Home component is a React functional component that represents the main page of the application. 
 * It includes functionality for user navigation, search, filter options, and displays a list of restaurants. 
 * The component dynamically loads user and restaurant profiles based on routes and provides a visually appealing and user-friendly interface. 
 * The overall purpose of the file is to create a comprehensive home page for the Bear Bites application. */

// Functional component definition for the Home component
const Home = () => {
  // Retrieve user information from local storage
  const userItem = localStorage.getItem("user");
  let location = useLocation();

  // Initialize user info or clear local storage if not available
  const userInfo =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();

  // State to store search results and manage navigation
  const [result, setResult] = useState<any[]>([]);
  const navigate = useNavigate(); // hook for navigation

  // State and function for filter management
  const [activeFilterCategory, setActiveFilterCategory] = useState<
    string | null
  >(null);
  const [resetKey, setResetKey] = useState<number>(0); // Add a state to trigger a reset

  // Function to handle filter reset
  const handleResetFilters = () => {
    // Reset all filters
    setActiveFilterCategory(null);
    // Trigger a reset by updating the resetKey
    setResetKey((prevKey) => prevKey + 1);
  };

  // Function to fetch data from the API based on search value
  const fetchData = async (value: any) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );

    return data.products;
  };

  // Function to handle user image click and navigate to the user profile page
  const handleUserImageClick = () => {
    navigate(`/user-profile/${userInfo.id}`);
  };

  // Function to handle home click and navigate to the home page
  const handleHomeClick = () => {
    navigate("/");
  };

  // Function to handle user logout
  function handleLogout() {
    localStorage.clear();
    setTimeout(() => navigate("/login"), 0);
  }

  // JSX structure for the Home component
  return (
    <div>
      {/* Header Section */}
      <h1 className="header">
        {/* Title with clickable logo to navigate to the home page */}
        <div
          className="title"
          onClick={handleHomeClick}
          aria-label="Navigate to Home Page"
        >
          Bear <img className="iconTop" src="/logo.png" alt="Logo"></img> Bites
        </div>

        {/* User Image Section */}
        <div className="userIm" onClick={handleUserImageClick}>
          {userInfo && (
            <img src={userInfo.profilePictureURL} alt="Clickable Button" />
          )}
          {/* Dropdown menu with logout option */}
          <div className="dropdown-menu">
            <button
              className="dropbtn"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </h1>

      {/* Routes Section */}
      <div>
        <Routes>
          {/* Route for user profile */}
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          {/* Route for restaurant profile */}
          <Route
            path="/restaurant-profile/:restaurantId"
            element={<RestaurantProfile />}
          />
          {/* Default route */}
          <Route path="/*" />
        </Routes>
      </div>

      {/* Search and Filter Section */}
      {location.pathname === "/" && (
        <div>
          {/* Search Bar */}
          <div className="search-bar-container">
            <Searchbar
              fetchData={fetchData}
              setResult={setResult}
              suggestionKey="title"
              aria-label="Search Bar"
            />
            {/* Display search results */}
            {result.map((item: ResultProps, index: number) => (
              <Result
                key={index}
                {...item}
                aria-label={`Search Result ${index + 1}`}
              />
            ))}
            <p className="search-bar-line"></p>{" "}
          </div>

          {/* Row of Buttons */}
          <div className="button-row">
            {/* Map filter buttons based on buttonConfigs */}
            {buttonConfigs.map((config, index) => (
              <FilterButtons
                key={index}
                category={config.category}
                options={config.options}
                activeCategory={activeFilterCategory}
                setActiveCategory={setActiveFilterCategory}
                resetKey={resetKey} // Pass the resetKey as a prop to trigger a reset
                aria-label={`Filter restaurant list by ${config.category}`}
              />
            ))}
            {/* Add the Reset button with styling */}
            <div className="reset-button-container">
              <button
                className="reset-button"
                onClick={handleResetFilters}
                aria-label="Reset Filters"
              >
                Reset
              </button>
            </div>
          </div>

          <p className="search-bar-line"></p>
        </div>
      )}

      {/* Restaurant List Section */}
      {location.pathname === "/" && (
        <div className="restaurant-box-container">
          <RestaurantList />
        </div>
      )}
    </div>
  );
};

// Default export for the Home component
export default Home;
