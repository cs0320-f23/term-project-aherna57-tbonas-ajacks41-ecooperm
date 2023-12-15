import React from "react";
import Link from "next/link";
import styles from "../styles/restaurantbox.module.css";
import { useRouter } from "next/router";

interface RestaurantBoxProps {
  restaurantData: {
    id: number;
    imageUrl?: string;
    name?: string;
    cuisineType?: string;
    dollarSigns?: number | undefined;
    stars?: number | undefined;
    reviews?: number;
    address?: string;
  };
}

const RestaurantBox: React.FC<RestaurantBoxProps> = ({ restaurantData }) => {

  const router = useRouter();

  const {
    id,
    imageUrl,
    name,
    cuisineType,
    dollarSigns,
    stars,
    reviews,
    address,
  } = restaurantData;

  const createStars = (count?: number) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#9733;
      </span>
    ));
  };

  const createDollarSigns = (count?: number) => {
    return Array.from({ length: count || 0 }, (_, index) => (
      <span key={index} style={{ marginRight: "3px" }}>
        &#36;
      </span>
    ));
  };

  return (
    <Link href={`/restaurant-profile/${id}`} className={styles.restaurantBox}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt="Restaurant" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.titleRest}>{name}</div>
        <p className={styles.cuisine}>{cuisineType}</p>
        <div className={styles.ratings}>
          <span style={{ marginRight: "3px" }}>&#9733;</span>
          {createStars(stars)}
          <span style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
            {reviews} reviews
          </span>
        </div>
        <div className={styles.dollarSigns}>{createDollarSigns(dollarSigns)}</div>
        <p className={styles.address}>{address}</p>
      </div>
    </Link>
  );
};

export default RestaurantBox;
