"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DetailedReview } from "@/model/DetailedReview";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import convertTimestampToSimple from "@/app/(afterLogin)/_lib/convertTimestampToSimple";
import styles from "./detailedReviewList.module.scss";

export default function DetailedReviewList() {
  const obsRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [reviews, setReviews] = useState<DetailedReview[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let observer: IntersectionObserver;
    if (!loading) {
      observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
      if (obsRef.current) observer.observe(obsRef.current);
    }

    return () => observer && observer.disconnect();
  }, [loading]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (!isEnd && !loading && entries && entries[0].isIntersecting) loadMore();
  };

  const getDetailedReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/review/detailed?pageNo=${page}`);
      if (res.ok) {
        const data = await res.json();
        if (data.isEnd) setIsEnd(true);
        setReviews((prev) => prev.concat(data.list));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (loading) return;
    getDetailedReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onClick = (id: number) => router.push(`/home/detailed?id=${id}`);

  // if (loading) return <p className={styles.container}>...loading</p>;
  if (!reviews.length) return <p className={styles.container}>No data.</p>;
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
              <StarRating
                name={review.id}
                checkedValue={review.rating}
                isReadOnly={true}
              />
              <strong>{review.rating}</strong>
            </span>
          </h4>
          <div className={styles.title}>
            <h2>{review.title}</h2>
            <span>{convertTimestampToSimple(review.createdAt)}</span>
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
      <div ref={obsRef}></div>
    </div>
  );
}
