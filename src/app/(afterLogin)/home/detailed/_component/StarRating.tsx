import { FaStar, FaStarHalf } from "react-icons/fa";
import styles from "./starRating.module.scss";
import { ChangeEventHandler } from "react";
import cx from "classnames";

interface StarInputProps {
  value: number;
  isHalf: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function StarInput({ value, isHalf, onChange }: StarInputProps) {
  return (
    <>
      <input
        className={styles.input}
        type="radio"
        id={`star${value}`}
        name="rating"
        value={value}
        onChange={onChange}
      />
      <label
        className={cx(styles.label, isHalf && styles.half)}
        htmlFor={`star${value}`}
      >
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </label>
    </>
  );
}

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function StarRating({ onChange }: Props) {
  const rateArr = Array.from({ length: 10 }, (_, i) => i * -0.5 + 5);
  return (
    <fieldset className={styles.container}>
      {rateArr.map((v, i) => (
        <StarInput
          key={`starInput${v}`}
          value={v}
          isHalf={i % 2 === 1}
          onChange={onChange}
        />
      ))}
    </fieldset>
  );
}
