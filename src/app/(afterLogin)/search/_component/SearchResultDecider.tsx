"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Movie } from "@/model/Movie";
import BoxOffice from "@/app/(afterLogin)/search/_component/BoxOffice";
import convertDateFormatToDot from "@/app/(afterLogin)/_lib/convertDateFormatToDot";
import styles from "./searchResultDecider.module.scss";

export default function SearchResultDecider() {
  const obsRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [movies, setMovies] = useState<
    Omit<Movie, "detailedReviews" | "briefReviews">[]
  >([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const onClick = (id: string) => router.push(`/movies?id=${id}`);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    let observer: IntersectionObserver;
    if (!loading) {
      observer = new IntersectionObserver(handleObserver, { threshold: 0.5 });
      if (obsRef.current) observer.observe(obsRef.current);
    }

    return () => observer && observer.disconnect();
  }, [loading]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (!isEnd && !loading && entries && entries[0].isIntersecting) loadMore();
  };

  const getMovies = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?keyword=${keyword}&pageNo=${page}`);
      const data = await res.json();

      if (!res.ok) alert(data.error);
      else {
        if (data.isEnd) setIsEnd(true);
        setMovies((prev) => prev.concat(data.list));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (!keyword || loading) return;
    getMovies(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setIsEnd(false);
  }, [keyword]);

  if (!keyword) return <BoxOffice />;
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={styles.searchItem}
          onClick={() => onClick(movie.id)}
        >
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
      <div ref={obsRef}></div>
    </div>
  );
}
