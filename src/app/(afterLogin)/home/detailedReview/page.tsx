"use client";

import { DetailedReview } from "@/model/DetailedReview";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  if (!review) return null;

  return (
    <div>
      <button onClick={onClickBack}>Back</button>
    </div>
  );
}
