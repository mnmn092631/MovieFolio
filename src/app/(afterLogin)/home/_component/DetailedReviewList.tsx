"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DetailedReview } from "@/model/DetailedReview";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import convertTimestampToSimple from "@/app/(afterLogin)/_lib/convertTimestampToSimple";
import styles from "./detailedReviewList.module.scss";

export default function DetailedReviewList() {
	const obsRef = useRef<HTMLDivElement>(null);
	const preventRef = useRef<boolean>(true);
	const endRef = useRef<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const [reviews, setReviews] = useState<DetailedReview[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
		if (obsRef.current) observer.observe(obsRef.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		getDetailedReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const obsHandler = (entries: IntersectionObserverEntry[]) => {
		const target = entries[0];
		if (!endRef.current && target.isIntersecting && preventRef.current) {
			preventRef.current = false;
			setPage((prev) => prev + 1);
		}
	};

	const getDetailedReviews = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/review/detailed?pageNo=${page}`);
			if (res.ok) {
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

	const onClick = (id: number) => router.push(`/home/detailed?id=${id}`);

	if (loading) return <p className={styles.container}>...loading</p>;
	if (!reviews.length) return <p className={styles.container}>No data.</p>;
	return (
		<div className={styles.container}>
			{reviews.map((review) => (
				<div key={review.id} className={styles.listCard} onClick={() => onClick(review.id)}>
					<h4 className={styles.movieNameRating}>
						{review.movie.titleKo}
						<span>
							<StarRating name={review.id} checkedValue={review.rating} isReadOnly={true} />
							<strong>{review.rating}</strong>
						</span>
					</h4>
					<div className={styles.title}>
						<h2>{review.title}</h2>
						<span>{convertTimestampToSimple(review.createdAt)}</span>
					</div>
					<div className={styles.content}>
						<p>
							<strong>quotes</strong>
							<span>{review.quotes}</span>
						</p>
						<p>
							<strong>storyline</strong>
							<span>{review.storyline}</span>
						</p>
						<p>
							<strong>review</strong>
							<span>{review.review}</span>
						</p>
					</div>
				</div>
			))}
			<div ref={obsRef}></div>
		</div>
	);
}
