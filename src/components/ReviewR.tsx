// Importing necessary dependencies and styles
import React, { useState } from "react";
import styles from "../styles/Review.module.css";
import { userMockReview, userMockReview2 } from "../mockedUser/user1Mock";

// Array of mocked user reviews
const reviews = [userMockReview, userMockReview2];

// Functional component for rendering reviews
const Review = () => {
  // Handler function for deleting a review
  const handleDelete = (index: number) => {
    console.log("deleting review", index);
  };

  // Function to render star icons based on the rating
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

  // Main component rendering reviews
  return (
    <div>
      {/* Title container for the reviews section */}
      <div className={styles.titleContainer}>
        <h1 className={styles.reviewTitle}>REVIEWS</h1>
      </div>

      {/* Mapping through the array of reviews and rendering each review */}
      {reviews.map((review, index) => (
        <div key={index} className={styles.wrapperReview}>
          {/* Displaying the time of the review */}
          <span className={styles.timeText}>{review.timeAgo}</span>

          {/* Divider line separating review elements */}
          <hr className={styles.divider} />

          {/* Displaying the username associated with the review */}
          <div className={styles.reviewURestaurant}> User Name</div>

          {/* Container for displaying star ratings */}
          <div className={styles.ratingContainer}>
            {renderStars(review.rating)}
          </div>

          {/* Displaying the review text */}
          <span className={styles.reviewText}>{review.review}</span>

          {/* Divider line separating review elements */}
          <hr className={styles.divider} />

          {/* Container for displaying review images */}
          <div className={styles.reviewImageContainer}>
            <img
              className={styles.reviewImage}
              src={review.image}
              alt="Review"
            />
          </div>

          {/* Divider line separating review elements */}
          <hr className={styles.divider} />
        </div>
      ))}
    </div>
  );
};

// Exporting the Review component as the default export
export default Review;
