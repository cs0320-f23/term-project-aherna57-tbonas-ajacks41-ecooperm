import React, { useState } from "react";
import styles from "../styles/Review.module.css";
import {
  userMockReview,
  userMockReview2,
} from "../mockedUser/user1Mock";

const reviews = [userMockReview, userMockReview2];

const Review = () => {
  const handleDelete = (index: number) => {
    console.log("deleting review", index);
  };

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

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1 className={styles.reviewTitle}>REVIEWS</h1>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className={styles.wrapperReview}>
          <span className={styles.timeText}>{review.timeAgo}</span>

          <hr className={styles.divider} />
          <div className={styles.reviewURestaurant}> User Name</div>
          <div className={styles.ratingContainer}>
            {renderStars(review.rating)}
          </div>
          <span className={styles.reviewText}>{review.review}</span>
          <hr className={styles.divider} />

          <div className={styles.reviewImageContainer}>
            <img
              className={styles.reviewImage}
              src={review.image}
              alt="Review"
            />
          </div>
          <hr className={styles.divider} />
        </div>
      ))}
    </div>
  );
};

export default Review;
