import React from "react";
import "../styles/Review.module.css";
import {
  userMockReview,
  userMockReview2,
} from "../mockedUser/user1Mock";

/** The Review component is a React functional component that renders a collection of user reviews. 
 * It uses mocked review data for illustration. The component includes sections for the review title, 
 * time ago text, restaurant name, star ratings, review text, and an optional review image. Each review 
 * is presented within a wrapper container, providing a visually organized and informative representation of user reviews. 
 * The overall purpose of the file is to display a user's reviews in a visually appealing manner.
 */

// Array of mocked user reviews
const reviews = [userMockReview, userMockReview2];

// Functional component definition for the Review component
const Review = () => {
  const handleDelete = (index: number) => {
    console.log("deleting review", index);
  };

  // Function to render star symbols based on the given rating
  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  // JSX structure for the Review component
  return (
    <div>
      <div className="title-container">
        <h1 className="review-title">MY REVIEWS</h1>
      </div>
      {/* Mapping through the reviews array and rendering individual review components */}
      {reviews.map((review, index) => (
        <div key={index} className="wrapper-review">
          {/* Time Ago Text */}
          <span className="time-text">{review.timeAgo}</span>
          <hr className="divider" />

          {/* Restaurant Name */}
          <div className="review-restaurant"> {review.restaurantName}</div>

          {/* Rating Container */}
          <div className="rating-container">{renderStars(review.rating)}</div>

          {/* Review Text */}
          <span className="review-text">{review.review}</span>
          <hr className="divider" />

          {/* Review Image Container */}
          <div className="review-image-container">
            <img className="review-image" src={review.image} alt="Review" />
          </div>
          <hr className="divider" />
        </div>
      ))}
    </div>
  );
};

// Default export for the Review component
export default Review;
