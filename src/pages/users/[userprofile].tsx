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

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureURL: string;
  updatedAt: Date;
  createdAt: Date;
  reviews: Review[];
  // favorites: Restaurant[];
}

const UserProfile: NextPage<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const userBackground: CSSProperties = {
    backgroundImage: `url('https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop-1024x576.jpg')`,
  };
  //const { userId } = useParams();

  // const { data, isLoading } = api.reviews.getByUserId.useQuery({
  //   userId: props.userId,
  // });

  //if (!data || data.length === 0) return <div>User has not posted.</div>;

  useEffect(() => {
    const userCookie = Cookies.get("user");
    // console.log("userItem", userItem);
    // if (userItem && userItem !== "undefined") {
    //   let user = JSON.parse(userItem);
    //   setUser(user);
    // }
  }, [userId]);

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
            {user && (
              <>
                <img
                  src={user.profilePictureURL}
                  alt="Avatar"
                  className={styles.avatar}
                />
              </>
            )}
          </div>

          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user && `${user.firstName} ${user.lastName}`}
            </span>
            <span className={styles.userClass}>
              {user && getMembershipStatus(user.reviews)}
            </span>
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

  await ssg.profile.getByUserId.prefetch({ id: userprofile });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: userprofile,
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

export default UserProfile;
