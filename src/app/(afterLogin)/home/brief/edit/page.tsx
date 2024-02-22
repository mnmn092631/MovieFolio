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
      try {
        const res = await fetch(`/api/review/brief?id=${id}`);
        const data = await res.json();

        if (!res.ok) alert(data.error);
        else {
          const { rating, pros, cons } = data;
          setForm({ rating, pros, cons });
        }
      } catch (err) {
        console.error(err);
      }
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
      const res = await fetch("/api/review/brief", {
        method: "PUT",
        body: JSON.stringify({ id: Number(id), rating, pros, cons }),
      });
      const data = await res.json();

      if (!res.ok) alert(data.error);
      else router.push("/home");
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
