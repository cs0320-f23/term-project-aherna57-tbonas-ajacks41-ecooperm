// FoodCrawl.tsx

import React, { useState } from "react";
import styles from "../styles/foodcrawl.module.css";
import MyHome from "../container/myhome";

const sampleRestaurantData = ["Restaurant A", "Restaurant B", "Restaurant C"];

const FoodCrawl: React.FC = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <MyHome />

      <div className={styles.foodCrawlContainer}>
        <h1 className={styles.title}>Here is Your Personalised Food Crawl!</h1>
        <p className={styles.subtitle}>
          Start at the top and work your way through. Let us know what you think
          along the way!
        </p>
        <div className={styles.imageContainer}>
          <img src="/map.png" alt="Map" className={styles.mapImage} />
        </div>

        <div className={styles.restaurantList}>
          <h2 className={styles.listTitle}>Start Here!</h2>

          <p>
            {sampleRestaurantData.map((restaurant, index) => (
              <li key={index}>
                <div className={styles.restaurantItem}>{restaurant}</div>
                <div className={styles.arrowContainer}>
                  <img
                    className={styles.arrowImage}
                    src={index % 2 === 0 ? "/arrow1.png" : "/arrow2.png"}
                    alt="Arrow"
                  />
                </div>
              </li>
            ))}
          </p>
        </div>

        <h2 className={styles.congratsTitle}>Congratulations, You Made It!</h2>
      </div>
    </div>
  );
};

export default FoodCrawl;
