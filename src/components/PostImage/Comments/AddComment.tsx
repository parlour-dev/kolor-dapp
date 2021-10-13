import React, { useRef } from "react";
import styles from "../Comments/AddComment.module.css";
import ReactGa from "react-ga";

const AddComment: React.FC<{ onSubmit: (newComment: string) => void }> = ({
	onSubmit,
}) => {
	const inputBox = useRef<HTMLDivElement>(null);

	function addComment() {
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
			<div className={styles.button} onClick={addComment}>
				Add comment
			</div>
		</div>
	);
};

export default AddComment;
