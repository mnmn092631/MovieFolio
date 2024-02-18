import StarRating from "@/app/(afterLogin)/_component/StarRating";
import { BriefReview } from "@/model/BriefReview";
import { ChangeEventHandler, MouseEventHandler } from "react";
import cx from "classnames";
import styles from "./briefForm.module.scss";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

interface Props {
  form: Pick<BriefReview, "rating" | "pros" | "cons">;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}
export default function BriefForm({
  form,
  onChange,
  onClick,
  buttonText,
}: Props) {
  return (
    <div className={styles.container}>
      <form className={styles.createForm}>
        <>
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
            <label htmlFor="pros" className={cx(styles.iconLabel, styles.pros)}>
              <FaThumbsUp />
              pros
            </label>
            <textarea
              id="pros"
              name="pros"
              rows={3}
              value={form.pros}
              onChange={onChange}
              wrap="hard"
            />
          </div>

          <div>
            <label htmlFor="cons" className={cx(styles.iconLabel, styles.cons)}>
              <FaThumbsDown />
              cons
            </label>
            <textarea
              id="cons"
              name="cons"
              rows={3}
              value={form.cons}
              onChange={onChange}
              wrap="hard"
            />
          </div>
        </>

        <button onClick={onClick}>{buttonText}</button>
      </form>
    </div>
  );
}
