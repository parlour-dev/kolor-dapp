import { resolveChainId } from "../../../api/backend";
import styles from "./Chain.module.css";

export default function Chain(props: any) {
	const chainProps = resolveChainId(props.blockchain || 0);

	return (
		<div className={styles.container}>
			<div
				className={styles.dot}
				style={{ backgroundColor: chainProps.color }}
			></div>
			<div className={styles.blockchain}>{chainProps.name}</div>
		</div>
	);
}
