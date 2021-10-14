import React, { useRef } from "react";
import styles from "../Comments/AddComment.module.css";
import ReactGa from "react-ga";
import { useEthers } from "@usedapp/core";

const AddComment: React.FC<{ onSubmit: (newComment: string) => void }> = ({
	onSubmit,
}) => {
	const { account } = useEthers();

	const inputBox = useRef<HTMLDivElement>(null);

	function addComment() {
		if (!account) return;

		onSubmit(inputBox.current!.textContent || "");
		inputBox.current!.textContent = "";
		ReactGa.event({
			category: "Comment",
			action: "Comment added",
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.textAreaContainer}>
				<div
					ref={inputBox}
					className={styles.textArea}
					contentEditable={true}
				></div>
			</div>
			<div
				className={account ? styles.button : styles.buttonDisabled}
				onClick={addComment}
			>
				Add comment
			</div>
		</div>
	);
};

export default AddComment;
