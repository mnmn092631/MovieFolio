"use client";
import { useEffect, useState } from "react";

interface BoxOffice {
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
}

export default function BoxOffice() {
  const [status, setStatus] = useState<number>();
  const [boxOffice, setBoxOffice] = useState<BoxOffice[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/search/boxOffice");
        setStatus(response.status);
        if (response.status === 200) {
          const data = await response.json();
          setBoxOffice(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>...loading</p>;
  if (status === 404) return <p>Box office information is not available.</p>;
  return (
    <div>
      {boxOffice &&
        boxOffice.map((item) => (
          <div key={item.movieCd}>
            <span>{item.rank}</span>
            <span>
              {item.rankOldAndNew === "NEW"
                ? item.rankOldAndNew
                : item.rankInten}
            </span>
            <span>{item.movieNm}</span>
            <span>{item.openDt}</span>
          </div>
        ))}
    </div>
  );
}
