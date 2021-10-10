import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Logo from "../Navbar/logo.png";

const Navbar = () => {
	const history = useHistory();
	const { activateBrowserWallet, account } = useEthers();

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
							onClick={() => activateBrowserWallet()}
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
