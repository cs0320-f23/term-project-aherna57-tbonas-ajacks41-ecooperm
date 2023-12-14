import React from "react";
import { Link } from "react-router-dom";
import "../styles/RestaurantBox.css";

/** The RestaurantBox component is a React functional component designed to render a box containing information 
 * about a restaurant. It takes in restaurant data as a prop and displays details such as the restaurant image, name, cuisine type, 
 * star ratings, reviews, dollar signs, and address. The component also includes a link to the restaurant's profile page. 
 * The overall purpose of the file is to provide a reusable and visually appealing presentation of restaurant information within a box format.*/

// Props interface for the RestaurantBox component
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

// Functional component definition for the RestaurantBox component
const RestaurantBox: React.FC<RestaurantBoxProps> = ({ restaurantData }) => {
  // Destructuring the restaurantData prop
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

  // Function to generate star symbols based on the given count
  const createStars = (count?: number) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#9733;
      </span>
    ));
  };

  // Function to generate dollar sign symbols based on the given count
  const createDollarSigns = (count?: number) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#36;
      </span>
    ));
  };

  // JSX structure for the RestaurantBox component
  return (
    <div className="restaurant-box">
      <div className="image-container">
        <img src={imageUrl} alt="Restaurant" />
      </div>
      <div className="info-container">
        {/* Link to the restaurant profile page */}
        <Link className="titleRest" to={`/restaurant-profile/${id}`}>
          {name}{" "}
        </Link>
        <p className="cuisine">{cuisineType}</p>
        <div className="ratings">
          {/* Displaying star symbols based on the star count */}
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

// Default export for the RestaurantBox component
export default RestaurantBox;
