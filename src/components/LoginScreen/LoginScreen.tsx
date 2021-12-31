import React, { useEffect, useState } from "react";
import styles from "./LoginScreen.module.css";
import { Link } from "react-router-dom";
import MetaMaskLogo from "./metamask.webp";
import WalletConnectLogo from "./walletconnect.png";
//import twitterLogo from "./twitterLogo.png";
//import ensLogo from "./ensLogo.png";
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
import { useShowAlert } from "../../hooks";
import { kolortoken_address } from "../../api/kolordata";
import { DefaultChainId } from "../../constants";

type LoginStage = "login" | "token" | "launch";

const LoginScreen = () => {
	const { activateBrowserWallet, account, chainId } = useEthers();

	const showAlert = useShowAlert();

	const [errorDialogOpen, setErrorDialogOpen] = useState(false);

	const [loginStage, setLoginStage] = useState<LoginStage>("login");

	useEffect(() => {
		if (localStorage.getItem("hasAlreadyLoggedIn") === "metamask" && !account) {
			logInHandlerMetamask();
		}

		if (loginStage === "login" && account && chainId === DefaultChainId) {
			if (localStorage.getItem("hasAlreadyLoggedIn") === "metamask") {
				setLoginStage("launch");
			} else {
				localStorage.setItem("hasAlreadyLoggedIn", "metamask");
				setLoginStage("token");
			}
		}
		// eslint-disable-next-line
	}, [loginStage, account, chainId]);

	function logInHandlerMetamask() {
		activateBrowserWallet((error) => {
			if (error.message.startsWith("Unsupported chain id")) {
				switchOrAddBSC();
			} else {
				setErrorDialogOpen(true);
			}
			setLoginStage("login");
		});
		ReactGa.event({
			category: "User status",
			action: "Logging in",
		});
	}

	const switchOrAddBSC = async () => {
		try {
			// @ts-ignore
			await ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x38" }],
			});

			setErrorDialogOpen(false);

			activateBrowserWallet((error) => {
				setErrorDialogOpen(true);
			});
		} catch (switchError) {
			try {
				// @ts-ignore
				await ethereum.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x38",
							chainName: "Binance Smart Chain",
							nativeCurrency: {
								name: "BNB",
								symbol: "BNB",
								decimals: 18,
							},
							rpcUrls: ["https://bsc-dataseed.binance.org/"],
							blockExplorerUrls: ["https://bscscan.com/"],
						},
					],
				});
			} catch (addError) {
				showAlert("There was an error while switching the chain.", "error");

				setErrorDialogOpen(true);
			}
		}
	};

	const addToken = async () => {
		// @ts-ignore
		ethereum.request({
			method: "wallet_watchAsset",
			params: {
				type: "ERC20",
				options: {
					address: kolortoken_address[chainId || DefaultChainId],
					symbol: "KOL",
					decimals: 18,
					image: "https://app.kolor.social/token.png",
				},
			},
		});

		setLoginStage("launch");
	};

	return (
		<>
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
								onClick={logInHandlerMetamask}
								className={styles.connectWalletButton}
							>
								Connect MetaMask
							</div>
						</div>
						<p>or</p>
						<br />
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
							Add the Kolor Token to your wallet
						</p>
						<div onClick={() => addToken()} className={styles.verifyButtonBlue}>
							<p>Add token</p>
						</div>
						<div
							onClick={() => setLoginStage("launch")}
							className={styles.verifyButton}
						>
							<p>Skip</p>
						</div>
						{/*<div
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
						</div>*/}
					</div>
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

			<Dialog
				open={errorDialogOpen}
				sx={{ zIndex: 99999 }}
				onClose={() => setErrorDialogOpen(false)}
			>
				<DialogTitle>Error</DialogTitle>
				<DialogContent>
					<DialogContentText>
						There was an error logging in. Please install MetaMask and switch to
						the <b>Binance Smart Chain</b>.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setErrorDialogOpen(false)} autoFocus>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default LoginScreen;
