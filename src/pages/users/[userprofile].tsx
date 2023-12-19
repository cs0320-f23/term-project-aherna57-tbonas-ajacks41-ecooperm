import React, { CSSProperties } from "react";
import styles from "~/src/styles/userprofile.module.css";
import UserAbout from "~/src/components/UserAbout";
import { api } from "~/src/utils/api";
import { LoadingPage } from "../../components/loading";
import MyHome from "~/src/container/myhome";
import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";
import { ReviewView } from "~/src/components/ReviewView";
import { Review } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

/// intrface placeholder for now --- update when reviews are implemented

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.reviews.getReviewsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0)
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
        <h1 className={styles.reviewTitle}>REVIEWS ({data.length})</h1>{" "}
      </div>
      <div className={styles.leftContainer}>
        {data.map((fullReview: any) => (
          <ReviewView {...fullReview} key={fullReview.review.id} />
        ))}
      </div>
    </>
  );
};

const UserProfile: NextPage<{ userId: string }> = () => {
  const { user, isLoaded } = useUser();

  const userBackground: CSSProperties = {
    backgroundImage: `url('https://www.mowglistreetfood.com/wp-content/uploads/2023/01/Landing_image_Desktop-1024x576.jpg')`,
  };

  //const { userId } = useParams();

  // console.log("data", data);

  if (!user) return <div>Could not find user</div>;

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
      <MyHome user={user} />
      <div className={styles.userContainer} style={userBackground}>
        {/* User Top Container */}
        <div className={styles.userContent}>
          <div className={styles.userImage}>
            <>
              <img
                src={user.imageUrl}
                alt={`${
                  user.firstName ?? user.emailAddresses ?? "unknown"
                }'s profile pic`}
                className={styles.avatar}
              />
            </>
          </div>

          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {`${user.firstName} ${user.lastName}`}
            </span>
            <span className={styles.userClass}>{}</span>
          </div>
        </div>
      </div>
      <div className={styles.mainUserContainer}>
        {/* User Reviews */}
        <div className={styles.leftContainer}>
          <ProfileFeed userId={user.id} />
        </div>

        {/* User About & Suggestions */}
        <div className={styles.rightContainer}>
          <UserAbout user={user} />
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
