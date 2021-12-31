import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useShowAlert, useShowLoading } from "../../../hooks";
import ReactGa from "react-ga";
import styles from "./TipPopup.module.css";
import { Post } from "../../../types";
import { tokens } from "../../../api/tokens_bsc.json";
import Select, { OptionProps, components } from "react-select";
import { useEthers } from "@usedapp/core";
import ERC20ABI from "../../../api/erc20abi.json";
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { registerTipBackend } from "../../../api/backend";

type TokenData = {
	address: string;
	chainId: number;
	decimals: number;
	logoURI: string;
	name: string;
	symbol: string;
	label?: string;
	value?: string;
};

const TipPopup: React.FC<{
	open: boolean;
	onClose: () => void;
	post: Post;
}> = ({ open, onClose, post }) => {
	const [tipAmount, setTipAmount] = useState("1");
	const [tokenSelected, setTokenSelected] = useState(tokens[0]);

	const { library } = useEthers();

	const showLoading = useShowLoading();
	const showAlert = useShowAlert();

	async function handleTip() {
		ReactGa.event({
			category: "Tip",
			action: "Tip sent",
		});

		const tipAmountWei = parseUnits(tipAmount, tokenSelected.decimals);

		showLoading(true);

		try {
			const contract = new ethers.Contract(
				tokenSelected.address,
				ERC20ABI,
				library?.getSigner()
			);
			const tx: TransactionResponse = await contract.transfer(
				post.author,
				tipAmountWei
			);

			const status = await registerTipBackend(tx.hash, post.uuid);

			if (status.ok) {
				showAlert("Tip sent!", "info");
			} else {
				showAlert(
					"Couldn't register tip. Backend returned: " + (await status.text()),
					"error"
				);
			}
		} catch (e: any) {
			if ("data" in e && "message" in e.data) {
				showAlert(e.data.message, "error");
			} else if ("message" in e) {
				showAlert(e.message, "error");
			} else {
				showAlert("There was an error in sending your tip.", "error");
			}
		}

		showLoading(false);
	}

	let options: TokenData[] = [];

	tokens.forEach((element) => {
		let newEl: TokenData = element;
		newEl.label = element.name;
		newEl.value = element.address;
		options.push(newEl);
	});

	/*useEffect(() => {
		if (state.status !== "None") {
			showLoading(false);
		}

		if (state.status === "Exception") {
			showAlert(
				"There was a problem while processing your transaction.",
				"error"
			);
		}

		if (state.status === "Mining") {
			showAlert(
				"Your tip has been sent. You will need to wait a minute until the transaction is mined on the blockchain.",
				"info"
			);
		}
	}, [state, showAlert, showLoading]);*/

	return (
		<Modal open={open} onClose={onClose} sx={{ zIndex: 9999 }}>
			<Box
				sx={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					outline: "none",
				}}
			>
				<div className={styles.popupContainer}>
					<div className={styles.popupRow}>
						<Select
							className={styles.currencySelect}
							options={tokens}
							defaultValue={tokenSelected}
							components={{ Option }}
							isMulti={false}
							onChange={(newValue) => {
								console.dir(newValue?.address);
								newValue && setTokenSelected(newValue);
							}}
						/>
					</div>
					<div className={styles.popupRow}>
						<input
							type="number"
							className={styles.popupInput}
							placeholder="Amount"
							onChange={(e) => setTipAmount(e.target.value)}
							value={tipAmount}
						/>
						<div className={styles.currency}>{tokenSelected.symbol}</div>
						<div onClick={handleTip} className={styles.popupTip}>
							Send
						</div>
					</div>
					{/*<div className={styles.popupRow}>
						<button
							className={styles.popupAmountButton}
							onClick={() => setTipAmount("0.01")}
						>
							0.01 {currency}
						</button>
						<button
							className={styles.popupAmountButton}
							onClick={() => setTipAmount("0.005")}
						>
							0.005 {currency}
						</button>
						<button
							className={styles.popupAmountButton}
							onClick={() => setTipAmount("0.001")}
						>
							0.001 {currency}
						</button>
						<button
							className={styles.popupAmountButton}
							onClick={() => {
								alert("Nothing here yet. We'll figure that out soon.");
							}}
						>
							$10
						</button>
						<button
							className={styles.popupAmountButton}
							onClick={() => {
								alert("Nothing here yet. We'll figure that out soon.");
							}}
						>
							$5
						</button>
						<button
							className={styles.popupAmountButton}
							onClick={() => {
								alert("Nothing here yet. We'll figure that out soon.");
							}}
						>
							$1
						</button>
						</div>*/}
				</div>
			</Box>
		</Modal>
	);
};

const Option = (props: OptionProps<TokenData, false>) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				minWidth: "20rem",
			}}
		>
			<components.Option {...props}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<img
							src={props.data.logoURI}
							style={{
								height: "1rem",
								marginRight: "1rem",
							}}
							alt=""
						/>
						<div>{props.data.name}</div>
					</div>
					<div style={{ opacity: "50%" }}>{props.data.symbol}</div>
				</div>
			</components.Option>
		</div>
	);
};

export default TipPopup;
