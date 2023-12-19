import Image from "next/image";
import type { RouterOutputs } from "~/src/utils/api";
import styles from "../styles/Review.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";


dayjs.extend(relativeTime);

type ReviewWithData = RouterOutputs["reviews"]["getAll"][number];

export const ReviewView = (props: ReviewWithData) => {
  const { review, author, restaurant } = props;
  console.log(review)

  const handleDelete = (index: number) => {
    console.log("deleting review", index);
  };
  console.log(review.rating)

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starFilled : styles.star}>
          &#9733;
        </span>
      );
    }
    return stars;
  };


  return (
    // <div
    //   key={review.id}
    //   className="flex bg-black border-b border-slate-400 p-4 gap-3"
    // >
    //   <Link href={`/@${author.id}`}>
    //     <Image
    //       src={author.profileImageUrl}
    //       alt={`@${author.firstName}'s profile picture`}
    //       className="h-14 w-14 rounded-full"
    //       width={56}
    //       height={56}
    //     />
    //   </Link>

    //   <div className="flex flex-col">
    //     <div className="flex gap-1 text-slate-300">
    //       <Link href={`/${author.id}`}>
    //         <span> {`${author.id}`} </span>
    //       </Link>

    //       <Link href={`/review/${review.id}`}>
    //         <span className="font-thin">
    //           {` · ${dayjs(review.createdAt).fromNow()}`}
    //         </span>
    //       </Link>
    //     </div>
    //     <Link href={`/review/${review.id}`}>
    //       <span className="text-l">{review.content}</span>
    //     </Link>
    //   </div>
    // </div>

    <div key={review.id} className={styles.wrapperReview}>
      <span className={styles.timeText}>
        {` · ${dayjs(review.createdAt).fromNow()}`}
      </span>

      <hr className={styles.divider} />
      <Link href={`/users/${author.id}`}>
        <div className={styles.reviewURestaurant}> {author.fullName}</div>
      </Link>
      <div className={styles.ratingContainer}>{renderStars(review.rating)}</div>

      <span className={styles.reviewText}>{review.content}</span>
      <hr className={styles.divider} />

      {review.imageUrl && (
        <>
          <div className={styles.reviewImageContainer}>
            <Image
              className={styles.reviewImage}
              src={review.imageUrl}
              alt="Review"
            />
          </div>
          <hr className={styles.divider} />
        </>
      )}
    </div>
  );
};
