
import React, { CSSProperties } from "react";
import styles from "~/src/styles/userprofile.module.css";

import UserAbout from "~/src/components/UserAbout";
import { api } from "~/src/utils/api";
import { LoadingPage } from "../../components/loading";
import MyHome from "~/src/container/myhome";
import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";
import { ReviewViewUser } from "~/src/components/ReviewViewUser";

interface Review {}

const ProfileFeed = ({ userId, reviews }: { userId: string, reviews: Review[] }) => {
  if (!reviews || reviews.length === 0)
    return (
      <>
        <div className={styles.titleContainer}>
          <h1 className={styles.reviewTitle}> MY REVIEWS </h1>{" "}
        </div>
        <div className={styles.noReview}>
          User has not reviewed any restaurants.
        </div>
      </>
    );

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.reviewTitle}>REVIEWS ({reviews.length})</h1>{" "}
      </div>
      <div className={styles.leftContainer}>
        {Array.isArray(reviews) &&
          reviews.map((fullReview: any) => (
            <ReviewViewUser {...fullReview} key={fullReview.review.id} />
          ))}
      </div>
    </>
  );
};

const UserProfile: NextPage<{ userId: string }> = ({ userId }) => {
  const { data } = api.profile.getUserById.useQuery({
    userId,
  });
  const recs = api.recommendations.getTopRestaurants.useQuery().data;
  const crawl = api.recommendations.getFoodCrawl.useQuery();

  const reviews = api.reviews.getReviewsByUserId.useQuery({
    userId: userId,
  }).data;


  const userBackground: CSSProperties = {
    backgroundImage: `url('https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop-1024x576.jpg')`,
  };

  if (!data) return <div>404</div>;

  const getMembershipStatus = (numberOfReviews: any) => {
    if (numberOfReviews === undefined || numberOfReviews <= 10)
      return "Brunonian Bites Novice";
    if (numberOfReviews <= 20) return "Pembroke Palate Explorer";
    if (numberOfReviews <= 30) return "Ivy League Gastronome";
    if (numberOfReviews <= 40) return "College Hill Culinary Connoisseur";
    return "President's Table Elite";
  };

  return (
    <div>
      <MyHome />
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
            <span className={styles.userClass}>
              {getMembershipStatus(reviews?.length)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.mainUserContainer}>
        {/* User Reviews */}
        <div className={styles.leftContainer}>
          <ProfileFeed userId={data.id} reviews={reviews} />
        </div>

        {/* User About & Suggestions */}
        <div className={styles.rightContainer}>
          <UserAbout user={data} recs={recs} />
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
