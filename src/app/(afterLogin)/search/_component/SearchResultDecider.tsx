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
        <div key={movie.id}>
          <span>
            <strong>{movie.titleKo}</strong>
            <span>{movie.titleEn}</span>
          </span>
          <span>{movie.openDate}</span>
          <span>{movie.genre}</span>
          <span>{movie.nation}</span>
          <span>{movie.time}</span>
          <span>{movie.watchGradeNm}</span>
        </div>
      ))}
    </div>
  );
}
