import React, { useEffect } from "react";
import styles from "../CreateNewPost/CreateNewPost.module.css";
import imagePlaceholder from "../CreateNewPost/image.png";
import submitArrow from "../CreateNewPost/arrow.png";
import AudioPost from "./AudioPost";
import ImagePost from "./ImagePost";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { ContractPost } from "../../types";
import { uploadImageToAWS } from "../../api/uploadImage";
import ReactGa from "react-ga";
import { useShowAlert, useShowLoading, useTCPDataFunction } from "../../hooks";
import { useEthers } from "@usedapp/core";

const CreateNewPost = () => {
	const [file, setFile] = useState("");
	const [inputText, setInputText] = useState("");
	const showAlert = useShowAlert();
	const showLoading = useShowLoading();
	const [postTextType, postTextSwitch] = useState(true);
	const [postImageType, postImageSwitch] = useState(false);
	const [postAudioType, postAudioSwitch] = useState(false);

	function handleTextPost() {
		postTextSwitch(true);
		postImageSwitch(false);
		postAudioSwitch(false);
	}
	function handleImagePost() {
		postTextSwitch(false);
		postImageSwitch(true);
		postAudioSwitch(false);
	}
	function handleAudioPost() {
		postTextSwitch(false);
		postImageSwitch(false);
		postAudioSwitch(true);
	}

	let history = useHistory();

	const { chainId } = useEthers();

	const { send, state } = useTCPDataFunction(
		"addContent",
		chainId || 3,
		"Add content"
	);

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

		showLoading(true);

		try {
			let fileUploadedTo = file ? await uploadImageToAWS(file) : undefined;

			const newPost: ContractPost = {
				title: inputText,
				url: fileUploadedTo,
				tags: ["testtag"],
			};

			send(JSON.stringify(newPost));
		} catch (err) {
			showLoading(false);
			showAlert("There was an error while creating your post.", "error");
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
				"Your post has been submitted. You will need to wait a minute until the transaction is mined on the blockchain.",
				"info"
			);
			setInputText("");
			history.push("/");
		}
	}, [state, history, showAlert, showLoading]);

	return (
		<form className={styles.createContainer}>
			<div className={styles.title}>Create new post</div>
			<div className={styles.buttonsUp}>
				<div className={styles.buttons} onClick={handleTextPost}>
					Text
				</div>
				<div className={styles.buttons} onClick={handleImagePost}>
					Image/Video
				</div>
				<div className={styles.buttons} onClick={handleAudioPost}>
					Audio
				</div>
			</div>
			<div className={styles.contentCreate}>
				<div>
					<textarea
						className={styles.textField}
						// placeholder="   What's on your mind?"
						onChange={(e) => setInputText(e.target.value)}
					></textarea>
				</div>
				<div className={styles.bottomText}>
					{/* <div
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
				</div> */}
					<div className={styles.gigaContainer}>
						{postImageType && <ImagePost />}
						{postAudioType && <AudioPost />}
						{postTextType && (
							<div className={styles.defaultSwitch}>
								<div className={styles.netykietaKurwa}>RESPECT MR PARK</div>
								<div className={styles.nsfw}>NSFW</div>
								<div className={styles.chain}>Chain</div>
							</div>
						)}

						<div className={styles.submit} onClick={submitPostHandler}>
							Submit
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateNewPost;
