import styles from "./detailedForm.module.scss";
import StarRating from "@/app/(afterLogin)/_component/StarRating";
import { DetailedReview } from "@/model/DetailedReview";
import { ChangeEventHandler, MouseEventHandler } from "react";

interface Props {
  form: Omit<
    DetailedReview,
    "id" | "createdAt" | "author" | "authorId" | "movieId" | "movie"
  >;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}
export default function DetailedForm({
  form,
  onChange,
  onClick,
  buttonText,
}: Props) {
  return (
    <div className={styles.container}>
      <form className={styles.createForm}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="watchedAt">watched at</label>
          <input
            type="date"
            id="watchedAt"
            name="watchedAt"
            value={form.watchedAt}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="place">place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={form.place}
            onChange={onChange}
          />
        </div>

        <div>
          <label>rating</label>
          <StarRating
            onChange={onChange}
            checkedValue={form.rating}
            isReadOnly={false}
          />
          <span>{form.rating}</span>
        </div>

        <div>
          <label htmlFor="storyline">storyline</label>
          <textarea
            id="storyline"
            name="storyline"
            rows={5}
            value={form.storyline}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <div>
          <label htmlFor="quotes">quotes</label>
          <textarea
            id="quotes"
            name="quotes"
            rows={5}
            value={form.quotes}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <div>
          <label htmlFor="review">review</label>
          <textarea
            id="review"
            name="review"
            rows={5}
            value={form.review}
            onChange={onChange}
            wrap="hard"
          />
        </div>

        <button onClick={onClick}>{buttonText}</button>
      </form>
    </div>
  );
}
