import { Restaurant } from "@prisma/client";
import styles from "../styles/about.module.css";
import React from "react";
import Link from "next/link";

/**The RestaurantAbout component is a React functional component responsible for
 * displaying information about a restaurant, including details such as cuisine type, phone number, and location.
 * It also provides a link to view the restaurant's menu.
 * Additionally, the component includes a section displaying suggestions for similar restaurants,
 * with placeholder names for illustration. The overall purpose of the file is to present a structured and visually
 * appealing display of restaurant details along with suggestions for users. */

// Functional component definition for the RestaurantAbout component

type RestaurantAboutProps = {
  props: Restaurant;
  recs?: any[]; // Use an optional type here to indicate that 'recs' can be undefined
};

const RestaurantAbout: React.FC<RestaurantAboutProps> = ({ props, recs }) => {
  const restaurant = props;
  const safeRecs = recs || [];

  if (!restaurant) {
    return <div>No restaurant data available</div>;
  }

  return (
    <div className={styles.abContainer}>
      {/* About Section */}
      <div className={styles.wrapperAbout}>
        <span className={styles.headerText}>About</span>
        <span>{restaurant.description}</span>
        <hr className={styles.divider} />
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Cuisine Type:</span>
          <span className={styles.aboutInfoAns}>Feature coming soon!</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Phone:</span>
          <span className={styles.aboutInfoAns}>{restaurant.phone}</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Location:</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              restaurant.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aboutInfoAnsLink}
          >
            {restaurant.address}
          </a>
        </div>

        <div className={styles.aboutRow}>
          {restaurant.menuUrl !== null ? (
            <a
              href={restaurant.menuUrl}
              className={styles.aboutInfoAns}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Menu
            </a>
          ) : (
            <span className={styles.aboutInfo}> Sorry, no menu found</span>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      <div className={styles.sugContainer}>
        <span className={styles.headerText}>Suggestions</span>
        <hr className={styles.divider} />
        <div className={styles.wrapperSuggestions}>
      {safeRecs.map((rec, index) => (
        <React.Fragment key={index}>
          <div className={styles.suggestionItem}>
            <img
              src={rec.imageUrl} 
              alt={rec.name}
              width={50} 
              height={50}
              className={styles.restaurantImage}
            />
            <Link href={`/restaurants/${rec.id}`}>
              <div className={styles.sugText}>{rec.name}</div>
            </Link>
          </div>
          <hr className={styles.divider} />
        </React.Fragment>
      ))}
    </div>
      </div>
    </div>
  );
};

export default RestaurantAbout;
