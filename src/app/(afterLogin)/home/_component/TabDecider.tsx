"use client";

import useTabStore from "@/store/tab";
import DetailedReviewList from "./DetailedReviewList";
import BriefReviewList from "./BriefReviewList";

export default function TabDecider() {
  const { tab } = useTabStore();

  if (tab === "detailed") return <DetailedReviewList />;
  return <BriefReviewList />;
}
