"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.scss";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { BriefReview } from "@/model/BriefReview";
import StarRating from "@/app/(afterLogin)/_component/StarRating";

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
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/review/brief?id=${id}`).then((res) =>
        res.json(),
      );
      setForm({
        rating: data.rating,
        pros: data.pros,
        cons: data.cons,
      });
    };

    fetchData();
  }, [id]);

  if (!id) return null;

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
    if (!form.pros || !form.cons) return;

    try {
      await fetch("/api/review/brief", {
        method: "PUT",
        body: JSON.stringify({
          id: Number(id),
          rating: form.rating,
          pros: form.pros,
          cons: form.cons,
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
          <StarRating
            onChange={onChange}
            checkedValue={form.rating}
            isReadOnly={false}
          />
          <span>{form.rating}</span>
        </div>

        <div>
          <label htmlFor="pros">pros</label>
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
          <label htmlFor="cons">cons</label>
          <textarea
            id="cons"
            name="cons"
            rows={3}
            value={form.cons}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <button onClick={onClick}>edit</button>
      </form>
    </div>
  );
}
