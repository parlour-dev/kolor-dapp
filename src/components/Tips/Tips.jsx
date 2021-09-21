import styles from "../Tips/Tips.module.css";

function Tips({ amounts }) {
	const coins = Object.keys(amounts.additional);

	return (
		<div className={styles.container}>
			<div className={styles.MainTip}>{amounts.main}</div>
			{coins &&
				coins.map((coin, idx) => (
					<div key={idx} className={styles.AdditionalTip}>
						{coin}: {amounts.additional[coin]}
					</div>
				))}
		</div>
	);
}

export default Tips;
