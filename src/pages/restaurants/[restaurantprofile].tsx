import React, { CSSProperties, useState, useEffect } from "react";
import styles from "../../styles/restaurantprofile.module.css";
import { UserButton, useUser } from "@clerk/nextjs";
import RestaurantAbout from "../../components/RestaurantAbout";
import ReviewR from "../../components/ReviewR";
import { api } from "~/src/utils/api";
import { toast } from "react-hot-toast";
import { Restaurant } from "@prisma/client";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";
import { LoadingPage, LoadingSpinner } from "~/src/components/loading";
import { ReviewView } from "~/src/components/ReviewView";
import MyHome from "~/src/container/myhome";
import Cookies from "js-cookie";

interface input {
  restaurantId: string;
  rating: number;
  image: File | null;
}

interface UserInfo {
  id: any;
  name: any;
  profileImageUrl: any;
}

const CreatePostWizard = (props: input) => {
  //Get user info
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [rating, setRating] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");


  //When we post, we wanted to update the post on the screen. To do this, we
  //grab the context of the whole TRPC cache through the api context call.
  const ctx = api.useContext();
  const handleImageChange = (event : any) => {
    console.log("imagege", event.target.files[0]);
    console.log("tyeeppe", event.target.files[0].type);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));

    console.log("immi", URL.createObjectURL(event.target.files[0]));
    
  };

  const { mutate, isLoading: isPosting } = api.reviews.create.useMutation({
    //When a user hits post, we clear the text box
    onSuccess: () => {
      setInput("");
      setRating(1);
      setSelectedImage("");
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
      <div className="flex flex-col w-screen">
        <input
          type="number"
          min="1"
          max="5"
          w-10
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="bg-transparent outline-none w-20"
        />
        <input
          placeholder="Let us know what you think!"
          className="grow bg-transparent outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input !== "") {
                mutate({
                  content: input,
                  restaurantId: props.restaurantId,
                  rating: rating,
                  ...(selectedImage ? { imageUrl: selectedImage } : {}),
                });
              }
            }
          }}
          // Wanna make sure input is disabled while a post is occuring
          disabled={isPosting}
        />
        <div className={styles.inputImage}>
          <input
            className={styles.inputImage}
            type="file"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              className={styles.imagePreview}
            />
          )}
        </div>
      </div>
      {input !== "" && !isPosting && (
        <button
          onClick={() =>
            mutate({
              content: input,
              restaurantId: props.restaurantId,
              rating: rating,
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
    return (
      <>
        <div className={styles.titleContainer}>
          <h1 className={styles.reviewTitle}> REVIEWS ({data.length})</h1>{" "}
        </div>
        <div className={styles.noReview}>
          Restaurant has no reviews. Be the first to review!
        </div>
      </>
    );

  return (
    <div className={styles.leftContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.reviewTitle}>REVIEWS ({data.length})</h1>{" "}
      </div>
      {data.map((fullReview: any) => (
        <ReviewView {...fullReview} key={fullReview.review.id} />
      ))}
    </div>
  );
};

const RestaurantProfile: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.restaurants.getById.useQuery({
    id,
  });
  const recs = api.recommendations.getRandomRestaurants.useQuery().data;
  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  if (!data) return <div>404</div>;

  const restBackground: CSSProperties = {
    backgroundImage: data ? `url(${data.imageUrl})` : "",
  };
  const user = JSON.parse(Cookies.get("user") || "null");
  const userInfo: UserInfo = {
    id: user?.id,
    name: user?.fullName,
    profileImageUrl: user?.imageUrl,
  };

  return (
    <div>
      <MyHome user={userInfo} />
      <div className={styles.restaurantContainer} style={restBackground}>
        {/* User Top Container */}
        <div className={styles.restaurantContent}>
          <span className={styles.restaurantName}>{data.name}</span>
        </div>
      </div>
      <div>
        <button onClick={openModal}>Add a Review</button>

        {isModalOpen && (
          <div className={styles.modalBackground}>
            <div className={styles.modal}>
              <button onClick={closeModal}>Close</button>

              <CreatePostWizard
                restaurantId={data.id}
                rating={5}
                image={null}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.mainUserContainer}>
        <div className={styles.leftContainer}>
          <RestaurantFeed restaurantId={data.id} />
        </div>
        <div className={styles.rightContainer}>
          <RestaurantAbout props={data} recs={recs} />{" "}
        </div>
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
