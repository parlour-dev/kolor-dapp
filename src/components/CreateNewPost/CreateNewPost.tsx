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

const CreateNewPost = () => {
	const [postType, setPostType] = useState<"text" | "image" | "audio">("image");

	const [inputText, setInputText] = useState("");
	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	let history = useHistory();

	const { chainId } = useEthers();

	const { send, state } = useTCPDataFunction(
		"addContent",
		chainId || 3,
		"Add content"
	);

	/*const submitPostHandler = async (e: React.MouseEvent) => {
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
			//setInputText("");
			history.push("/");
		}
	}, [state, history, showAlert, showLoading]);*/

	// FIXME: ZA MAŁY KONTRAST

	return (
		<form className={styles.createContainer}>
			<div className={styles.title}>Create new post</div>
			<div className={styles.postTypeButtons}>
				<div className={styles.buttons} onClick={() => setPostType("text")}>
					Text
				</div>
				<div className={styles.buttons} onClick={() => setPostType("image")}>
					Image/Video
				</div>
				<div className={styles.buttons} onClick={() => setPostType("audio")}>
					Audio
				</div>
			</div>
			<div className={styles.contentCreate}>
				{postType === "image" && <CreateImagePost />}
				{postType === "audio" && <CreateAudioPost />}
				{postType === "text" && <CreateTextPost />}
				{/*<div className={styles.defaultSwitch}>
						<div className={styles.netykietaKurwa}>RESPECT MR PARK</div>
						<div className={styles.nsfw}>NSFW</div>
						<div className={styles.chain}>Chain</div>
				</div>

				<div className={styles.submit} onClick={() => {} submitPostHandler}>
					Submit
				</div>*/}
			</div>
		</form>
	);
};

export default CreateNewPost;
