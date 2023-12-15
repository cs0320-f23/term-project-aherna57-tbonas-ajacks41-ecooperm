import styles from "../styles/about.module.css";

const RestaurantAbout = ( {restaurant} : any) => {
    restaurant = restaurant;
    const userItem = localStorage.getItem("user");
    const user =
        userItem && userItem !== "undefined"
        ? JSON.parse(userItem)
        : localStorage.clear();
    return (
      <div className={styles.abContainer}>
        {/* About Section */}
        <div className={styles.wrapperAbout}>
          <span className={styles.headerText}>About</span>
          <hr className={styles.divider} />
          <div className={styles.aboutRow}>
            <span className={styles.aboutInfo}>Cuisine Type:</span>
            <span className={styles.aboutInfoAns}>{restaurant.cuisineType}</span>
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
            <a href={restaurant.menu} className={styles.aboutInfoAns} target="_blank" rel="noopener noreferrer">
                View Menu
            </a>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className={styles.sugContainer}>
          <span className={styles.headerText}>Similar Restaurants</span>
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
