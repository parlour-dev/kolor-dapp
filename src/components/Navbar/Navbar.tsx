import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Logo from "../Navbar/logo.png";
import ReactGa from "react-ga";

const Navbar = () => {
	const history = useHistory();
	const { activateBrowserWallet, account } = useEthers();
	function logInHandler() {
		activateBrowserWallet();
		ReactGa.event({
			category: "User status",
			action: "Logging in",
		});
	}
	return (
		<div>
			<div className={styles.navbar}>
				<div className={styles.navbarLeft}>
					{account && (
						<button
							className={[styles.navbarButtonLeft, styles.animation].join(" ")}
							onClick={() => history.push("/create")}
						>
							Create
						</button>
					)}
					{!account && (
						<button
							className={[
								styles.navbarButtonLeft,
								styles.buttonDisabled,
								styles.animation,
							].join(" ")}
							disabled
						>
							Create
						</button>
					)}
				</div>
				<div className={styles.logo} onClick={() => history.push("/")}>
					<img src={Logo} alt="DeSo" />
				</div>
				{/* ConnetWalletButton */}
				<div className={styles.navbarRight}>
					{!account && (
						<button
							className={[styles.navbarButtonRight, styles.animation].join(" ")}
							onClick={logInHandler}
						>
							Log In
						</button>
					)}
					{account && (
						<div
							className={styles.profilePictureButton}
							onClick={() => history.push("/profile")}
						>
							{account && (
								<ProfilePicture
									className={styles.animation}
									address={account}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
