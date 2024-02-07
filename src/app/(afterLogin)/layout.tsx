import { ReactNode } from "react";
import Link from "next/link";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import styles from "./layout.module.scss";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  children: ReactNode;
}
export default function AfterLoginLayout({ children }: Props) {
  // 임시 정보
  const me = {
    username: "username",
    id: "guestId",
  };

  return (
    <div className={styles.container}>
      <header className={styles.left}>
        <div>
          <Link href="/home">MovieFolio</Link>
          <nav>
            <ul>
              <NavMenu />
            </ul>
          </nav>
          {me?.username && (
            <button className={styles.logoutButton}>
              <FaUserCircle />
              <span>{me.username}</span>
            </button>
          )}
        </div>
      </header>
      <main className={styles.right}>{children}</main>
    </div>
  );
}
