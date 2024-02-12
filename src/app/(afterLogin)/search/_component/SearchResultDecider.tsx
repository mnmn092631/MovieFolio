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
        const response = await fetch(
          `http://localhost:3000/api/search?keyword=${keyword}`,
        );
        setStatus(response.status);
        if (status === 200) {
          const data = await response.json();
          setMovies(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (keyword) fetchData();
  }, [keyword]);

  if (!keyword) return <BoxOffice />;
  if (status === 404) return <p>No search results found.</p>;
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.titleKo}</div>
      ))}
    </div>
  );
}
