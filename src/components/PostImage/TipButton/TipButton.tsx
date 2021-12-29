import styles from "../PostImage.module.css";
import { Tooltip } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { Post } from "../../../types";
import TipPopup from "../TipPopup/TipPopup";

const TipButton: React.FC<{ post: Post }> = ({ post }) => {
	const [popup, setPopup] = useState(false);

	const { account } = useEthers();

	// If the user is logged in and the user is on the correct chain,
	// show the donate button
	// and make it possible to use a popup

	if (account) {
		return (
			<>
				<div
					className={[styles.buttonBlue, styles.animation].join(" ")}
					onClick={() => {
						setPopup(true);
					}}
				>
					Appreciate
				</div>
				<TipPopup post={post} open={popup} onClose={() => setPopup(false)} />
			</>
		);

		// If the user is logged in, but they're on the wrong chain,
		// show a grey button and a message
	} else {
		return (
			<Tooltip title={`You have to log in with your wallet to donate.`}>
				<div className={styles.buttonOff}>Appreciate</div>
			</Tooltip>
		);
	}
};

export default TipButton;
