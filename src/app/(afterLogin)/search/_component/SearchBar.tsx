"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./searchBar.module.scss";

export default function SearchBar() {
  const router = useRouter();
  const keywordInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (!keywordInputRef.current) return;
    router.replace(`/search?keyword=${keywordInputRef.current.value}`);
  };

  return (
    <div className={styles.container}>
      <input type="text" ref={keywordInputRef} />
      {/*  todo: 엔터키로 검색 가능하게 설정 */}
      <button onClick={onClick}>search</button>
    </div>
  );
}
