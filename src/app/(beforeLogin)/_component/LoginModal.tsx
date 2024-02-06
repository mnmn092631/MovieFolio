"use client";

import { ChangeEventHandler, useState } from "react";
import styles from "./modal.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const [form, setForm] = useState({ id: "", password: "" });
  const router = useRouter();
  const onSubmit = () => {};
  const onClickClose = () => router.back();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.closeButton} onClick={onClickClose}>
          <RxCross2 />
        </button>
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
