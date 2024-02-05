"use client";

import { ChangeEventHandler, useState } from "react";
import styles from "./modal.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function SignupModal() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const router = useRouter();
  const onClickClose = () => router.back();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const onSubmit = () => {};

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.closeButton} onClick={onClickClose}>
          <RxCross2 />
        </button>
        <form>
          <div className={styles.inputDiv}>
            <label htmlFor="nickname">nickname</label>
            <input
              type="text"
              id="nickname"
              value={form.nickname}
              onChange={onChange}
            />
          </div>

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
            onSubmit={onSubmit}
            disabled={!form.id || !form.nickname || !form.password}
          >
            signup
          </button>
        </form>
      </div>
    </div>
  );
}
