"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./backButton.module.scss";

export default function BackButton() {
  const router = useRouter();
  const onClickBack = () => router.back();

  return (
    <button className={styles.backButton} onClick={onClickBack}>
      <IoIosArrowBack />
      back
    </button>
  );
}
