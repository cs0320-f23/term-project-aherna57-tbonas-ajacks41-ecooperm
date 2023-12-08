import React from "react";
import RestaurantBox from "./RestaurantBox";
import "../styles/index.css";
import { restaurants } from "../mockRestaurants/restaurants";


const RestaurantList: React.FC = () => {

  const sortedRestaurants = [...restaurants].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="restaurant-box-container">
      {sortedRestaurants.map((restaurant, index) => (
        <RestaurantBox key={index} restaurantData={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
