"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/model/Movie";
import convertDateFormatToDot from "@/app/(afterLogin)/_lib/convertDateFormatToDot";
import styles from "./movieInfo.module.scss";

interface Props {
	children: ReactNode;
	movie: Movie;
	id: string;
}

export default function MovieInfo({ children, movie, id }: Props) {
	const router = useRouter();
	const onClickToCreateDetailedReview = () => router.push(`/home/detailed/create?movieId=${id}`);
	const onClickToCreateBriefReview = () => router.push(`/home/brief/create?movieId=${id}`);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				{movie.titleKo} <span>{movie.titleEn}</span>
			</h1>

			<div className={styles.info}>
				{(movie.openYear || movie.openDate) && (
					<span>
						<strong>open</strong>
						{(movie.openDate && convertDateFormatToDot(movie.openDate)) || movie.openYear}
					</span>
				)}
				{movie.time && (
					<span>
						<strong>time</strong>
						{movie.time} mins
					</span>
				)}
				{movie.nation && (
					<span>
						<strong>nation</strong>
						{movie.nation.replaceAll(",", ", ")}
					</span>
				)}
				{movie.genre && (
					<span>
						<strong>genre</strong>
						{movie.genre.replaceAll(",", ", ")}
					</span>
				)}
				{movie.watchGradeNm && (
					<span>
						<strong>watch grade</strong>
						{movie.watchGradeNm}
					</span>
				)}
			</div>

			{children}

			<div className={styles.createButtons}>
				<button onClick={onClickToCreateDetailedReview}>create detailed review</button>
				<button onClick={onClickToCreateBriefReview}>create brief review</button>
			</div>
		</div>
	);
}
