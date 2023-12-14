import "../styles/UserAbout.css";

const RestaurantAbout = ( {restaurant} : any) => {
    restaurant = restaurant;
    const userItem = localStorage.getItem("user");
    const user =
        userItem && userItem !== "undefined"
        ? JSON.parse(userItem)
        : localStorage.clear();
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
            <a href={restaurant.menu} className="about-info-ans" target="_blank" rel="noopener noreferrer">
                View Menu
            </a>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="sug-container">
          <span className="header-text">Similar Restaurants</span>
          <hr className="divider" />
          <div className="wrapper-suggestions">
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

export default RestaurantAbout;
