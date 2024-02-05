import Link from "next/link";
import styles from "./main.module.scss";

export default function Main() {
  return (
    <>
      <div className={styles.left}>
        <h1 className={styles.logo}>MovieFolio</h1>
        <h2 className={styles.description}>영화에 관한 모든 것</h2>
      </div>
      <div className={styles.right}>
        <h2>지금 가입하세요</h2>
        <Link href="/signup" className={styles.button}>
          계정 만들기
        </Link>
        <h2>이미 가입하셨나요?</h2>
        <Link href="/login" className={styles.button}>
          로그인
        </Link>
      </div>
    </>
  );
}
