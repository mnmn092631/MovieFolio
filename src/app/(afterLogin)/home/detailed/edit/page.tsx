"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { DetailedReview } from "@/model/DetailedReview";
import DetailedForm from "@/app/(afterLogin)/home/detailed/_component/DetailedForm";

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
          rating: form.rating,
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
    <DetailedForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      buttonText="edit"
    />
  );
}
