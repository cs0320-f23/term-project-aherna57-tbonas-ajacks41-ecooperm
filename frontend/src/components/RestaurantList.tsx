import React from "react";
import RestaurantBox from "./RestaurantBox";

const RestaurantList: React.FC = () => {
  const restaurants = [
    {
      name: "Baja's Taqueria",
      imageUrl: "baja.jpg",
      cuisineType: "Mexican",
      dollarSigns: 1,
      stars: 2,
      reviews: 10,
      address: "123 Main St, Cityville",
    },
    {
      name: "Amy's",
      imageUrl: "amy.jpg",
      cuisineType: "Diner",
      dollarSigns: 2,
      stars: 5,
      reviews: 6,
      address: "456 Second St, Townsville",
    },
  ];

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
