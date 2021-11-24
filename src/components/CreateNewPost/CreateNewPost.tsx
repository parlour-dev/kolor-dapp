import React, { useEffect } from "react";
import styles from "../CreateNewPost/CreateNewPost.module.css";
//import submitArrow from "../CreateNewPost/arrow.png";
import CreateAudioPost from "./posts/CreateAudioPost";
import CreateImagePost from "./posts/CreateImagePost";
import CreateTextPost from "./posts/CreateTextPost";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { ContractPost } from "../../types";
import { uploadImageToAWS } from "../../api/uploadImage";
import ReactGa from "react-ga";
import { useShowAlert, useShowLoading, useTCPDataFunction } from "../../hooks";
import { useEthers } from "@usedapp/core";

export type OnSubmit = (
	text: string | undefined,
	file: string | undefined
) => void;

const CreateNewPost = () => {
	const [postType, setPostType] = useState<"text" | "image" | "audio">("text");

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	let history = useHistory();

	const { account, chainId } = useEthers();

	const { send, state } = useTCPDataFunction(
		"addContent",
		chainId || 3,
		"Add content"
	);

	const submitPost: OnSubmit = async (text, file) => {
		ReactGa.event({
			category: "Post Creation",
			action: "Post submission ",
		});

		if (!text) {
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
				title: text,
				url: fileUploadedTo,
				tags: ["testtag"],
			};

			send(JSON.stringify(newPost));
		} catch (err) {
			showLoading(false);
			showAlert("There was an error while creating your post.", "error");
		}
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
			history.push("/");
		}
	}, [state, history, showAlert, showLoading]);

	// FIXME: ZA MAŁY KONTRAST

	if (!account) {
		return (
			<form className={styles.createContainer}>
				<div className={styles.title}>You have to log in to create a post</div>
			</form>
		);
	}

	return (
		<form className={styles.createContainer}>
			<div className={styles.title}>Create new post</div>
			<div className={styles.postTypeButtons}>
				<div
					className={
						postType === "text" ? styles.buttonsChosen : styles.buttons
					}
					onClick={() => setPostType("text")}
				>
					Text
				</div>
				<div
					className={
						postType === "image" ? styles.buttonsChosen : styles.buttons
					}
					onClick={() => setPostType("image")}
				>
					Image/Video
				</div>
				<div
					className={
						postType === "audio" ? styles.buttonsChosen : styles.buttons
					}
					onClick={() => setPostType("audio")}
				>
					Audio
				</div>
			</div>
			<div className={styles.contentCreate}>
				{postType === "image" && <CreateImagePost onSubmit={submitPost} />}
				{postType === "audio" && <CreateAudioPost onSubmit={submitPost} />}
				{postType === "text" && <CreateTextPost onSubmit={submitPost} />}
			</div>
		</form>
	);
};

export default CreateNewPost;
