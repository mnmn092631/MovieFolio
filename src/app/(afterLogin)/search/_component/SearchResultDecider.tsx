"use client";

import { useSearchParams } from "next/navigation";
import BoxOffice from "@/app/(afterLogin)/search/_component/BoxOffice";
import { useEffect, useState } from "react";
import styles from "./searchResultDecider.module.scss";

interface Movie {
  id: string;
  titleKo: string;
  titleEn: string;
  openYear: string;
  openDate: string;
  genre: string;
  nation: string;
  time: string;
  watchGradeNm: string;
}

function convertDateFormatToDot(dateStr: string) {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const date = dateStr.slice(6, 8);
  return `${year}. ${month}. ${date}.`;
}

export default function SearchResultDecider() {
  const [status, setStatus] = useState<number>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?keyword=${keyword}`);
        setStatus(response.status);
        if (response.status === 200) {
          const data = await response.json();
          setMovies(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) fetchData();
  }, [keyword]);

  if (!keyword) return <BoxOffice />;
  if (loading) return <p className={styles.container}>...loading</p>;
  if (status === 404)
    return <p className={styles.container}>No search results found.</p>;
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.searchItem}>
          <p>
            <strong>{movie.titleKo}</strong>
            <span>{movie.titleEn}</span>
          </p>
          <div>
            {(movie.openYear || movie.openDate) && (
              <span>
                {(movie.openDate && convertDateFormatToDot(movie.openDate)) ||
                  movie.openYear}
              </span>
            )}
            {movie.time && <span>{movie.time} mins</span>}
            {movie.nation && <span>{movie.nation.replaceAll(",", ", ")}</span>}
            {movie.genre && <span>{movie.genre.replaceAll(",", ", ")}</span>}
            {movie.watchGradeNm && <span>{movie.watchGradeNm}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
