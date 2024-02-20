"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./searchBar.module.scss";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get("keyword");
  const [keyword, setKeyword] = useState<string>(keywordParam ?? "");

  const onClick = () => {
    if (!keyword) return;
    router.replace(`/search?keyword=${keyword}`);
  };

  useEffect(() => {
    if (!keywordParam) setKeyword("");
  }, [keywordParam]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") onClick();
        }}
      />
      <button onClick={onClick}>search</button>
    </div>
  );
}
