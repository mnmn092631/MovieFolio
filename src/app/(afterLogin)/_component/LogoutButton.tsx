"use client";

import styles from "./logoutButton.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
	const router = useRouter();

	const session = useSession();
	const me = session.data;

	const onLogout = () => {
		signOut({ redirect: false }).then(() => router.replace("/"));
	};

	if (!me?.user) return null;

	return (
		<>
			{me.user?.name && (
				<button className={styles.logoutButton} onClick={onLogout}>
					<FaUserCircle />
					<p className={styles.userInfo}>
						<span>{me.user?.name}</span>
						<span>{me.user?.email}</span>
					</p>
				</button>
			)}
		</>
	);
}
