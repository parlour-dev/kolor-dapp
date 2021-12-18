import styles from "./Feedchoice.module.css";
import Logo from "./Logo.png";
import Home from "./Home.png";
import Rocket from "./Rocket.png";
import { Link } from "react-router-dom";
export default function FeedChoice(props: any) {
	return (
		<div className={styles.container}>
			<Link to="/">
				<img
					src={Logo}
					alt="Kolor logo"
					className={[styles.logo, styles.animation].join(" ")}
				/>
			</Link>
			<div className={styles.menuItems}>
				<Link to="/">
					{/* {" "} */}

					<div className={[styles.action, styles.animation].join(" ")}>
						{/* {" "} */}
						<img src={Home} alt="Home" className={styles.icon} />
						<p className={styles.menuItem}>Feed</p>
					</div>
				</Link>
				<div
					className={[styles.action, styles.animation].join(" ")}
					onClick={() => {
						alert(
							"Personalized feeds coming soon! \nYou can contribute at https://github.com/parlour-dev/kolor-dapp"
						);
					}}
				>
					{/* {" "} */}
					<img src={Rocket} alt="Explore" className={styles.icon} />
					<p className={styles.menuItem}>Explore</p>
				</div>
			</div>
		</div>
	);
}
