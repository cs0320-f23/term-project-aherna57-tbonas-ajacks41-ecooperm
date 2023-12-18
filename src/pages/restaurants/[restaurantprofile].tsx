import React, { CSSProperties, useState, useEffect } from "react";
import styles from "../../styles/RestaurantProfile.module.css";
import { UserButton, useUser } from "@clerk/nextjs";
import RestaurantAbout from "../../components/RestaurantAbout";
import ReviewR from "../../components/ReviewR";
import { api } from "~/src/utils/api";
import { toast } from "react-hot-toast";
//import { Restaurant } from "@prisma/client";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";
import { LoadingPage, LoadingSpinner } from "~/src/components/loading";
import { ReviewView } from "~/src/components/ReviewView";

interface input {
  restaurantId: string;
  rating: number;
}

const CreatePostWizard = (props: input) => {
  //Get user info
  const { user } = useUser();

  const [input, setInput] = useState("");

  //When we post, we wanted to update the post on the screen. To do this, we
  //grab the context of the whole TRPC cache through the api context call.
  const ctx = api.useContext();

  console.log("props", props);

  const { mutate, isLoading: isPosting } = api.reviews.create.useMutation({
    //When a user hits post, we clear the text box
    onSuccess: () => {
      setInput("");
      //Updating feed when post gets posted.
      void ctx.reviews.getAll.invalidate();
    },

    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(
          "Failed to review! Please write something or try again later."
        );
      }
    },
  });

  //If no user, return null for now
  if (!user) return null;

  //By this point we should have a user because we checked above
  return (
    <div className="flex w-full gap-4">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 56,
              height: 56,
            },
          },
        }}
      />
      <input
        placeholder="Let us know what you think!"
        className="grow bg-transparent outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({
                content: input,
                restaurantId: props.restaurantId,
                rating: props.rating,
              });
            }
          }
        }}
        // Wanna make sure input is disabled while a post is occuring
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button
          onClick={() =>
            mutate({
              content: input,
              restaurantId: props.restaurantId,
              rating: props.rating,
            })
          }
          disabled={isPosting}
        >
          Post
        </button>
      )}

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const RestaurantFeed = (props: { restaurantId: string }) => {
  const { data, isLoading } = api.reviews.getReviewsByRestaurantId.useQuery({
    restaurantId: props.restaurantId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0)
    return <div>Restaurant reviews cannot be shown right now.</div>;

  return (
    <div className={styles.leftContainer}>
      {data.map((fullReview) => (
        <ReviewView {...fullReview} key={fullReview.review.id} />
      ))}
    </div>
  );
};

const RestaurantProfile: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.restaurants.getById.useQuery({
    id,
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
          <span className={styles.restaurantName}>{data.name}</span>
        </div>
      </div>
      <div className={styles.mainUserContainer}>
        <div className={styles.leftContainer}>
          <RestaurantFeed restaurantId={data.id} />
        </div>
        <div className={styles.rightContainer}>
          <RestaurantAbout restaurant={data.description} />
        </div>
      </div>
      <div>
        <CreatePostWizard restaurantId={data.id} rating={5} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const restaurantprofile = context.params?.restaurantprofile;

  if (typeof restaurantprofile !== "string")
    throw new Error("no restaurantprofile");

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