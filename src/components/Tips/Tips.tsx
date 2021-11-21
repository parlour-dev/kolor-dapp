import styles from "../Tips/Tips.module.css";
import eth from "../Tips/icons/eth.png";
import dai from "../Tips/icons/dai.png";
import { TipAmounts } from "../../types";

const Tips: React.FC<{ amounts: TipAmounts }> = ({ amounts }) => {
	return (
		<div className={styles.container}>
			<div className={styles.mainTips}>
				<img src={eth} alt="ETH " />
				{amounts.ethereum}
			</div>
			{amounts.dai && (
				<div className={styles.mainTips}>
					<img src={dai} alt="DAI " />
					{amounts.dai}
				</div>
			)}
			{amounts.additional &&
				amounts.additional.map((coin, idx) => (
					<div key={idx} className={styles.additionalTips}>
						{coin.name}: {coin.amount}
					</div>
				))}
		</div>
	);
};

export default Tips;
