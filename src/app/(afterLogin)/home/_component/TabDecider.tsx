"use client";

import DetailedReviewList from "./DetailedReviewList";
import BriefReviewList from "./BriefReviewList";
import { useContext } from "react";
import { TabContext } from "./TabProvider";

export default function TabDecider() {
	const { tab } = useContext(TabContext);

	if (tab === "detailed") return <DetailedReviewList />;
	return <BriefReviewList />;
}
