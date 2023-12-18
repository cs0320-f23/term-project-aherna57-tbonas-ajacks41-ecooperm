import { useEffect, useState } from "react";
import styles from "../styles/about.module.css";
import Cookies from "js-cookie";

import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";
import React from "react";
import Link from "next/link";


/// intrface placeholder for now --- update when reviews are implemented
interface Review {}

/**The UserAbout component is a React functional component that retrieves and displays user information stored in local storage. 
 * It includes sections for the user's bio, email, phone, and location. In case of any parsing errors or missing user data, 
 * the component returns a message indicating the absence of user data. Additionally, the component displays a section for restaurant 
 * suggestions with placeholder names. The overall purpose of the file is to present a structured and visually appealing display of 
 * user information and restaurant suggestions. */

// Functional component definition for the UserAbout component

const UserAbout = ({data, recs}: any) => {  
  const safeRecs = recs || [];


  return (
    <div className={styles.abContainer}>
      {/* About Section */}
      <div className={styles.wrapperAbout}>
        <span className={styles.headerText}>About</span>
        <hr className={styles.divider} />
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Bio:</span>
          <span className={styles.aboutInfoAns}>No Bio</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Email:</span>
          <span className={styles.aboutInfoAns}>{data.email}</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Phone:</span>
          <span className={styles.aboutInfoAns}>No Phone</span>
        </div>
        <div className={styles.aboutRow}>
          <span className={styles.aboutInfo}>Location:</span>
          <span className={styles.aboutInfoAns}>No Location</span>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className={styles.sugContainer}>
        <span className={styles.headerText}>Suggestions</span>
        <hr className={styles.divider} />
        <div className={styles.wrapperSuggestions}>
          {safeRecs.map((rec: any, index: any) => (
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

export default UserAbout;
