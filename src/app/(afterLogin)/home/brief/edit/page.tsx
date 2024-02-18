"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
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
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const { rating, pros, cons } = await fetch(
        `/api/review/brief?id=${id}`,
      ).then((res) => res.json());
      setForm({ rating, pros, cons });
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
    const { rating, pros, cons } = form;

    try {
      await fetch("/api/review/brief", {
        method: "PUT",
        body: JSON.stringify({ id: Number(id), rating, pros, cons }),
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
      buttonText="edit"
    />
  );
}
