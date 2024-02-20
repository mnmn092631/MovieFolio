import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import cx from "classnames";
import { BriefReview } from "@/model/BriefReview";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styles from "./briefReview.module.scss";

export default function BriefReview() {
	const [review, setReview] = useState<BriefReview>();
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	useEffect(() => {
		const fetchReview = async () => {
			const briefReview = await fetch(`/api/review/brief?id=${id}`).then((data) => data.json());
			setReview(briefReview);
		};

		fetchReview();
	}, [id]);

	const onEdit = async () => router.push(`/home/brief/edit?id=${id}`);

	const onDelete = async () => {
		if (!id) return;

		const flag = confirm("Should the post be deleted?");
		if (!flag) return;

		try {
			await fetch("/api/review/brief", {
				method: "DELETE",
				body: JSON.stringify({ id: Number(id) }),
			}).then((data) => {
				if (data.status === 200) router.push("/home");
			});
		} catch (err) {
			console.log(err);
		}
	};

	if (!review) return <p>no data.</p>;
	return (
		<div className={styles.container}>
			<h1>{review.movie.titleKo}</h1>
			<div>
				<strong>rating</strong>
				<StarRating checkedValue={review.rating} isReadOnly={true} />
				<span className={styles.rating}>{review.rating}</span>
			</div>
			<div>
				<strong className={cx("pros", styles.iconText)}>
					<FaThumbsUp />
					pros
				</strong>
				<span>{review.pros}</span>
			</div>
			<div>
				<strong className={cx("cons", styles.iconText)}>
					<FaThumbsDown />
					cons
				</strong>
				<span>{review.cons}</span>
			</div>
			<div className={styles.buttons}>
				<button onClick={onEdit}>edit</button>
				<button onClick={onDelete}>delete</button>
			</div>
		</div>
	);
}
