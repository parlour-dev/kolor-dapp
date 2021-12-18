import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import { Link } from "react-router-dom";
import MetaMaskLogo from "./metamask.webp";
import WalletConnectLogo from "./walletconnect.png";
import twitterLogo from "./twitterLogo.png";
import ensLogo from "./ensLogo.png";
import { useEthers } from "@usedapp/core";
import ReactGa from "react-ga";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const LoginScreen = () => {
	let [loginStage, setLoginStage] = useState<"login" | "token" | "launch">(
		"login"
	);

	const { activateBrowserWallet } = useEthers();

	const [errorDialogOpen, setErrorDialogOpen] = useState(false);

	function logInHandler() {
		activateBrowserWallet((error) => {
			setErrorDialogOpen(true);
		});
		ReactGa.event({
			category: "User status",
			action: "Logging in",
		});
		setLoginStage("token");
	}

	return (
		<>
			{/* For testing purposes */}
			{/* <div style={{ marginLeft: 500 }}>
				<button onClick={() => setLoginStage("login")}>LOGIN</button>
				<button onClick={() => setLoginStage("token")}>TOKEN</button>
				<button onClick={() => setLoginStage("launch")}>LAUNCH</button>
			</div> */}

			{/* Connect your wallet */}
			{loginStage === "login" && (
				<div>
					<div className={styles.loginStepsContainer}>
						<div
							className={[styles.loginStep, styles.activeLoginStep].join(" ")}
						>
							<div className={styles.loginStepNumber}>1</div>
							<p className={styles.loginStepInfo}>Connect your wallet</p>
						</div>
						<div className={styles.loginStep}>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								2
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Get Kolor Token
							</p>
						</div>
						<div className={styles.loginStep}>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								3
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Welcome to Kolor
							</p>
						</div>
					</div>

					<div className={styles.actionContainer}>
						<div className={styles.walletProviderImage}>
							<img src={MetaMaskLogo} alt="MetaMask logo" />
							<div
								onClick={logInHandler}
								className={styles.connectWalletButton}
							>
								Connect MetaMask
							</div>
						</div>
						<p>or</p>
						<div className={styles.walletProviderImage}>
							<img src={WalletConnectLogo} alt="WalletConnect logo" />
							<div
								onClick={() => {
									alert(
										"Coming soon. \nIf you know how to add WalletConnect integration, make a pull request at https://github.com/parlour-dev/kolor-dapp"
									);
								}}
								className={styles.connectWalletButton}
							>
								Connect any wallet
							</div>
						</div>
					</div>
				</div>
			)}
			{/* End of Connect your wallet */}
			{/* Get Kolor Token */}
			{loginStage === "token" && (
				<div>
					<div className={styles.loginStepsContainer}>
						<div
							className={[styles.loginStep, styles.completedLoginStep].join(
								" "
							)}
						>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								1
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Connect your wallet
							</p>
						</div>
						<div
							className={[styles.loginStep, styles.activeLoginStep].join(" ")}
						>
							<div className={styles.loginStepNumber}>2</div>
							<p className={styles.loginStepInfo}>Get Kolor Token</p>
						</div>
						<div className={styles.loginStep}>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								3
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Welcome to Kolor
							</p>
						</div>
					</div>
					<div className={styles.actionContainer}>
						<p className={styles.actionContainerTitle}>
							Verify your account and get 100 KOL for free
						</p>
						<div
							onClick={() => setLoginStage("launch")}
							className={styles.verifyButton}
						>
							<p>Verify with</p>
							<img
								src={twitterLogo}
								alt="Twitter"
								className={styles.verifyIcon}
							/>
						</div>
						<div
							onClick={() => setLoginStage("launch")}
							className={styles.verifyButton}
						>
							<p>Verify with</p>
							<img
								src={ensLogo}
								alt="Ethereum Name Service"
								className={styles.verifyIcon}
							/>
						</div>
					</div>
					<Dialog
						open={errorDialogOpen}
						sx={{ zIndex: 99999 }}
						onClose={() => setErrorDialogOpen(false)}
					>
						<DialogTitle>Error</DialogTitle>
						<DialogContent>
							<DialogContentText>
								There was an error logging in. Please install MetaMask and
								switch to a supported chain. The supported chains are{" "}
								<b>Ropsten and BSC Testnet</b>.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setErrorDialogOpen(false)} autoFocus>
								OK
							</Button>
							<Button
								onClick={async () => {
									try {
										// @ts-ignore
										await ethereum.request({
											method: "wallet_switchEthereumChain",
											params: [{ chainId: "0x3" }],
										});

										setErrorDialogOpen(false);

										activateBrowserWallet((error) => {
											setErrorDialogOpen(true);
										});
									} catch (switchError) {
										showAlert(
											"There was an error while switching the chain.",
											"error"
										);

										setErrorDialogOpen(false);
									}
								}}
							>
								Switch to Ropsten
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			)}
			{/* End of Get Kolor Token */}
			{/* Welcome to Kolor */}
			{loginStage === "launch" && (
				<div>
					<div className={styles.loginStepsContainer}>
						<div
							className={[styles.loginStep, styles.completedLoginStep].join(
								" "
							)}
						>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								1
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Connect your wallet
							</p>
						</div>
						<div
							className={[styles.loginStep, styles.completedLoginStep].join(
								" "
							)}
						>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								2
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Get Kolor Token
							</p>
						</div>
						<div
							className={[styles.loginStep, styles.activeLoginStep].join(" ")}
						>
							<div className={styles.loginStepNumber}>3</div>
							<p className={styles.loginStepInfo}>Welcome to Kolor</p>
						</div>
					</div>
					<div className={styles.launchScreenContent}>
						<p className={styles.welcomeToKolorTitle}>Welcome to Kolor</p>
						<Link to="/">
							<div className={styles.letsGoButton}>Let's go</div>
						</Link>
					</div>
				</div>
			)}
			{/* End of Welcome to Kolor */}
		</>
	);
};

export default LoginScreen;
function showAlert(arg0: string, arg1: string) {
	throw new Error("Function not implemented.");
}
