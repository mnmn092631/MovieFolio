"use client";

import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { RxCross2 } from "react-icons/rx";
import styles from "./modal.module.scss";

export default function LoginModal() {
	const [form, setForm] = useState({ email: "", password: "" });

	const router = useRouter();
	const { status } = useSession();

	const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		try {
			const { email, password } = form;
			const res = await signIn("credentials", { email, password, redirect: false });
			if (res?.ok) router.push("/home");
		} catch (err) {
			console.log(err);
		}
	};
	const onClickClose = () => router.back();
	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setForm({ ...form, [e.target.id]: e.target.value });

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
				<form onSubmit={onSubmit}>
					<div className={styles.inputDiv}>
						<label htmlFor="email">email</label>
						<input type="email" id="email" value={form.email} onChange={onChange} />
					</div>
					<div className={styles.inputDiv}>
						<label htmlFor="password">password</label>
						<input type="password" id="password" value={form.password} onChange={onChange} />
					</div>
					<button className={styles.submitButton} disabled={!form.email || !form.password}>
						login
					</button>
				</form>
			</div>
		</div>
	);
}
