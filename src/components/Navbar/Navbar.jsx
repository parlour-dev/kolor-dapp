import React from "react";
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
				<div>
					<button
						className={[styles.navbarButtonLeft, styles.animation].join(" ")}
						onClick={() => history.push("/create")}
					>
						Create
					</button>
					<div>
						{etherBalance && (
							<div className={styles.balance}>
								Balance: <b>{formatEther(etherBalance).substr(0, 8)} ETH</b>
							</div>
						)}
					</div>
				</div>
				<button className={styles.logo} onClick={() => history.push("/")}>
					The Content Protocol
				</button>
				{/* ConnetWalletButton */}
				<div>
					<button
						className={[styles.navbarButtonRight, styles.animation].join(" ")}
						onClick={() => activateBrowserWallet()}
					>
						Log In
					</button>
					<button
						className={styles.walletAddress}
						onClick={() => history.push("/profile")}
					>
						{account && (
							<p>
								Hello <b>{account.substr(0, 16)}</b>...
							</p>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
