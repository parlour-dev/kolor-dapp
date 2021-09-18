import { useRef } from "react";
import styles from "../Comments/AddComment.module.css";

function AddComment({ onSubmit }) {
	const inputBox = useRef();

	function addComment() {
		onSubmit(inputBox.current.textContent);
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
}

export default AddComment;
