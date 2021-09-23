import React from "react";
import styles from "../LogInButton/LogInButton.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";

const LogInButton = () => {
const { activateBrowserWallet, account } = useEthers();
	

	return (
		<div>

				<div>
					<button
						className={[styles.navbarButtonRight, styles.animation].join(" ")}
						onClick={() => activateBrowserWallet()}
					>
						Log In
					</button>
					
				</div>
			
		</div>
	);
};

export default LogInButton;
