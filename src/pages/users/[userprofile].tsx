import React, { CSSProperties, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "~/src/styles/UserProfile.module.css";
import UserAbout from "~/src/components/UserAbout";
import Review from "~/src/components/Review";
import Cookies from "js-cookie";
import { api } from "~/src/utils/api";
import { LoadingPage } from "../../components/loading";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";

/// intrface placeholder for now --- update when reviews are implemented
interface Review {}


const UserProfile: NextPage<{ userId: string }> = ({ userId }) => {
  const { data } = api.profile.getUserById.useQuery({
    userId,
  });

  const userBackground: CSSProperties = {
    backgroundImage: `url('https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop-1024x576.jpg')`,
  };

  //const { userId } = useParams();

  console.log("data", data);

  if (!data) return <div>404</div>;

  const getMembershipStatus = (reviews: Review[]) => {
    const numberOfReviews = reviews.length;
    if (numberOfReviews <= 3) return "Brunonian Bites Novice";
    if (numberOfReviews <= 6) return "Pembroke Palate Explorer";
    if (numberOfReviews <= 10) return "Ivy League Gastronome";
    if (numberOfReviews <= 20) return "College Hill Culinary Connoisseur";
    return "President's Table Elite";
  };

  return (
    <div>
      <div className={styles.userContainer} style={userBackground}>
        {/* User Top Container */}
        <div className={styles.userContent}>
          <div className={styles.userImage}>
            <>
              <img
                src={data.profileImageUrl}
                alt={`${
                  data.firstName ?? data.email ?? "unknown"
                }'s profile pic`}
                className={styles.avatar}
              />
            </>
          </div>

          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {`${data.firstName} ${data.lastName}`}
            </span>
            <span className={styles.userClass}>{}</span>
          </div>
        </div>
      </div>
      <div className={styles.mainUserContainer}>
        {/* User Reviews */}
        <div className={styles.leftContainer}>
          <Review />
        </div>

        {/* User About & Suggestions */}
        <div className={styles.rightContainer}>
          <UserAbout />
        </div>
      </div>
    </div>
  );
};


export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const userprofile = context.params?.userprofile;

  if (typeof userprofile !== "string") throw new Error("no userprofile");

  const userId = userprofile.replace("@", "");

  await ssg.profile.getUserById.prefetch({ userId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default UserProfile;
