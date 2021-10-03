import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const Navbar = () => {
	const history = useHistory();
	const { activateBrowserWallet, account } = useEthers();
	const etherBalance = useEtherBalance(account);

	return (
		<div>
			<div className={styles.navbar}>
				<div className={styles.navbarLeft}>
					<button
						className={[styles.navbarButtonLeft, styles.animation].join(" ")}
						onClick={() => history.push("/create")}
					>
						Create
					</button>
				</div>
				<div className={styles.logo} onClick={() => history.push("/")}>
					The Content Protocol
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
						<button
							className={[styles.walletAddress, styles.animation].join(" ")}
							onClick={() => history.push("/profile")}
						>
							{account && (
								<p>
									Hello <b>{account.substr(0, 16)}</b>...
								</p>
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
