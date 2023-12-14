import React, { CSSProperties, useState, useEffect } from "react";
import "../styles/RestaurantProfile.css";
import { useParams } from "react-router-dom";
import { restaurants } from "../mockRestaurants/restaurants";
import RestaurantAbout from "./RestaurantAbout";
import ReviewR from "./ReviewR";
import { client } from "~/utils/client";
import { api } from "~/utils/api";

const RestaurantProfile = () => {
  //TODO: Need to change this with props
  // const restaurant = client.restaurants.getById.useQuery({
  //   id: "clq2uwq3u000012iwtstwjr4j",
  // });

  const { restaurant } = api.reviews.getById.useQuery({
    id: "clq2uwq3u000012iwtstwjr4j",
  });

  const { restaurantId } = useParams();
  const restaurantProfileData = restaurants.find(
    (restaurant) => restaurant.id.toString() === restaurantId
  );
  const [restaurant, setRestaurant] = useState<any>(restaurantProfileData);
  const restBackground: CSSProperties = {
    backgroundImage: `url(${restaurant.background})`,
  };

  return (
    <div>
      <div className="restaurant-container" style={restBackground}>
        {/* User Top Container */}
        <div className="restaurant-content">
          <span className="restaurant-name">
            {restaurant && `${restaurant.name}`}
          </span>
        </div>
      </div>
      <div className="main-user-container">
        <div className="left-container">
          <ReviewR />
        </div>
        <div className="right-container">
          <RestaurantAbout restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
