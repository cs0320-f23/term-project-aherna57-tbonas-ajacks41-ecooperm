import React from "react";
import { Link } from "react-router-dom";

interface RestaurantBoxProps {
  restaurantData: {
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
  const { imageUrl, name, cuisineType, dollarSigns, stars, reviews, address } =
    restaurantData;

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
        <Link className="titleRest" to={`/restaurant-profile/${name}`}>
          {name} {" "}
        </Link>
        <p className="cuisine">{cuisineType}</p>
        <div className="ratings">
          <span style={{ marginRight: "3px" }}>&#9733;</span>
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
