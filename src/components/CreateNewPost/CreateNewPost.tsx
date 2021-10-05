import React from "react";
import styles from "../CreateNewPost/CreateNewPost.module.css";
import imagePlaceholder from "../CreateNewPost/image.png";
import submitArrow from "../CreateNewPost/arrow.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Post } from "../../types";
import { uploadImageToAWS } from "../../api/uploadImage";

const CreateNewPost = ({ onSubmit }: { onSubmit: (post: Post) => void }) => {
	const [file, setFile] = useState("");
	const [inputText, setInputText] = useState("");

	let history = useHistory();

	const inputTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(e.target.value);
	};

	const submitPostHandler = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (!inputText && !file) {
			console.error("The post is empty.");
			return;
		}

		let fileUploadedTo = file ? await uploadImageToAWS(file) : undefined;

		const newPost = {
			text: inputText,
			file: fileUploadedTo,
			wallet: "creatorWallet",
			nick: "creatorNick",
			id: -1,
		};

		onSubmit(newPost);
		setInputText("");
		history.goBack();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			// @ts-ignore
			setFile(URL.createObjectURL(e.target.files[0]));
		} catch (e) {}
	};

	return (
		<form className={styles.createContainer}>
			<div className={styles.title}>Create new post</div>
			<div>
				<div>
					<textarea
						className={styles.textField}
						placeholder="What's on your mind?"
						onChange={inputTextHandler}
					></textarea>
				</div>
			</div>
			<div className={styles.bottomButtons}>
				<div
					className={styles.uploadImage}
					onClick={() => {
						document.getElementById("multi")!.click();
					}}
				>
					<img
						src={file ? file : imagePlaceholder}
						alt="Upload"
						className={styles.uploadImagePreview}
					/>
					<input
						style={{ display: "none", width: 0, height: 0 }}
						type="file"
						onChange={handleChange}
						id="multi"
					/>
				</div>
				<div className={styles.submit} onClick={submitPostHandler}>
					<img src={submitArrow} alt="Submit" className={styles.submitArrow} />
				</div>
			</div>
		</form>
	);
};

export default CreateNewPost;
