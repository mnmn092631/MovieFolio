"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import styles from "./modal.module.scss";

export default function SignupModal() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password } = form;
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      if (res.ok) router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const onClickClose = () => router.back();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.closeButton} onClick={onClickClose}>
          <RxCross2 />
        </button>
        <form onSubmit={onSubmit}>
          <div className={styles.inputDiv}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={onChange}
            />
          </div>

          <div className={styles.inputDiv}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={onChange}
            />
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
            disabled={!form.email || !form.name || !form.password}
          >
            signup
          </button>
        </form>
      </div>
    </div>
  );
}
