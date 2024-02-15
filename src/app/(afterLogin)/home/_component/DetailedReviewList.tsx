"use client";

import { useRouter } from "next/navigation";
import styles from "./detailedReviewList.module.scss";
import { DetailedReview } from "@/model/DetailedReview";
import { useEffect, useState } from "react";
import ReadOnlyStarRating from "@/app/(afterLogin)/_component/ReadOnlyStarRating";

export default function DetailedReviewList() {
  const [reviews, setReviews] = useState<DetailedReview[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await fetch("/api/review/detailed").then((data) =>
          data.json(),
        );
        setReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, []);

  const onClick = (id: number) => router.push(`/home/detailedReview?id=${id}`);

  if (!reviews) return null;

  return (
    <div className={styles.container}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className={styles.listCard}
          onClick={() => onClick(review.id)}
        >
          <h4 className={styles.movieNameRating}>
            {review.movie.titleKo}
            <span>
              <ReadOnlyStarRating
                name={review.id * Math.floor(Math.random() * 100000)}
                rating={review.rating}
              />
              <strong>{review.rating}</strong>
            </span>
          </h4>
          <div className={styles.title}>
            <h2>{review.title}</h2>
            <span>{review.createdAt.slice(0, 19).replace("T", " ")}</span>
          </div>
          <div className={styles.content}>
            <p>
              <strong>quotes</strong>
              <span>{review.quotes}</span>
            </p>
            <p>
              <strong>storyline</strong>
              <span>{review.storyline}</span>
            </p>
            <p>
              <strong>review</strong>
              <span>{review.review}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
