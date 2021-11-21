import { Box, Modal } from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import {
	useShowAlert,
	useShowLoading,
	useTCPDataFunction,
} from "../../../hooks";
import ReactGa from "react-ga";
import styles from "./TipPopup.module.css";
import { resolveChainId } from "../../../api/backend";
import { Post } from "../../../types";

const TipPopup: React.FC<{
	open: boolean;
	onClose: () => void;
	post: Post;
}> = ({ open, onClose, post }) => {
	const [tipAmount, setTipAmount] = useState("0");

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	const currency = useMemo(
		() => resolveChainId(post.chainid).currency,
		[post.chainid]
	);

	const { send, state } = useTCPDataFunction(
		"tipContent",
		post.chainid,
		"Tip post"
	);

	function handleTip() {
		ReactGa.event({
			category: "Tip",
			action: "Tip sent",
		});

		showLoading(true);
		send(post.id, { value: ethers.utils.parseUnits(tipAmount) });
	}

	useEffect(() => {
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
	}, [state, showAlert, showLoading]);

	return (
		<Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
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
						<input
							type="number"
							className={styles.popupInput}
							placeholder="Amount"
							onChange={(e) => setTipAmount(e.target.value)}
							value={tipAmount}
						/>
						<div className={styles.currency}>{currency}</div>
						<div onClick={handleTip} className={styles.popupTip}>
							Send
						</div>
					</div>
					<div className={styles.popupRow}>
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
					</div>
				</div>
			</Box>
		</Modal>
	);
};

export default TipPopup;
