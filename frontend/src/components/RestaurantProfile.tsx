import { CSSProperties, useState } from "react";
import "../styles/RestaurantProfile.css";
import { useParams } from "react-router-dom";
import { restaurants } from "../mockRestaurants/restaurants";
import RestaurantAbout from "./RestaurantAbout";
import ReviewR from "./ReviewR";



const RestaurantProfile = () => {
  const { restaurantId } = useParams();
  const restaurantProfileData = restaurants.find((restaurant) => restaurant.id.toString() === restaurantId);
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
