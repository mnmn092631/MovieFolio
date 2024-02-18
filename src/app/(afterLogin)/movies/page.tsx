"use client";

import { Movie } from "@/model/Movie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import convertDateFormatToDot from "@/app/(afterLogin)/_lib/convertDateFormatToDot";
import styles from "./page.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import BriefReviews from "@/app/(afterLogin)/movies/_component/BriefReviews";

export default function Page() {
  const [movie, setMovie] = useState<Movie>();

  const router = useRouter();
  const onClickBack = () => router.back();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await fetch(`/api/movie?id=${id}`).then((data) =>
        data.json(),
      );
      setMovie(movie);
    };

    fetchMovie();
  }, [id]);

  const onClickToCreateDetailedReview = () =>
    router.push(`/home/detailed/create?movieId=${id}`);

  const onClickToCreateBriefReview = () =>
    router.push(`/home/brief/create?movieId=${id}`);

  if (!movie) return null;

  return (
    <>
      <button className={styles.backButton} onClick={onClickBack}>
        <IoIosArrowBack />
        back
      </button>

      <div className={styles.container}>
        <h1 className={styles.title}>
          {movie.titleKo} <span>{movie.titleEn}</span>
        </h1>

        <div className={styles.info}>
          {(movie.openYear || movie.openDate) && (
            <span>
              <strong>open</strong>
              {(movie.openDate && convertDateFormatToDot(movie.openDate)) ||
                movie.openYear}
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

        {movie.briefReviews && (
          <BriefReviews briefReviews={movie.briefReviews} />
        )}

        <div className={styles.createButtons}>
          <button onClick={onClickToCreateDetailedReview}>
            create detailed review
          </button>
          <button onClick={onClickToCreateBriefReview}>
            create brief review
          </button>
        </div>
      </div>
    </>
  );
}
