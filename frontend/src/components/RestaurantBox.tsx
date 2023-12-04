import React from "react";
import { Link } from "react-router-dom";

interface RestaurantBoxProps {
  restaurantData: {
    imageUrl?: string;
    name?: string;
    cuisineType?: string;
    dollarSigns?: number;
    stars?: number;
    address?: string;
  };
}

const RestaurantBox: React.FC<RestaurantBoxProps> = ({ restaurantData }) => {
  const {
    imageUrl = "/baja.jpg",
    name = "Baja's Taqueria",
    cuisineType = "Mexican",
    dollarSigns = 3,
    stars = 5,
    address = "123 Main St, Cityville",
  } = restaurantData;

  return (
    <div className="restaurant-box">
      <div className="image-container">
        <img src={imageUrl} alt="Restaurant" />
      </div>
      <div className="info-container">
        <Link to="/restaurant-details" className="titleRest">
          {name}
        </Link>
        <p className="cuisine">{cuisineType}</p>
        <div className="ratings">
          {Array.from({ length: dollarSigns }, (_, index) => (
            <span key={index}>$</span>
          ))}
          {Array.from({ length: stars }, (_, index) => (
            <span key={index}>&#9733;</span>
          ))}
        </div>
        <p className="address">{address}</p>
      </div>
    </div>
  );
};

export default RestaurantBox;
