"use client";

import { Movie } from "@/model/Movie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import convertDateFormatToDot from "@/app/(afterLogin)/_lib/convertDateFormatToDot";
import styles from "./page.module.scss";
import { IoIosArrowBack } from "react-icons/io";

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
    router.push(`/review/detailed?movieId=${id}`);

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

        <div className={styles.briefReviews}>
          {movie.briefReviews && (
            <>
              <h3>briefReviews</h3>
              {movie.briefReviews?.map((review) => (
                <div key={review.id}>
                  <div>
                    <h3>
                      {review.movie.titleKo} <span>{review.rating}</span>
                    </h3>
                    <span>{review.createdAt}</span>
                  </div>
                  <div>
                    <div>
                      <FaThumbsUp />
                      <p>{review.pros}</p>
                    </div>
                    <div>
                      <FaThumbsDown />
                      <p>{review.cons}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={styles.createButtons}>
          <button onClick={onClickToCreateDetailedReview}>
            create detailed review
          </button>
          <button>create brief review</button>
        </div>
      </div>
    </>
  );
}
