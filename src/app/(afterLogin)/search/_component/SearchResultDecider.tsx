"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BoxOffice from "@/app/(afterLogin)/search/_component/BoxOffice";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./searchResultDecider.module.scss";
import { Movie } from "@/model/Movie";
import convertDateFormatToDot from "@/app/(afterLogin)/_lib/convertDateFormatToDot";

export default function SearchResultDecider() {
	const obsRef = useRef<HTMLDivElement>(null);
	const preventRef = useRef<boolean>(true);
	const endRef = useRef<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const [status, setStatus] = useState<number>();
	const [movies, setMovies] = useState<Omit<Movie, "detailedReviews" | "briefReviews">[]>([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const onClick = (id: string) => router.push(`/movies?id=${id}`);

	const searchParams = useSearchParams();
	const keyword = searchParams.get("keyword");

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
	const getMovies = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/search?keyword=${keyword}&pageNo=${page}`);
			setStatus(res.status);
			if (res.status === 200) {
				const data = await res.json();
				if (data.isEnd) endRef.current = true;
				setMovies((prev) => [...prev, ...data.list]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [page, keyword]);

	useEffect(() => {
		getMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		if (keyword) getMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);

	if (!keyword) return <BoxOffice />;
	if (loading) return <p className={styles.container}>...loading</p>;
	if (status === 404) return <p className={styles.container}>No search results found.</p>;
	return (
		<div className={styles.container}>
			{movies.map((movie) => (
				<div key={movie.id} className={styles.searchItem} onClick={() => onClick(movie.id)}>
					<p>
						<strong>{movie.titleKo}</strong>
						<span>{movie.titleEn}</span>
					</p>
					<div>
						{(movie.openYear || movie.openDate) && (
							<span>{(movie.openDate && convertDateFormatToDot(movie.openDate)) || movie.openYear}</span>
						)}
						{movie.time && <span>{movie.time} mins</span>}
						{movie.nation && <span>{movie.nation.replaceAll(",", ", ")}</span>}
						{movie.genre && <span>{movie.genre.replaceAll(",", ", ")}</span>}
						{movie.watchGradeNm && <span>{movie.watchGradeNm}</span>}
					</div>
				</div>
			))}
			<div ref={obsRef}></div>
		</div>
	);
}
