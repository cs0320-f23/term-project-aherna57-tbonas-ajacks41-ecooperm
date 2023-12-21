import React, { CSSProperties, useState, ChangeEvent, useEffect } from "react";
import styles from "../../styles/restaurantprofile.module.css";
import { UserButton, useUser } from "@clerk/nextjs";
import RestaurantAbout from "../../components/RestaurantAbout";
import { api } from "~/src/utils/api";
import { toast } from "react-hot-toast";
import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/src/server/helpers/ssghelper";
import { LoadingPage, LoadingSpinner } from "~/src/components/loading";
import { ReviewView } from "~/src/components/ReviewView";
import MyHome from "~/src/container/myhome";

interface Input {
  restaurantId: string;
  rating: number;
  image: File | null;
}

const CreatePostWizard = (props: Input) => {
  // Get user info
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [rating, setRating] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const ctx = api.useContext();

  const handleImageChange = (event: any) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const { mutate, isLoading: isPosting } = api.reviews.create.useMutation({
    onSuccess: () => {
      setInput("");
      setRating(1);
      setSelectedImage("");
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

  if (!user) return null;

  return (
    <div className={styles.postContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.userProfileIcon}>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          />
        </div>
      </div>

      <div className={styles.textContainer}>
        <label className={styles.label}>Star Rating (1/5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className={styles.textbox}
        />
        <label className={styles.label}>Comment:</label>
        <input
          placeholder="Let us know what you think!"
          className={styles.textbox}
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
          disabled={isPosting}
        />
        <div className={styles.inputImage}>
          <label className={styles.label}>Photo:</label>
          <input
            className={styles.textbox}
            type="file"
            accept="image/*"
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

        {input !== "" && !isPosting && (
          <div className={styles.postButton}>
            <button
              onClick={() =>
                mutate({
                  content: input,
                  restaurantId: props.restaurantId,
                  rating: rating,
                  ...(selectedImage ? { imageUrl: selectedImage } : {}),
                })
              }
              disabled={isPosting}
            >
              Post
            </button>
          </div>
        )}
        {isPosting && (
          <div className="flex items-center justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
      </div>
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
          <h1 className={styles.reviewTitle}> REVIEWS ({data?.length})</h1>{" "}
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

  return (
    <div>
      <MyHome />
      <div className={styles.restaurantContainer} style={restBackground}>
        <div className={styles.restaurantContent}>
          <span className={styles.restaurantName}>{data.name}</span>
        </div>
      </div>
      <div>
        <div className={styles.reviewButton}>
          <button onClick={openModal}>Add a Review</button>
        </div>

        {isModalOpen && (
          <div className={styles.modalBackground}>
            <div className={styles.modal}>
              <button onClick={closeModal} className={styles.closeButton}>
                Close
              </button>

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
