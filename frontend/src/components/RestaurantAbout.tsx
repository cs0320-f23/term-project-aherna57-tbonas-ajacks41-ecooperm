import "../styles/UserAbout.css";

/**The RestaurantAbout component is a React functional component responsible for 
 * displaying information about a restaurant, including details such as cuisine type, phone number, and location. 
 * It also provides a link to view the restaurant's menu. 
 * Additionally, the component includes a section displaying suggestions for similar restaurants, 
 * with placeholder names for illustration. The overall purpose of the file is to present a structured and visually 
 * appealing display of restaurant details along with suggestions for users. */

// Functional component definition for the RestaurantAbout component
const RestaurantAbout = ({ restaurant }: any) => {
  // Extracting restaurant data from props
  restaurant = restaurant;

  // Retrieving user information from local storage
  const userItem = localStorage.getItem("user");
  const user =
    userItem && userItem !== "undefined"
      ? JSON.parse(userItem)
      : localStorage.clear();

  // JSX structure for the RestaurantAbout component
  return (
    <div className="ab-container">
      {/* About Section */}
      <div className="wrapper-about">
        <span className="header-text">About</span>
        <hr className="divider" />
        <div className="about-row">
          <span className="about-info">Cuisine Type:</span>
          <span className="about-info-ans">{restaurant.cuisineType}</span>
        </div>
        <div className="about-row">
          <span className="about-info">Phone:</span>
          <span className="about-info-ans">{restaurant.phone}</span>
        </div>
        <div className="about-row">
          <span className="about-info">Location:</span>
          <span className="about-info-ans">{restaurant.address}</span>
        </div>
        <div className="about-row">
          {/* Link to view the restaurant menu */}
          <a
            href={restaurant.menu}
            className="about-info-ans"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Menu
          </a>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="sug-container">
        <span className="header-text">Similar Restaurants:</span>
        <hr className="divider" />
        <div className="wrapper-suggestions">
          {/* Placeholder suggestions for similar restaurants */}
          <span>restaurant 1</span>
          <hr className="divider" />
          <span>restaurant 2</span>
          <hr className="divider" />
          <span>restaurant 3</span>
          <hr className="divider" />
          <span>restaurant 4</span>
          <hr className="divider" />
        </div>
      </div>
    </div>
  );
};

// Default export for the RestaurantAbout component
export default RestaurantAbout;
