import React from "react";
import RestaurantBox from "./RestaurantBox";
import "../styles/index.css";
import { restaurants } from "../mockRestaurants/restaurants";

/**The RestaurantList component is a React functional component responsible for rendering a list of restaurants. 
 * It utilizes the RestaurantBox component to display detailed information about each restaurant. The list is sorted 
 * alphabetically by restaurant name, providing a structured and organized presentation of restaurant data. 
 * The overall purpose of the file is to create a component that generates a visually consistent and ordered display of 
 * restaurant information within a container. */

// Functional component definition for the RestaurantList component
const RestaurantList: React.FC = () => {
  // Sorting the restaurants alphabetically by name
  const sortedRestaurants = [...restaurants].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // JSX structure for the RestaurantList component
  return (
    <div className="restaurant-box-container">
      {/* Mapping through the sortedRestaurants array and rendering RestaurantBox for each restaurant */}
      {sortedRestaurants.map((restaurant, index) => (
        <RestaurantBox key={index} restaurantData={restaurant} />
      ))}
    </div>
  );
};

// Default export for the RestaurantList component
export default RestaurantList;
