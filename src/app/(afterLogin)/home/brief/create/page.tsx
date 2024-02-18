"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import StarRating from "../../_component/StarRating";
import { BriefReview } from "@/model/BriefReview";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import cx from "classnames";

export default function Page() {
  const [form, setForm] = useState<
    Pick<BriefReview, "rating" | "pros" | "cons">
  >({
    rating: 0,
    pros: "",
    cons: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) =>
    setForm({
      ...form,
      [e.target.name]: isNaN(Number(e.target.value))
        ? e.target.value
        : Number(e.target.value),
    });

  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!form.pros || !form.cons || !movieId) return;

    try {
      await fetch("/api/review/brief", {
        method: "POST",
        body: JSON.stringify({
          rating: Number(form.rating),
          pros: form.pros,
          cons: form.cons,
          movieId,
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
          <label>rating</label>
          <StarRating onChange={onChange} checkedValue={form.rating} />
          <span>{form.rating}</span>
        </div>

        <div>
          <label htmlFor="pros" className={cx(styles.iconLabel, styles.pros)}>
            <FaThumbsUp />
            pros
          </label>
          <textarea
            id="pros"
            name="pros"
            rows={3}
            value={form.pros}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <div>
          <label htmlFor="cons" className={cx(styles.iconLabel, styles.cons)}>
            <FaThumbsDown />
            cons
          </label>
          <textarea
            id="cons"
            name="cons"
            rows={3}
            value={form.cons}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <button onClick={onClick}>create</button>
      </form>
    </div>
  );
}
