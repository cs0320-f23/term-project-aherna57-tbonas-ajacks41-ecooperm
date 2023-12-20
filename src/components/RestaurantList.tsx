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
  // Sorting the restaurants alphabetically by name
  // const sortedRestaurants = [...restaurants].sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );

  // const { data, isLoading: restaurantsLoading } = api.restaurants.getAll.useQuery();

  // if (restaurantsLoading) {
  //    return (
  //     <div className="flex grow">
  //       <LoadingPage />
  //     </div>
  //    );
  // }

  // if (!data) return <div>Something went wrong...</div>;

  const createStars = (count: number | null) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#9733;
      </span>
    ));
  };

  const createDollarSigns = (count: number | null) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#36;
      </span>
    ));
  };

  // const handleBoxClick = () => {
  //   // Navigate to the restaurant profile page
  //   router.push(`${name}`);
  // };

  // JSX structure for the RestaurantList component
  return (
    <div className={styles.restaurantBoxContainer} key={props.id}>
      {/* <RestaurantBox {...fullRestaurant} RestaurantCategory={fullRestaurant.RestaurantCategory} /> */}
      <Link href={`/restaurants/${props.id}`} className={styles.restaurantBox}>
        <div className={styles.imageContainer}>
          <img src={props.imageUrl} alt="Restaurant" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.titleRest}>{props.name}</div>
          <p className={styles.cuisine}>{props.cuisineType} Cuisine Type Here</p>
          <div className={styles.ratings}>
            {/* Placeholder */}
            {createStars(5)}
            <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
              {/* Placeholder */}
              {((numReviews) => numReviews === 0 ? "No Reviews" : `${numReviews} reviews`)(0)}
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
