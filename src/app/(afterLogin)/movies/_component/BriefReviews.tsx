import { BriefReview } from "@/model/BriefReview";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import styles from "./briefReviews.module.scss";

interface Props {
	briefReviews: BriefReview[];
}

export default function BriefReviews({ briefReviews }: Props) {
	if (briefReviews.length === 0) return null;
	return (
		<div className={styles.briefReviews}>
			<h3>brief reviews</h3>
			{briefReviews.map((review) => (
				<div key={review.id}>
					<div className={styles.briefTitle}>
						<strong>{review.author.name}</strong>
						<span>{review.createdAt.replace("T", " ").slice(0, 19)}</span>
					</div>
					<div className={styles.briefContent}>
						<span>
							<StarRating checkedValue={review.rating} isReadOnly={true} name={review.id} />
							{review.rating}
						</span>
						<div className="pros">
							<FaThumbsUp />
							<p>{review.pros}</p>
						</div>
						<div className="cons">
							<FaThumbsDown />
							<p>{review.cons}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
