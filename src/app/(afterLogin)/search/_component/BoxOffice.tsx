"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import styles from "./boxOffice.module.scss";

interface BoxOffice {
	rank: string;
	rankInten: string;
	rankOldAndNew: string;
	movieCd: string;
	movieNm: string;
	openDt: string;
}

function convertRankIntenToIcon(rankInten: string) {
	const rankIntenNumber = Number(rankInten);
	if (rankIntenNumber === 0) return;
	else if (rankIntenNumber > 0)
		return (
			<>
				<MdArrowDropUp />
				{rankIntenNumber}
			</>
		);
	else
		return (
			<>
				<MdArrowDropDown />
				{rankIntenNumber * -1}
			</>
		);
}

export default function BoxOffice() {
	const [status, setStatus] = useState<number>();
	const [boxOffice, setBoxOffice] = useState<BoxOffice[]>();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/search/boxOffice");
				setStatus(response.status);
				if (response.status === 200) {
					const data = await response.json();
					setBoxOffice(data);
				}
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const onClick = (id: string) => router.push(`/movies?id=${id}`);

	if (loading) return <p className={styles.container}>...loading</p>;
	if (status === 404) return <p className={styles.container}>Box office information is not available.</p>;
	return (
		<div className={styles.container}>
			<h1>Box Office</h1>
			{boxOffice && (
				<>
					<ul className={styles.boxOfficeListItem}>
						<li className={styles.rank}>rank</li>
						<li className={styles.blank} />
						<li className={styles.movieTitle}>title</li>
						<li className={styles.openDt}>open date</li>
					</ul>
					<ul>
						{boxOffice.map((item) => (
							<li key={item.movieCd} onClick={() => onClick(item.movieCd)} className={styles.boxOfficeListItem}>
								<span className={styles.rank}>{item.rank}</span>
								<span
									className={cx(
										styles.blank,
										Number(item.rankInten) === 0 ? "" : Number(item.rankInten) > 0 ? styles.blue : styles.red
									)}
								>
									{item.rankOldAndNew === "NEW" ? item.rankOldAndNew : convertRankIntenToIcon(item.rankInten)}
								</span>
								<span className={styles.movieTitle}>{item.movieNm}</span>
								<span className={styles.openDt}>{item.openDt}</span>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
