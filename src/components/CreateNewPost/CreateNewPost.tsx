import React, { useEffect } from "react";
import styles from "../CreateNewPost/CreateNewPost.module.css";
import imagePlaceholder from "../CreateNewPost/image.png";
import submitArrow from "../CreateNewPost/arrow.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { ContractPost } from "../../types";
import { uploadImageToAWS } from "../../api/uploadImage";
import ReactGa from "react-ga";
import { Backdrop, CircularProgress } from "@mui/material";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import { tcpdata_abi, tcpdata_address } from "../../api/tcpdata";
import { useShowAlert } from "../../hooks";

const CreateNewPost = () => {
	const [file, setFile] = useState("");
	const [inputText, setInputText] = useState("");
	const [loading, setLoading] = useState(false);
	const showAlert = useShowAlert();

	let history = useHistory();

	const { send, state } = useContractFunction(
		// @ts-ignore
		new Contract(tcpdata_address, tcpdata_abi),
		"addContent",
		{ transactionName: "Add content" }
	);

	const inputTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(e.target.value);
	};

	const submitPostHandler = async (e: React.MouseEvent) => {
		e.preventDefault();

		ReactGa.event({
			category: "Post Creation",
			action: "Post submission ",
		});

		if (!inputText && !file) {
			showAlert("The post can't be empty!", "error");
			ReactGa.event({
				category: "Post Creation",
				action: "Empty Post",
			});
			return;
		}

		setLoading(true);

		try {
			let fileUploadedTo = file ? await uploadImageToAWS(file) : undefined;

			const newPost: ContractPost = {
				title: inputText,
				url: fileUploadedTo,
				tags: ["testtag"],
			};

			send(JSON.stringify(newPost));
		} catch (err) {
			setLoading(false);
			console.error(err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			// @ts-ignore
			setFile(URL.createObjectURL(e.target.files[0]));
		} catch (e) {}
	};

	useEffect(() => {
		if (state.status !== "None") {
			setLoading(false);
		}

		if (state.status === "Exception") {
			showAlert(
				"There was a problem while processing your transaction.",
				"error"
			);
		}

		if (state.status === "Mining") {
			showAlert(
				"Your post has been submitted. You will need to wait a minute until the transaction is mined on the blockchain.",
				"info"
			);
			setInputText("");
			history.push("/");
		}
	}, [state, history, showAlert]);

	return (
		<form className={styles.createContainer}>
			{loading && (
				<Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={loading}>
					<CircularProgress />
				</Backdrop>
			)}

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
						ReactGa.event({
							category: "Post creating",
							action: "Image submission",
						});
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
