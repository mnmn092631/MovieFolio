"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { DetailedReview } from "@/model/DetailedReview";
import StarRating from "../_component/StarRating";

export default function Page() {
  const [form, setForm] = useState<
    Omit<
      DetailedReview,
      "id" | "createdAt" | "author" | "authorId" | "movieId" | "movie"
    >
  >({
    title: "",
    watchedAt: "",
    place: "",
    rating: 0,
    storyline: "",
    quotes: "",
    review: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/review/detailed?id=${id}`).then((res) =>
        res.json(),
      );
      setForm({
        title: data.title,
        watchedAt: data.watchedAt.slice(0, 10),
        place: data.place,
        rating: data.rating,
        storyline: data.storyline,
        quotes: data.quotes,
        review: data.review,
      });
    };

    fetchData();
  }, [id]);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.watchedAt ||
      !form.place ||
      !form.storyline ||
      !form.quotes ||
      !form.review
    )
      return;

    try {
      await fetch("/api/review/detailed", {
        method: "PUT",
        body: JSON.stringify({
          id: Number(id),
          title: form.title,
          watchedAt: new Date(form.watchedAt).toISOString(),
          place: form.place,
          rating: Number(form.rating),
          storyline: form.storyline,
          quotes: form.quotes,
          review: form.review,
        }),
      }).then((data) => {
        if (data.ok) router.push("/home");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.createForm}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form?.title}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="watchedAt">watched at</label>
          <input
            type="date"
            id="watchedAt"
            name="watchedAt"
            value={form?.watchedAt}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="place">place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={form?.place}
            onChange={onChange}
          />
        </div>

        <div>
          <label>rating</label>
          <StarRating onChange={onChange} />
          <span>{form.rating}</span>
        </div>

        <div>
          <label htmlFor="storyline">storyline</label>
          <textarea
            id="storyline"
            name="storyline"
            rows={5}
            value={form?.storyline}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <div>
          <label htmlFor="quotes">quotes</label>
          <textarea
            id="quotes"
            name="quotes"
            rows={5}
            value={form?.quotes}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <div>
          <label htmlFor="review">review</label>
          <textarea
            id="review"
            name="review"
            rows={5}
            value={form?.review}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <button onClick={onClick}>edit</button>
      </form>
    </div>
  );
}
