import { useEffect, useState } from "react";
import styles from "../styles/about.module.css";
import Cookies from "js-cookie";

/// intrface placeholder for now --- update when reviews are implemented
interface Review {}



const UserAbout = () => {
  // Retrieving user data from local storage
  const userItem = Cookies.get("user");
  let user = null;

  // Parsing user data and handling potential errors
  if (userItem && userItem !== "undefined") {
    try {
      user = JSON.parse(userItem);
    } catch (e) {
      // Log and clear local storage in case of parsing error
      console.error("Error parsing user data:", e);
      
    }
  }

  // console.log("userItem", userItem);
  // if (userItem && userItem !== "undefined") {
  //   let user = JSON.parse(userItem);
  //   setUser(user);
  // }

  // const user =
  //   userItem && userItem !== "undefined"
  //     ? JSON.parse(userItem)
  //     : localStorage.clear();

  // Return a message if no user data is available
  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className={styles.abContainer}>
      {/* About Section */}
      <div className={styles.wrapperAbout}>
        <span className={styles.headerText}>About</span>
        <hr className={styles.divider} />
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Bio:</span>
          <span className={styles.aboutInfoAns}>{user.bio}</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Email:</span>
          <span className={styles.aboutInfoAns}>{user.email}</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Phone:</span>
          <span className={styles.aboutInfoAns}>{user.phone}</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Location:</span>
          <span className={styles.aboutInfoAns}>{user.location}</span>
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

export default UserAbout;
