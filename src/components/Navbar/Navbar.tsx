import React from "react";
import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import LogInButton from "./LogInButton/LogInButton";
import ProfPicture from "./ProfPicture/ProfPicture";
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
             
					{account && 
					<div  
						className={styles.walletAddress}
						onClick={() => history.push("/profile")}>
						<ProfPicture/>
					</div>
					}
					
				</div>
			</div>
		</div>
	);
};

export default Navbar;
