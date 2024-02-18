"use client";

import { DetailedReview } from "@/model/DetailedReview";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReadOnlyStarRating from "@/app/(afterLogin)/_component/ReadOnlyStarRating";
import styles from "./page.module.scss";

export default function Page() {
  const [review, setReview] = useState<DetailedReview>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchReview = async () => {
      const detailedReview = await fetch(`/api/review/detailed?id=${id}`).then(
        (data) => data.json(),
      );
      setReview(detailedReview);
    };

    fetchReview();
  }, [id]);

  const onClickBack = () => router.back();

  const onEdit = async () => router.push(`/home/detailed/edit?id=${id}`);

  const onDelete = async () => {
    if (!id) return;

    const flag = confirm("Should the post be deleted?");
    if (!flag) return;

    try {
      await fetch("/api/review/detailed", {
        method: "DELETE",
        body: JSON.stringify({
          id: Number(id),
        }),
      }).then((data) => {
        if (data.status === 200) router.push("/home");
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!review) return null;

  return (
    <>
      <button className={styles.backButton} onClick={onClickBack}>
        back
      </button>
      <div className={styles.container}>
        <div>
          <strong>title</strong>
          <span>{review.title}</span>
        </div>

        <div>
          <strong>watched at</strong>
          <span>{review.watchedAt.slice(0, 10)}</span>
        </div>

        <div>
          <strong>place</strong>
          <span>{review.place}</span>
        </div>

        <div>
          <strong>rating</strong>
          <ReadOnlyStarRating name={review.id} rating={review.rating} />
          <span className={styles.rating}>{review.rating}</span>
        </div>

        <div>
          <strong>storyline</strong>
          <span style={{ whiteSpace: "pre-line" }}>{review.storyline}</span>
        </div>

        <div>
          <strong>quotes</strong>
          <span style={{ whiteSpace: "pre-line" }}>{review.quotes}</span>
        </div>

        <div>
          <strong>review</strong>
          <span style={{ whiteSpace: "pre-line" }}>{review.review}</span>
        </div>

        <div className={styles.buttons}>
          <button onClick={onEdit}>수정하기</button>
          <button onClick={onDelete}>삭제하기</button>
        </div>
      </div>
    </>
  );
}