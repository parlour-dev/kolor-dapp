import styles from "./Feedchoice.module.css";
import Logo from "./Logo.png";
import Home from "./Home.png";
import Rocket from "./Rocket.png";
import { Link } from "react-router-dom";
export default function FeedChoice(props: any) {
	return (
		<div className={styles.container}>
			<Link to="/">
			<img src={Logo} className={styles.logo} />
			</Link>
			<Link to="/">
				{/* {" "} */}
				<div className={styles.action}>
					{/* {" "} */}
					<img src={Home} className={styles.icon} /> 
					Feed
				</div>
			</Link>
			<div className={styles.action}>
				{/* {" "} */}
				<img src={Rocket} className={styles.icon} /> 
				Explore
			</div>
		</div>
	);
}
