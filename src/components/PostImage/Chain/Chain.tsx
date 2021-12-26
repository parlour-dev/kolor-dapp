import { resolveChainId } from "../../../api/backend";
import styles from "./Chain.module.css";

type ChainT = { blockchain: number };

const Chain: React.FC<ChainT> = ({ blockchain }) => {
	const chainProps = resolveChainId(blockchain || 0);

	// TODO: niech to będzie link do Etherscana z konkretnym tokenId
	return (
		<div className={styles.container}>
			<div
				className={styles.dot}
				style={{ backgroundColor: chainProps.color }}
			></div>
			<div className={styles.blockchain}>{chainProps.name}</div>
		</div>
	);
};

export default Chain;
