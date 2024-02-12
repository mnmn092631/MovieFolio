"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import styles from "./modal.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginModal() {
  const [form, setForm] = useState({ id: "", password: "" });
  const router = useRouter();
  const { data, status } = useSession();
  const onSubmit = () => {};
  const onClickClose = () => router.back();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const loginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") return router.replace("/home");
  }, [router, status]);

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.closeButton} onClick={onClickClose}>
          <RxCross2 />
        </button>
        <div className={styles.snsButtonWrapper}>
          <button onClick={loginWithGoogle}>
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={20}
              height={20}
            />
            <span>Login with Google</span>
          </button>
        </div>
        <form>
          <div className={styles.inputDiv}>
            <label htmlFor="id">id</label>
            <input type="text" id="id" value={form.id} onChange={onChange} />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <button
            className={styles.submitButton}
            disabled={!form.id || !form.password}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}
