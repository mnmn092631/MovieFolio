"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styles from "./briefReviewList.module.scss";
import { BriefReview } from "@/model/BriefReview";
import { useEffect, useState } from "react";
import ReadOnlyStarRating from "@/app/(afterLogin)/_component/ReadOnlyStarRating";

export default function BriefReviewList() {
  const [reviews, setReviews] = useState<BriefReview[]>();

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await fetch("/api/review/brief").then((data) =>
        data.json(),
      );
      setReviews(reviews);
    };

    fetchReviews();
  }, []);

  if (!reviews) return null;

  return (
    <div className={styles.container}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.listCard}>
          <div className={styles.title}>
            <h3>
              {review.movie.titleKo}
              <span>
                <ReadOnlyStarRating name={review.id} rating={review.rating} />
                {review.rating}
              </span>
            </h3>
            <span>{review.createdAt.slice(0, 19).replace("T", " ")}</span>
          </div>
          <div className={styles.content}>
            <div className={styles.pros}>
              <FaThumbsUp />
              <p>{review.pros}</p>
            </div>
            <div className={styles.cons}>
              <FaThumbsDown />
              <p>{review.cons}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
