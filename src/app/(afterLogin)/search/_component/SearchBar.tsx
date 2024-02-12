"use client";

import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const keywordInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (!keywordInputRef.current) return;
    router.replace(`/search?keyword=${keywordInputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={keywordInputRef} />
      <button onClick={onClick}>
        <BiSearch />
        검색
      </button>
    </div>
  );
}
