import styles from "./Feedchoice.module.css";
import Logo from "./Logo.png";
import Home from "./Home.png";
import Rocket from "./Rocket.png";
import { Link } from "react-router-dom";
export default function FeedChoice(props: any) {
	return (
		<div className={styles.container}>
			<img src={Logo} className={styles.logo}></img>
			<Link to="/">
				{/* {" "} */}
				<div className={styles.action}>
					{/* {" "} */}
					<img src={Home} className={styles.icon}></img> Feed
				</div>
			</Link>
			<div className={styles.action}>
				{/* {" "} */}
				<img src={Rocket} className={styles.icon}></img> Explore
			</div>
		</div>
	);
}
