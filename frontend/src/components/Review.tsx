import React, { useState } from "react";
import "../styles/Review.css";
import { userMockReview, userMockReview2 } from "../mockedUser/user1Mock";

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
      <div className="title-container">
        <h1 className="review-title">MY REVIEWS</h1>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className="wrapper-review">
          <span className="time-text">{review.timeAgo}</span>
          <hr className="divider" />
          <div className="review-restaurant"> {review.restaurantName}</div>
          <div className="rating-container">{renderStars(review.rating)}</div>
          <span className="review-text">{review.review}</span>
          <hr className="divider" />

          <div className="review-image-container">
            <img className="review-image" src={review.image} alt="Review" />
          </div>
          <hr className="divider" />
        </div>
      ))}
    </div>
  );
};

export default Review;
