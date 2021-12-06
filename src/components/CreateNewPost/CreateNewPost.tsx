import React, { useEffect } from "react";
import styles from "../CreateNewPost/CreateNewPost.module.css";
import CreateAudioPost from "./posts/CreateAudioPost";
import CreateImagePost from "./posts/CreateImagePost";
import CreateTextPost from "./posts/CreateTextPost";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { ContractPost } from "../../types";
import {
	uploadAudioToAWS,
	uploadImageToAWS,
} from "../../api/uploadImageOrAudio";
import ReactGa from "react-ga";
import { useShowAlert, useShowLoading, useTCPDataFunction } from "../../hooks";
import { useEthers } from "@usedapp/core";
import { createNewPostBackend } from "../../api/backend";

type PostType = "text" | "image" | "audio";

export type OnSubmit = (
	text: string | undefined,
	type: PostType,
	file?: string,
	fileContentType?: string
) => void;

export type GetContractPost = (
	text: string | undefined,
	type: PostType,
	file?: string,
	fileContentType?: string
) => Promise<ContractPost | undefined>;

export type CreatePostType = {
	onSubmitFree: OnSubmit;
	onSubmitPaid: OnSubmit;
	inputText: string;
	setInputText: React.Dispatch<React.SetStateAction<string>>;
};

const CreateNewPost = () => {
	const [postType, setPostType] = useState<PostType>("text");

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	const [inputText, setInputText] = useState("");

	let history = useHistory();

	const { account, library, chainId } = useEthers();

	const { send, state } = useTCPDataFunction(
		"addContent",
		chainId || 3,
		"Add content"
	);

	const getContractPost: GetContractPost = async (
		text,
		type,
		file,
		fileContentType
	) => {
		ReactGa.event({
			category: "Post Creation",
			action: "Post submission ",
		});

		if (!text) {
			showAlert("The post can't be empty!", "error");
			return;
		}

		if (type !== "text" && !file) {
			showAlert("You have to choose a file!", "error");
			return;
		}

		showLoading(true);

		let fileUploadedTo = undefined;

		if (type === "image" && file) {
			fileUploadedTo = await uploadImageToAWS(file);
		} else if (type === "audio" && file) {
			fileUploadedTo = await uploadAudioToAWS(
				file,
				fileContentType || "application/octet-stream"
			);
		}

		const newPost: ContractPost = {
			title: text,
			url: fileUploadedTo,
			tags: [type],
		};

		return newPost;
	};

	const submitPostFree: OnSubmit = async (
		text,
		type,
		file,
		fileContentType
	) => {
		try {
			const newPost = await getContractPost(text, type, file, fileContentType);
			if (!newPost) return;

			const newPostHeader = JSON.stringify(newPost);

			const request = createNewPostBackend(
				newPostHeader,
				account || "",
				(await library?.getSigner().signMessage(newPostHeader)) || ""
			);

			if ((await request).ok) {
				showAlert(
					"Your post has been submitted. You will need to wait a minute until the transaction is mined on the blockchain.",
					"info"
				);

				showLoading(false);
				history.goBack();
			} else {
				throw new Error("");
			}
		} catch (err) {
			showAlert("There was an error while creating your post.", "error");
		}

		showLoading(false);
	};

	const submitPostPaid: OnSubmit = async (
		text,
		type,
		file,
		fileContentType
	) => {
		try {
			const newPost = await getContractPost(text, type, file, fileContentType);
			if (!newPost) return;

			send(JSON.stringify(newPost));
		} catch (err) {
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
			<div className={styles.subtitle}>
				Posting is free. We'll pay the fees!
			</div>
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
				{postType === "image" && (
					<CreateImagePost
						inputText={inputText}
						setInputText={setInputText}
						onSubmitPaid={submitPostPaid}
						onSubmitFree={submitPostFree}
					/>
				)}
				{postType === "audio" && (
					<CreateAudioPost
						inputText={inputText}
						setInputText={setInputText}
						onSubmitPaid={submitPostPaid}
						onSubmitFree={submitPostFree}
					/>
				)}
				{postType === "text" && (
					<CreateTextPost
						inputText={inputText}
						setInputText={setInputText}
						onSubmitPaid={submitPostPaid}
						onSubmitFree={submitPostFree}
					/>
				)}
			</div>
		</form>
	);
};

export default CreateNewPost;
