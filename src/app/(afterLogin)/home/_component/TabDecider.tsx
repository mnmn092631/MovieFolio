"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import DetailedReviewList from "./DetailedReviewList";
import BriefReviewList from "./BriefReviewList";

export default function TabDecider() {
	const { tab } = useContext(TabContext);

	if (tab === "detailed") return <DetailedReviewList />;
	return <BriefReviewList />;
}
