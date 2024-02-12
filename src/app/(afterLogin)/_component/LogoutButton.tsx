"use client";

import styles from "./logoutButton.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const router = useRouter();

  const me = {
    username: "username",
    id: "guestId",
  };

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  return (
    <>
      {me?.username && (
        <button className={styles.logoutButton} onClick={onLogout}>
          <FaUserCircle />
          <span>{me.username}</span>
        </button>
      )}
    </>
  );
}
