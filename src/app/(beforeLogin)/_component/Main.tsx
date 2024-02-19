import Link from "next/link";
import styles from "./main.module.scss";

export default function Main() {
  return (
    <>
      <div className={styles.left}>
        <h1 className={styles.logo}>MovieFolio</h1>
        <h2 className={styles.description}>
          capturing your cinematic journey.
        </h2>
      </div>
      <div className={styles.right}>
        <h2>join now</h2>
        <Link href="/signup" className={styles.button}>
          sign up
        </Link>
        <h2>have you already signed up?</h2>
        <Link href="/login" className={styles.button}>
          login
        </Link>
      </div>
    </>
  );
}
