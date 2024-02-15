import { FaStar, FaStarHalf } from "react-icons/fa";
import styles from "./readOnlyStarRating.module.scss";
import cx from "classnames";

interface StarInputProps {
  name: number;
  value: number;
  isHalf: boolean;
  isChecked: boolean;
}

function StarInput({ name, value, isHalf, isChecked }: StarInputProps) {
  return (
    <>
      <input
        className={styles.input}
        type="radio"
        id={`star${value}`}
        name={`rating${name}`}
        value={value}
        readOnly={true}
        checked={isChecked}
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
  name: number;
  rating: number;
}

export default function ReadOnlyStarRating({ name, rating }: Props) {
  const rateArr = Array.from({ length: 10 }, (_, i) => i * -0.5 + 5);
  return (
    <fieldset className={styles.container}>
      {rateArr.map((v, i) => (
        <StarInput
          key={`starInput${v}`}
          value={v}
          name={name}
          isHalf={i % 2 === 1}
          isChecked={v === rating}
        />
      ))}
    </fieldset>
  );
}
