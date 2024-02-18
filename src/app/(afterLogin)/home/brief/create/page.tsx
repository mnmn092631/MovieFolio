"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { BriefReview } from "@/model/BriefReview";
import BriefForm from "@/app/(afterLogin)/home/brief/_component/BriefForm";

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
  if (!movieId) return null;

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
    const { rating, pros, cons } = form;

    try {
      await fetch("/api/review/brief", {
        method: "POST",
        body: JSON.stringify({ rating, pros, cons, movieId }),
      }).then((data) => {
        if (data.ok) router.push("/home");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BriefForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      buttonText="create"
    />
  );
}
