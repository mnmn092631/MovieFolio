"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import {
  AiFillCalendar,
  AiFillHome,
  AiOutlineCalendar,
  AiOutlineHome,
} from "react-icons/ai";
import Link from "next/link";
import {
  BiChalkboard,
  BiSearch,
  BiSearchAlt,
  BiSolidChalkboard,
} from "react-icons/bi";
import styles from "./navMenu.module.scss";

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <li className={styles.navPill}>
        <Link href="/home">
          {segment === "home" ? (
            <>
              <AiFillHome />
              <strong>home</strong>
            </>
          ) : (
            <>
              <AiOutlineHome />
              <span>home</span>
            </>
          )}
        </Link>
      </li>
      <li className={styles.navPill}>
        <Link href="/search">
          {segment === "search" ? (
            <>
              <BiSearchAlt />
              <strong>search</strong>
            </>
          ) : (
            <>
              <BiSearch />
              <span>search</span>
            </>
          )}
        </Link>
      </li>
      <li className={styles.navPill}>
        <Link href="/release">
          {segment === "release" ? (
            <>
              <AiFillCalendar />
              <strong>release</strong>
            </>
          ) : (
            <>
              <AiOutlineCalendar />
              <span>release</span>
            </>
          )}
        </Link>
      </li>
      <li className={styles.navPill}>
        <Link href="/board">
          {segment === "board" ? (
            <>
              <BiSolidChalkboard />
              <strong>board</strong>
            </>
          ) : (
            <>
              <BiChalkboard />
              <span>board</span>
            </>
          )}
        </Link>
      </li>
    </>
  );
}
