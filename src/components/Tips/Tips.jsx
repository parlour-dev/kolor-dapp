import styles from "../Tips/Tips.module.css";
import eth from "../Tips/icons/eth.png"
import dai from "../Tips/icons/dai.png"

function Tips({ amounts }) {
	const coins = Object.keys(amounts.additional);

	return (
		<div className={styles.container}>
			<div className={styles.mainTips}><img src={eth} alt="ETH "/>{amounts.ethereum}</div>
			<div className={styles.mainTips}><img src={dai} alt="ETH "/>{amounts.dai}</div>
			{coins &&
				coins.map((coin, idx) => (
					<div key={idx} className={styles.additionalTips}>
						{coin}: {amounts.additional[coin]}
					</div>
				))}
		</div>
	);
}

export default Tips;
