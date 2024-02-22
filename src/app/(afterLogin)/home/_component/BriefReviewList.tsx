"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { BriefReview } from "@/model/BriefReview";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import convertTimestampToSimple from "@/app/(afterLogin)/_lib/convertTimestampToSimple";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styles from "./briefReviewList.module.scss";

export default function BriefReviewList() {
  const obsRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [reviews, setReviews] = useState<BriefReview[]>([]);
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

  const getBriefReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/review/brief?pageNo=${page}`);
      const data = await res.json();

      if (!res.ok) alert(data.error);
      else {
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
    getBriefReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onClick = (id: number) => router.push(`/home/brief?id=${id}`);

  // if (loading) return <p className={styles.container}>...loading</p>;
  if (!reviews.length) return null;
  return (
    <div className={styles.container}>
      {reviews.map((review) => (
        <div
          key={review.id}
          className={styles.listCard}
          onClick={() => onClick(review.id)}
        >
          <div className={styles.title}>
            <h3>
              {review.movie.titleKo}
              <span>
                <StarRating
                  name={review.id}
                  checkedValue={review.rating}
                  isReadOnly={true}
                />
                {review.rating}
              </span>
            </h3>
            <span>{convertTimestampToSimple(review.createdAt)}</span>
          </div>
          <div className={styles.content}>
            <div className={cx("pros", styles.pros)}>
              <FaThumbsUp />
              <p>{review.pros}</p>
            </div>
            <div className="cons">
              <FaThumbsDown />
              <p>{review.cons}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={obsRef}></div>
    </div>
  );
}
