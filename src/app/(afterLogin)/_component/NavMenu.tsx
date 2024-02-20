"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BiSearch, BiSearchAlt } from "react-icons/bi";
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
		</>
	);
}
