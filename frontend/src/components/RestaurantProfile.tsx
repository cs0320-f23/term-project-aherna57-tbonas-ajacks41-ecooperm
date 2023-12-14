import { CSSProperties, useState } from "react";
import "../styles/RestaurantProfile.css";
import { useParams } from "react-router-dom";
import { restaurants } from "../mockRestaurants/restaurants";
import RestaurantAbout from "./RestaurantAbout";
import ReviewR from "./ReviewR";

/**The RestaurantProfile component is a React functional component that displays detailed information about a specific restaurant. 
 * It utilizes the useParams hook to extract the restaurantId from the route parameters and then retrieves the corresponding restaurant 
 * data from the mock data. The component includes sections for the restaurant container with a background image, the restaurant name, 
 * and two main containers for reviews and restaurant information. The overall purpose of the file is to provide a visually appealing and 
 * informative display of a restaurant's profile. */

// Functional component definition for the RestaurantProfile component
const RestaurantProfile = () => {
  // Extracting restaurantId from the route parameters
  const { restaurantId } = useParams();

  // Retrieving restaurant data based on the restaurantId
  const restaurantProfileData = restaurants.find(
    (restaurant) => restaurant.id.toString() === restaurantId
  );

  // State variable to manage the restaurant data
  const [restaurant, setRestaurant] = useState<any>(restaurantProfileData);

  // Style for setting the background image of the restaurant container
  const restBackground: CSSProperties = {
    backgroundImage: `url(${restaurant.background})`,
  };

  // JSX structure for the RestaurantProfile component
  return (
    <div>
      {/* Restaurant Container with Background Image */}
      <div className="restaurant-container" style={restBackground}>
        {/* User Top Container */}
        <div className="restaurant-content">
          {/* Displaying the restaurant name */}
          <span className="restaurant-name">
            {restaurant && `${restaurant.name}`}
          </span>
        </div>
      </div>

      {/* Main User Container */}
      <div className="main-user-container">
        {/* Left Container for Reviews */}
        <div className="left-container">
          {/* Reviews Component */}
          <ReviewR />
        </div>

        {/* Right Container for Restaurant Information */}
        <div className="right-container">
          {/* RestaurantAbout Component with restaurant data as prop */}
          <RestaurantAbout restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

// Default export for the RestaurantProfile component
export default RestaurantProfile;
