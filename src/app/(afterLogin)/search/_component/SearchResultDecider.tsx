"use client";

import { useSearchParams } from "next/navigation";
import BoxOffice from "@/app/(afterLogin)/search/_component/BoxOffice";
import { useEffect, useState } from "react";

export default function SearchResultDecider() {
  const [status, setStatus] = useState<number>();
  const [movies, setMovies] = useState<{ id: string; titleKo: string }[]>([]);
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
  if (loading) return <p>...loading</p>;
  if (status === 404) return <p>No search results found.</p>;
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.titleKo}</div>
      ))}
    </div>
  );
}
