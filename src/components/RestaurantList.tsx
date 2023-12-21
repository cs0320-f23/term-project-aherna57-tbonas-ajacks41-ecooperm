import React from "react";
// import RestaurantBox from "./RestaurantBox";
import styles from "../styles/restaurantbox.module.css";
import { api } from "../utils/api";
//import {Restaurant, RestaurantCategory} from "@prisma/client";
import { LoadingPage } from "./loading";
import type { RouterOutputs } from "~/src/utils/api";
// import { restaurants } from "../mockRestaurants/restaurants";
import Link from "next/link";

/**The RestaurantList component is a React functional component responsible for rendering a list of restaurants. 
 * It utilizes the RestaurantBox component to display detailed information about each restaurant. The list is sorted 
 * alphabetically by restaurant name, providing a structured and organized presentation of restaurant data. 
 * The overall purpose of the file is to create a component that generates a visually consistent and ordered display of 
 * restaurant information within a container. */

// Functional component definition for the RestaurantList component

type FullRestaurant = RouterOutputs["restaurants"]["getAll"][number];

const RestaurantList = (props: FullRestaurant) => {
  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.star}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const createDollarSigns = (count: number | null) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#36;
      </span>
    ));
  };

  let averageRating = 0;
  if (props.Review && props.Review.length > 0) {
    const totalRating = props.Review.reduce(
      (total, review) => total + review.rating,
      0
    );
    averageRating = Math.ceil(totalRating / props.Review.length);
  }
  return (
    <div className={styles.restaurantBoxContainer} key={props.id}>
      <Link href={`/restaurants/${props.id}`} className={styles.restaurantBox}>
        <div className={styles.imageContainer}>
          <img src={props.imageUrl} alt="Restaurant" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.titleRest}>{props.name}</div>
          <p className={styles.cuisine}>
            {props.RestaurantCategory[0]?.category?.name}
          </p>
          <div className={styles.ratings}>
            {averageRating === 0 ? renderStars(5) : renderStars(averageRating)}
            &nbsp;
            <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
              {props.Review && props.Review.length > 0
                ? `${props.Review.length} ${
                    props.Review.length > 1 ? "reviews" : "review"
                  }`
                : "No Reviews"}
            </span>
          </div>
          <div className={styles.dollarSigns}>
            {createDollarSigns(props.priceCategory)}
          </div>
          <p className={styles.address}>{props.address}</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantList;
