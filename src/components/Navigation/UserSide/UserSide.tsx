import styles from "./UserSide.module.css";
import { Link } from "react-router-dom";
export default function UserSide(props: any) {
	return (
		<div className={styles.container}>
			<Link to="/create">
				<div className={styles.CreateButton}>Create</div>{" "}
			</Link>
		</div>
	);
}
