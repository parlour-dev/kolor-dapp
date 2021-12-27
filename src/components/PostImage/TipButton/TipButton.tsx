import styles from "../PostImage.module.css";
import { Tooltip } from "@mui/material";
// import { useEthers } from "@usedapp/core";
// import { useState } from "react";
import { Post } from "../../../types";
// import TipPopup from "../TipPopup/TipPopup";
// import { resolveChainId } from "../../../api/backend";

const TipButton: React.FC<{ post: Post }> = ({ post }) => {
	// const [popup, setPopup] = useState(false);

	// const { account, chainId } = useEthers();

	// NOTE: this is temporary
	return (
		<Tooltip title="Donating is currently disabled.">
			<div className={styles.buttonOff}>Appreciate</div>
		</Tooltip>
	);

	// If the user is logged in and the user is on the correct chain,
	// show the donate button
	// and make it possible to use a popup

	/*if (account && chainId === post.chainid) {
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

	} else if (account && chainId !== post.chainid) {
		return (
			<Tooltip
				title={`You can't donate without switching to ${
					resolveChainId(post.chainid).name
				} first.`}
			>
				<div className={styles.buttonOff}>Appreciate</div>
			</Tooltip>
		);
		// Otherwise, show a different message
	} else {
		return (
			<Tooltip title={`You have to log in with your wallet to donate.`}>
				<div className={styles.buttonOff}>Appreciate</div>
			</Tooltip>
		);
	}*/
};

export default TipButton;
