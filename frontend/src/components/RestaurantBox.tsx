import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

interface RestaurantBoxProps {
  restaurantData: {
    id: number;
    imageUrl?: string;
    name?: string;
    cuisineType?: string;
    dollarSigns?: number | undefined;
    stars?: number | undefined;
    reviews?: number;
    address?: string;
  };
}

const RestaurantBox: React.FC<RestaurantBoxProps> = ({ restaurantData }) => {
  const {
    id,
    imageUrl,
    name,
    cuisineType,
    dollarSigns,
    stars,
    reviews,
    address,
  } = restaurantData;

  const createStars = (count?: number) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#9733;
      </span>
    ));
  };

  const createDollarSigns = (count?: number) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#36;
      </span>
    ));
  };

  return (
    <div className="restaurant-box">
      <div className="image-container">
        <img src={imageUrl} alt="Restaurant" />
      </div>
      <div className="info-container">
        <Link className="titleRest" to={`/restaurant-profile/${id}`}>
          {name} {" "}
        </Link>
        <p className="cuisine">{cuisineType}</p>
        <div className="ratings">
          {createStars(stars)}
          <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
            {reviews} reviews
          </span>
        </div>
        <div className="dollar-signs">{createDollarSigns(dollarSigns)}</div>
        <p className="address">{address}</p>
      </div>
    </div>
  );
};

export default RestaurantBox;
