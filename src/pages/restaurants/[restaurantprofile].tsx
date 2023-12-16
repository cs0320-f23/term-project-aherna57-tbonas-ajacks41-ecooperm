import React, { CSSProperties, useState, useEffect } from "react";
import styles from "../../styles/RestaurantProfile.module.css";
import { useParams } from "react-router-dom";
import { restaurants } from "../../mockRestaurants/restaurants";
import RestaurantAbout from "../../components/RestaurantAbout";
import ReviewR from "../../components/ReviewR";
import { api } from "~/src/utils/api";
//import { Restaurant } from "@prisma/client";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";


const RestaurantProfile: NextPage<{ resId: number }> = ({ resId }) => {
  //TODO: Need to change this with props
  // const restaurant = client.restaurants.getById.useQuery({
  //   id: "clq2uwq3u000012iwtstwjr4j",
  // });

  // const { data } = api.restaurants.getById.useQuery({
  //   id: "clq2uwq3u000012iwtstwjr4j",
  // });

  const { restaurantId } = useParams();
  const restaurantProfileData = restaurants.find(
    (restaurant) => restaurant.id.toString() === restaurantId
  );
  const [restaurant, setRestaurant] = useState<any>(restaurantProfileData);

  console.log("restaurant", restaurant);
  const restBackground: CSSProperties = {
    backgroundImage: restaurant ? `url(${restaurant.imageUrl})` : "",
  };

  return (
    <div>
      <div className={styles.restaurantContainer} style={restBackground}>
        {/* User Top Container */}
        <div className={styles.restaurantContent}>
          <span className={styles.restaurantName}>
            {restaurant && `${restaurant.name}`}
          </span>
        </div>
      </div>
      <div className={styles.mainUserContainer}>
        <div className={styles.leftContainer}>
          <ReviewR />
        </div>
        <div className={styles.rightContainer}>
          <RestaurantAbout restaurant={restaurant} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const restaurantprofile = context.params?.restaurantprofile;

  if (typeof restaurantprofile !== "string") throw new Error("no restaurantprofile");

  await ssg.restaurants.getById.prefetch({ id: restaurantprofile });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: restaurantprofile,
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_GOOGLE: process.env.NEXT_PUBLIC_GOOGLE,
      //NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};


export default RestaurantProfile;
