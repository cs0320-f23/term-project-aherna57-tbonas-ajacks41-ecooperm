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


const RestaurantProfile: NextPage<{ id: string }> = ({ id }) => {
  //TODO: Need to change this with props
  // const restaurant = client.restaurants.getById.useQuery({
  //   id: "clq2uwq3u000012iwtstwjr4j",
  // });

  const { data } = api.restaurants.getById.useQuery({
    id
  });

  if (!data) return <div>404</div>;



  const restBackground: CSSProperties = {
    backgroundImage: data ? `url(${data.imageUrl})` : "",
  };

  return (
    <div>
      <div className={styles.restaurantContainer} style={restBackground}>
        {/* User Top Container */}
        <div className={styles.restaurantContent}>
          <span className={styles.restaurantName}>
             {data.name}
          </span>
        </div>
      </div>
      <div className={styles.mainUserContainer}>
        <div className={styles.leftContainer}>
          <ReviewR />
        </div>
        <div className={styles.rightContainer}>
          <RestaurantAbout restaurant={data.description} />
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
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};


export default RestaurantProfile;
