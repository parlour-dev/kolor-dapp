import React from "react";
import styles from "./LoginScreen.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MetaMaskLogo from "./metamask.webp";
import WalletConnectLogo from "./walletconnect.png";
import twitterLogo from "./twitterLogo.png";
import ensLogo from "./ensLogo.png";

const LoginScreen = () => {
	return (
		<>
			<Router>
				<Switch>
					{/* Connect your wallet */}
					<Route exact path="/login">
						<div className={styles.loginStepsContainer}>
							<div
								className={[styles.loginStep, styles.activeLoginStep].join(" ")}
							>
								<div className={styles.loginStepNumber}>1</div>
								<p className={styles.loginStepInfo}>Connect your wallet</p>
							</div>
							<div className={styles.loginStep}>
								<div className={styles.loginStepNumberInactive}>2</div>
								<p className={styles.loginStepInfoInactive}>Get Kolor Token</p>
							</div>
							<div className={styles.loginStep}>
								<div className={styles.loginStepNumberInactive}>3</div>
								<p className={styles.loginStepInfoInactive}>Welcome to Kolor</p>
							</div>
						</div>
						<div className={styles.actionContainer}>
							<div className={styles.walletProviderImage}>
								<img src={MetaMaskLogo} alt="MetaMask logo" />
								<div className={styles.connectWalletButton}>
									Connect MetaMask
								</div>
							</div>
							<p>or</p>
							<div className={styles.walletProviderImage}>
								<img src={WalletConnectLogo} alt="WalletConnect logo" />
								<div className={styles.connectWalletButton}>
									Connect any wallet
								</div>
							</div>
						</div>
					</Route>
					{/* End of Connect your wallet */}
					{/* Get Kolor Token */}
					<Route path="/login/token">
						<div className={styles.loginStepsContainer}>
							<div
								className={[styles.loginStep, styles.completedLoginStep].join(
									" "
								)}
							>
								<div className={styles.loginStepNumberInactive}>1</div>
								<p className={styles.loginStepInfoInactive}>
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
								<div className={styles.loginStepNumberInactive}>3</div>
								<p className={styles.loginStepInfoInactive}>Welcome to Kolor</p>
							</div>
						</div>
						<div className={styles.actionContainer}>
							<p className={styles.actionContainerTitle}>
								Verify your account and get 100 KOL for free
							</p>
							<div className={styles.verifyButton}>
								<p>Verify with</p>
								<img
									src={twitterLogo}
									alt="Twitter"
									className={styles.verifyIcon}
								/>
							</div>
							<div className={styles.verifyButton}>
								<p>Verify with</p>
								<img
									src={ensLogo}
									alt="Ethereum Name Service"
									className={styles.verifyIcon}
								/>
							</div>
						</div>
					</Route>
					{/* End of Get Kolor Token */}
					{/* Welcome to Kolor */}
					<Route path="/login/launch">
						<div className={styles.loginStepsContainer}>
							<div
								className={[styles.loginStep, styles.completedLoginStep].join(
									" "
								)}
							>
								<div className={styles.loginStepNumberInactive}>1</div>
								<p className={styles.loginStepInfoInactive}>
									Connect your wallet
								</p>
							</div>
							<div
								className={[styles.loginStep, styles.completedLoginStep].join(
									" "
								)}
							>
								<div className={styles.loginStepNumberInactive}>2</div>
								<p className={styles.loginStepInfoInactive}>Get Kolor Token</p>
							</div>
							<div
								className={[styles.loginStep, styles.activeLoginStep].join(" ")}
							>
								<div className={styles.loginStepNumber}>3</div>
								<p className={styles.loginStepInfo}>Welcome to Kolor</p>
							</div>
						</div>
						<p className={styles.welcomeToKolorTitle}>Welcome to Kolor</p>
					</Route>
					{/* End of Welcome to Kolor */}
				</Switch>
			</Router>
		</>
	);
};

export default LoginScreen;
