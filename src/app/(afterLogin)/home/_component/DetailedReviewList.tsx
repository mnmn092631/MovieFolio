"use client";

import { useRouter } from "next/navigation";
import styles from "./detailedReviewList.module.scss";
import { DetailedReview } from "@/model/DetailedReview";
import { useEffect, useState } from "react";

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

  console.log(reviews[0]);

  return (
    <div className={styles.container}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className={styles.listCard}
          onClick={() => onClick(review.id)}
        >
          <h3>
            {review.movie.titleKo} <span>{review.rating}</span>
          </h3>
          <div className={styles.title}>
            <h2>{review.title}</h2>
            <span>{review.createdAt}</span>
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
