import React from "react";
import RestaurantBox from "./RestaurantBox";
import styles from "../styles/restaurantbox.module.css";
import { restaurants } from "../mockRestaurants/restaurants";
import { api } from "../utils/api";
import {Restaurant} from "@prisma/client";
import { LoadingPage } from "./loading";

/**The RestaurantList component is a React functional component responsible for rendering a list of restaurants. 
 * It utilizes the RestaurantBox component to display detailed information about each restaurant. The list is sorted 
 * alphabetically by restaurant name, providing a structured and organized presentation of restaurant data. 
 * The overall purpose of the file is to create a component that generates a visually consistent and ordered display of 
 * restaurant information within a container. */

// Functional component definition for the RestaurantList component

const RestaurantList: React.FC = () => {
  // Sorting the restaurants alphabetically by name
  // const sortedRestaurants = [...restaurants].sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );

  const { data, isLoading: restaurantsLoading } = api.restaurants.getAll.useQuery();

 

  if (restaurantsLoading) {
    console.log(data);
     return (
      <div className="flex grow">
        <LoadingPage />
      </div>
     );
  }


  if (!data) return <div>Something went wrong...</div>;
  

  return (
    <div className={styles.restaurantBoxContainer}>
      {data.map((restaurant: Restaurant, index: number) => (
        <RestaurantBox {...restaurant} key={restaurant.id}  />
      ))}
    </div>
  );
};

export default RestaurantList;
