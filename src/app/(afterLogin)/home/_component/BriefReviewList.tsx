"use client";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styles from "./briefReviewList.module.scss";
import { BriefReview } from "@/model/BriefReview";
import { useCallback, useEffect, useRef, useState } from "react";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import { useRouter } from "next/navigation";
import cx from "classnames";

export default function BriefReviewList() {
	const obsRef = useRef<HTMLDivElement>(null);
	const preventRef = useRef<boolean>(true);
	const endRef = useRef<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const [reviews, setReviews] = useState<BriefReview[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
		if (obsRef.current) observer.observe(obsRef.current);
		return () => observer.disconnect();
	}, []);

	const obsHandler = (entries: IntersectionObserverEntry[]) => {
		const target = entries[0];
		if (!endRef.current && target.isIntersecting && preventRef.current) {
			preventRef.current = false;
			setPage((prev) => prev + 1);
		}
	};

	const getBriefReviews = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/review/brief?pageNo=${page}`);
			if (res.status === 200) {
				const data = await res.json();
				if (data.isEnd) endRef.current = true;
				setReviews((prev) => [...prev, ...data.list]);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, [page]);

	useEffect(() => {
		getBriefReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const onClick = (id: number) => router.push(`/home/brief?id=${id}`);

	if (loading) return <p className={styles.container}>...loading</p>;
	if (!reviews.length) return <p className={styles.container}>No data.</p>;
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
			<div ref={obsRef}></div>
		</div>
	);
}
