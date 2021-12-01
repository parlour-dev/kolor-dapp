import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Logo from "../Navbar/logo.png";
import ReactGa from "react-ga";
import { useMemo, useState } from "react";
import { resolveChainId } from "../../api/backend";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useShowAlert, useTCPDataCall } from "../../hooks";

const Navbar = () => {
	const history = useHistory();
	const { activateBrowserWallet, account, chainId } = useEthers();
	const chain = useMemo(() => resolveChainId(chainId || 3), [chainId]);

	const [errorDialogOpen, setErrorDialogOpen] = useState(false);

	const version = useTCPDataCall("version", chainId || 3);

	const showAlert = useShowAlert();

	function logInHandler() {
		activateBrowserWallet((error) => {
			setErrorDialogOpen(true);
		});
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
					<img src={Logo} alt="Kolor" />
				</div>
				{/* ConnetWalletButton */}
				<div className={styles.navbarRight}>
					{chainId && (
						<div className={styles.chainDisplayBox}>
							<div
								className={styles.chainDot}
								style={{ backgroundColor: chain.color }}
							></div>
							<p className={styles.chainName}>
								{chain.name} v{version?.toString() || "?"}
							</p>
						</div>
					)}

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
			<Dialog
				open={errorDialogOpen}
				sx={{ zIndex: 99999 }}
				onClose={() => setErrorDialogOpen(false)}
			>
				<DialogTitle>Error</DialogTitle>
				<DialogContent>
					<DialogContentText>
						There was an error logging in. Please install MetaMask and switch to
						a supported chain. The supported chains are{" "}
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
	);
};

export default Navbar;
