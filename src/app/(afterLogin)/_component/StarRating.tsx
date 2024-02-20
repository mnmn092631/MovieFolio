import { ChangeEventHandler } from "react";
import cx from "classnames";
import { FaStar, FaStarHalf } from "react-icons/fa";
import styles from "./starRating.module.scss";

interface StarInputProps {
	name?: number | string;
	value: number;
	isHalf: boolean;
	isChecked: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	isReadOnly: boolean;
}

function StarInput({ name, value, isHalf, isChecked, onChange, isReadOnly }: StarInputProps) {
	return (
		<>
			<input
				className={styles.input}
				type="radio"
				id={`star${value}`}
				name={name ? `rating${name}` : "rating"}
				value={value}
				onChange={onChange}
				checked={isChecked}
				readOnly={isReadOnly}
			/>
			<label className={cx(styles.label, isHalf && styles.half, !isReadOnly && styles.edit)} htmlFor={`star${value}`}>
				{isHalf ? <FaStarHalf /> : <FaStar />}
			</label>
		</>
	);
}

interface Props {
	name?: number | string;
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	checkedValue: number;
	isReadOnly: boolean;
}

export default function StarRating({ name, onChange, checkedValue, isReadOnly }: Props) {
	const rateArr = Array.from({ length: 10 }, (_, i) => i * -0.5 + 5);

	return (
		<fieldset className={styles.container}>
			{rateArr.map((v, i) => (
				<StarInput
					key={`starInput${v}`}
					value={v}
					name={name}
					isHalf={i % 2 === 1}
					onChange={onChange}
					isChecked={v === checkedValue}
					isReadOnly={isReadOnly}
				/>
			))}
		</fieldset>
	);
}
