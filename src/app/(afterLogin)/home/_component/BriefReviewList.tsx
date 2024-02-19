"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styles from "./briefReviewList.module.scss";
import { BriefReview } from "@/model/BriefReview";
import { useEffect, useState } from "react";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import { useRouter } from "next/navigation";
import cx from "classnames";

export default function BriefReviewList() {
	const [reviews, setReviews] = useState<BriefReview[]>();
	const router = useRouter();

	useEffect(() => {
		const fetchReviews = async () => {
			const reviews = await fetch("/api/review/brief").then((data) => data.json());
			setReviews(reviews);
		};

		fetchReviews();
	}, []);

	const onClick = (id: number) => router.push(`/home/brief?id=${id}`);

	if (!reviews) return null;

	return (
		<div className={styles.container}>
			{reviews.map((review) => (
				<div key={review.id} className={styles.listCard} onClick={() => onClick(review.id)}>
					<div className={styles.title}>
						<h3>
							{review.movie.titleKo}
							<span>
								<StarRating name={review.id} checkedValue={review.rating} isReadOnly={true} />
								{review.rating}
							</span>
						</h3>
						<span>{review.createdAt.slice(0, 19).replace("T", " ")}</span>
					</div>
					<div className={styles.content}>
						<div className={cx("pros", styles.pros)}>
							<FaThumbsUp />
							<p>{review.pros}</p>
						</div>
						<div className="cons">
							<FaThumbsDown />
							<p>{review.cons}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
