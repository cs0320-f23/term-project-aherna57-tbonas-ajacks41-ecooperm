import React from "react";
import Link from "next/link";
import styles from "../styles/restaurantbox.module.css";
import { useRouter } from "next/router";
import type { RouterOutputs } from "~/src/utils/api";



type Restaurant = RouterOutputs["restaurants"]["getAll"][number];

const RestaurantBox = (props : Restaurant) => {

  const router = useRouter();

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

  return (
    <Link href={`/restaurants/${props.id}`} className={styles.restaurantBox}>
      <div className={styles.imageContainer}>
        <img src={props.imageUrl} alt="Restaurant" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.titleRest}>{props.name}</div>
        <p className={styles.cuisine}>{}</p>
        <div className={styles.ratings}>
          <span style={{ marginRight: "3px" }}>&#9733;</span>
          {createStars(props.rating)}
          <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
            {} reviews
          </span>
        </div>
        <div className={styles.dollarSigns}>{createDollarSigns(props.priceCategory)}</div>
        <p className={styles.address}>{props.address}</p>
      </div>
    </Link>
  );
};

export default RestaurantBox;


