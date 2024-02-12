import { ReactNode } from "react";
import Link from "next/link";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import styles from "./layout.module.scss";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";

interface Props {
  children: ReactNode;
}
export default function AfterLoginLayout({ children }: Props) {
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
          <LogoutButton />
        </div>
      </header>
      <main className={styles.right}>{children}</main>
    </div>
  );
}
