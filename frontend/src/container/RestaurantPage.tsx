// RestaurantPage.tsx

import React from "react";

const RestaurantPage: React.FC = () => {
  // Sample data, replace with actual data
  const restaurantData = {
    imageUrl: "restaurant-image.jpg",
    name: "Amy's",
    cuisineType: "Diner",
    dollarSigns: 2,
    stars: 5,
    reviews: 6,
    address: "456 Second St, Townsville",
    hours: "Mon-Fri: 8 AM - 10 PM",
    menuPdfLink: "sample-menu.pdf",
    reviewsData: [
      { user: "User1", rating: 4, review: "Great experience!" },
      { user: "User2", rating: 5, review: "Amazing food!" },
      // Add more reviews as needed
    ],
  };

  return (
    <div>
      {/* Bear Bites line at the top */}
      <h1 className="header">Bear Bites</h1>

      {/* Restaurant details section */}
      <div className="restaurant-details-container">
        {/* Restaurant photo on the left */}
        <div className="restaurant-photo">
          <img src={restaurantData.imageUrl} alt="Restaurant" />
        </div>

        {/* Information on the right */}
        <div className="restaurant-info">
          <h2 className="titleRest">{restaurantData.name}</h2>
          <p className="cuisine">{restaurantData.cuisineType}</p>
          <div className="ratings">
            <span style={{ marginRight: "3px" }}>&#9733;</span>
            {/* Add star rating here */}
            <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
              {restaurantData.reviews} reviews
            </span>
          </div>
          <div className="dollar-signs">{/* Add dollar signs here */}</div>
          <p className="address">{restaurantData.address}</p>

          {/* Hours section */}
          <div className="hours-section">
            <h3>Hours:</h3>
            <p>{restaurantData.hours}</p>
          </div>

          {/* Menu PDF link */}
          <div className="menu-section">
            <h3>Menu:</h3>
            <a
              href={restaurantData.menuPdfLink}
              target="_blank"
              rel="noreferrer"
            >
              View Menu (PDF)
            </a>
          </div>

          {/* Reviews section */}
          <div className="reviews-section">
            <h3>Reviews:</h3>
            <ul>
              {/* Map through reviewsData and render each review */}
              {restaurantData.reviewsData.map((review, index) => (
                <li key={index}>
                  <p>{`${review.user}: ${review.review}`}</p>
                  <p>{`Rating: ${review.rating} stars`}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
