import React from "react";
import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import LogInButton from "./LogInButton/LogInButton";
import { render } from "react-dom";
const Navbar = () => {
	const history = useHistory();
	const { activateBrowserWallet, account } = useEthers();
    
    



	return (
		<div>
			<div className={styles.navbar}>
				<button
					className={[styles.navbarButtonLeft, styles.animation].join(" ")}
					onClick={() => history.push("/create")}
				>
					Create
				</button>
				<button className={styles.logo} onClick={() => history.push("/")}>
					The Content Protocol
				</button>
				{/* ConnetWalletButton */}
				<div>
					{!account && <LogInButton/>}
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
