"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/model/Movie";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import MovieInfo from "./_component/MovieInfo";
import BriefReviews from "./_component/BriefReviews";

export default function Page() {
	const [movie, setMovie] = useState<Movie>();

	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	useEffect(() => {
		const fetchMovie = async () => {
			const movie = await fetch(`/api/movie?id=${id}`).then((data) => data.json());
			setMovie(movie);
		};

		fetchMovie();
	}, [id]);

	if (!movie || !id) return null;
	return (
		<>
			<BackButton />
			<MovieInfo movie={movie} id={id}>
				<BriefReviews briefReviews={movie.briefReviews} />
			</MovieInfo>
		</>
	);
}
