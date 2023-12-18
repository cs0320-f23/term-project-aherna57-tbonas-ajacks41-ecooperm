import { Restaurant } from "@prisma/client";
import styles from "../styles/about.module.css";

/**The RestaurantAbout component is a React functional component responsible for
 * displaying information about a restaurant, including details such as cuisine type, phone number, and location.
 * It also provides a link to view the restaurant's menu.
 * Additionally, the component includes a section displaying suggestions for similar restaurants,
 * with placeholder names for illustration. The overall purpose of the file is to present a structured and visually
 * appealing display of restaurant details along with suggestions for users. */

// Functional component definition for the RestaurantAbout component
const RestaurantAbout = (props: { restaurant: Restaurant }) => {
  const restaurant = props.restaurant;


  if (!restaurant) {
    return <div>No restaurant data available</div>;
  }

  return (
    <div className={styles.abContainer}>
      {/* About Section */}
      <div className={styles.wrapperAbout}>
        <span className={styles.headerText}>About</span>
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
          <span className={styles.aboutInfoAns}>{restaurant.address}</span>
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
          <span>restaurant 1</span>
          <hr className={styles.divider} />
          <span>restaurant 2</span>
          <hr className={styles.divider} />
          <span>restaurant 3</span>
          <hr className={styles.divider} />
          <span>restaurant 4</span>
          <hr className={styles.divider} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantAbout;
