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
import RestaurantList from "../components/RestaurantList";
import FilterButtons from "../components/FilterButtons";
import RestaurantPage from "./RestaurantPage";

const Home = () => {
  const userItem = localStorage.getItem("user");
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

  const navigate = useNavigate(); // hook for navigation

  const fetchData = async (value: any) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );

    return data.products;
  };

  const handleUserImageClick = () => {
    // Navigate to the user profile page
    navigate(`/user-profile/${userInfo.userId}`);
  };

  const handleButtonToggle = (buttonName: string) => {
    setActiveButton((prev) => (prev === buttonName ? null : buttonName));
    setDropdownSelection(null); // Reset dropdown selection when toggling buttons
  };

  const handleFilterDropdownSelect = (category: string, option: string) => {
    setDropdownSelection(option);
    // Add logic to apply the selected filter to the restaurant list
    // For now, you can console.log the selected category and option
    console.log("Selected Filter:", category, option);
  };

  const renderDropdown = (category: string, options: string[]) => {
    console.log("Rendering dropdown for category:", category);
    return (
      <div className="dropdown">
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => handleFilterDropdownSelect(category, option)}
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  const renderButton = (
    category: string,
    dropdownOptions: string[] | null = null
  ) => {
    console.log("Rendering button for category:", category);
    return (
      <div className="button-container" key={category}>
        <FilterButtons
          category={category}
          options={dropdownOptions || []}
          activeButton={activeButton}
          onButtonToggle={handleButtonToggle}
          onDropdownSelect={handleFilterDropdownSelect}
        />
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

          {/* New route for RestaurantPage */}
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantPage />}
          />

          {/* Default route */}
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
        <p className="search-bar-line"></p>
      </div>

      {/* Row of buttons */}
      <div className="button-row">
        <FilterButtons
          category="Price"
          options={["Low to High", "High to Low"]}
          activeButton={activeButton}
          onButtonToggle={handleButtonToggle}
          onDropdownSelect={handleFilterDropdownSelect}
        />

        <FilterButtons
          category="Dietary Restrictions"
          options={["Gluten Free", "Vegetarian", "Vegan", "Kosher", "Halal"]}
          activeButton={activeButton}
          onButtonToggle={handleButtonToggle}
          onDropdownSelect={handleFilterDropdownSelect}
        />

        <FilterButtons
          category="Cuisine"
          options={[
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
          ]}
          activeButton={activeButton}
          onButtonToggle={handleButtonToggle}
          onDropdownSelect={handleFilterDropdownSelect}
        />

        <FilterButtons
          category="Ratings"
          options={["High to low", "Low to high", "5 star only"]}
          activeButton={activeButton}
          onButtonToggle={handleButtonToggle}
          onDropdownSelect={handleFilterDropdownSelect}
        />
      </div>
      <p className="search-bar-line"></p>

      <div className="restaurant-box-container">
        <RestaurantList />
      </div>
    </div>
  );
};

export default Home;


// /**import React, { useState, useEffect } from "react";
// import { Link, Route, Routes, useNavigate } from "react-router-dom";
// import UserProfile from "../components/UserProfile";
// import RestaurantBox from "../components/RestaurantBox";
// import { userQuery } from "../utils/data";
// import { decodedMockResponse } from "../mockedUser/user1Mock";
// import axios from "axios";
// import Result from "./Result";
// import Searchbar from "./SearchBar";
// import { ResultProps } from "./Result";
// import RestaurantList from "../components/RestaurantList";

// const Home = () => {
//   const userItem = localStorage.getItem("user");
//   const userInfo =
//     userItem && userItem !== "undefined"
//       ? JSON.parse(userItem)
//       : localStorage.clear();
//   const query = userQuery(userInfo?.sub);

//   const [result, setResult] = useState<any[]>([]);
//   const [activeButton, setActiveButton] = useState<string | null>(null);
//   const [dropdownSelection, setDropdownSelection] = useState<string | null>(
//     null
//   );
//   const [activeDropdownButton, setActiveDropdownButton] = useState<
//     string | null
//   >(null);



//   const navigate = useNavigate(); // hook for navigation

//   const fetchData = async (value: any) => {
//     const { data } = await axios.get(
//       `https://dummyjson.com/products/search?q=${value}&limit=10`
//     );

//     return data.products;
//   };

//   const handleUserImageClick = () => {
//     // Navigate to the user profile page
//     navigate(`/user-profile/${userInfo.userId}`);
//   };

//     const handleButtonToggle = (buttonName: string) => {
//        setActiveButton((prev) => (prev === buttonName ? null : buttonName));
//        setDropdownSelection(null); // Reset dropdown selection when toggling buttons
//      };

//   const handleDropdownSelect = (option: string) => {
//     setDropdownSelection(option);
//   };

//    const renderDropdown = (options: string[]) => {
//      return (
//        <div className="dropdown">
//          {options.map((option, index) => (
//            <div
//              key={index}
//              className="dropdown-item"
//              onClick={() => handleDropdownSelect(option)}
//            >
//              {option}
//            </div>
//          ))}
//        </div>
//      );
//    };

//    const renderButton = (
//      buttonName: string,
//      dropdownOptions: string[] | null = null
//    ) => {
//      return (
//        <div className="button-container" key={buttonName}>
//          <button
//            className={`toggle-button ${
//              activeButton === buttonName ? "active" : ""
//            }`}
//            onClick={() => handleButtonToggle(buttonName)}
//          >
//            {dropdownSelection || buttonName}
//            {dropdownOptions && <span className="dropdown-icon">&#9660;</span>}
//          </button>
//          {dropdownOptions &&
//            activeButton === buttonName &&
//            renderDropdown(dropdownOptions)}
//        </div>
//      );
//    };

//   return (
//     <div>
//       <h1 className="header">
//         <div className="title">
//           Bear <img className="iconTop" src="logo.png" alt="Logo"></img> Bites
//         </div>
//         <div className="userIm" onClick={handleUserImageClick}>
//           <img src="user.png" alt="Clickable Button" />
//         </div>
//       </h1>
//        {/* <p className="headerLine" />  */}

//       <div>
//         <Routes>
//           <Route path="/user-profile/:userId" element={<UserProfile />} />
//           <Route
//             path="/restaurant-profile/:restaurantId"
//             element={
//               <RestaurantBox
//                 restaurantData={{
//                   imageUrl: "",
//                   name: "",
//                   cuisineType: "",
//                   dollarSigns: undefined,
//                   stars: undefined,
//                   address: undefined,
//                 }}
//               />
//             }
//           />
//           <Route path="/*" />
//         </Routes>
//       </div>
//       <div className="search-bar-container">
//         <Searchbar
//           fetchData={fetchData}
//           setResult={setResult}
//           suggestionKey="title"
//         />

//         {result.map((item: ResultProps, index: number) => (
//           <Result key={index} {...item} />
//         ))}
//         {/* Brown line after the search bar */}
//         <p className="search-bar-line"></p>
//       </div>

//       {/* Row of buttons */}
//       <div className="button-row">
//         {/* Price Button */}

//         <button
//           className={`toggle-button ${
//             activeButton === "price" ? "active" : ""
//           }`}
//           onClick={() => handleButtonToggle("price")}
//         >
//           Price
//           <span className="dropdown-icon">&#9660;</span>
//           {activeButton === "price" &&
//             renderDropdown(["Low to High", "High to Low"])}
//         </button>

//         {/* Dietary Restrictions Button */}
//         <button
//           className={`toggle-button ${
//             activeButton === "dietaryRestrictions" ? "active" : ""
//           }`}
//           onClick={() => handleButtonToggle("dietaryRestrictions")}
//         >
//           Dietary Restrictions
//           <span className="dropdown-icon">&#9660;</span>
//           {activeButton === "dietaryRestrictions" &&
//             renderDropdown([
//               "Gluten Free",
//               "Vegetarian",
//               "Vegan",
//               "Kosher",
//               "Halal",
//             ])}
//         </button>

//         {/* Cuisine Button */}
//         <button
//           className={`toggle-button ${
//             activeButton === "cuisine" ? "active" : ""
//           }`}
//           onClick={() => handleButtonToggle("cuisine")}
//         >
//           Cuisine
//           <span className="dropdown-icon">&#9660;</span>
//           {activeButton === "cuisine" &&
//             renderDropdown([
//               "Italian",
//               "Japanese",
//               "Asian",
//               "Healthy",
//               "Lebanese",
//               "Chinese",
//               "Fast Food",
//               "Dessert",
//               "Breakfast",
//               "Sushi",
//               "Sandwiches",
//               "Mexican",
//               "Indian",
//               "Ramen",
//               "Burgers",
//             ])}
//         </button>

//         <button
//           className={`toggle-button ${
//             activeButton === "ratings" ? "active" : ""
//           }`}
//           onClick={() => handleButtonToggle("ratings")}
//         >
//           Ratings
//           <span className="dropdown-icon">&#9660;</span>
//           {activeButton === "ratings" &&
//             renderDropdown(["High to low", "Low to high", "5 star only"])}
//         </button>
//       </div>
//       <p className="search-bar-line"></p>

//       <div className="restaurant-box-container">
//         {/* The RestaurantList component is used here */}
//         <RestaurantList />
//       </div>

     
//     </div>
//   );
// };

// export default Home; 