import React, { useState } from "react";
import styles from "./Journey.module.css";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
// import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import Image from "./image.png";
//import Video from "./video.png";
import Audio from "./audio.png";
import { marked } from "marked";
import { useShowAlert, useShowLoading } from "../../../hooks";
import ReactGa from "react-ga";
import {
	uploadAudioToAWS,
	uploadImageToAWS,
} from "../../../api/uploadImageOrAudio";
import {
	ContractPost,
	GetContractPost,
	OnSubmit,
	PostType,
} from "../../../types";
import { createNewPostBackend } from "../../../api/backend";
import { useUsername } from "../../../api/username";

const Journey: React.FC = () => {
	const { account, library } = useEthers();

	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState<string | undefined>();
	const [fileContentType, setFileContentType] = useState<string | undefined>(
		""
	);
	const [inputText, setInputText] = useState("");

	const username = useUsername(account);

	const quotes = [
		"Dreams come true when you don't sleep.",
		"Give me a museum and I'll fill it.",
		"Art should comfort the disturbed and disturb the comfortable.",
		"I saw the angel in the marble and carved until i set him free.",
		"<3",
		"For the future of social media.",
		"I have a flood of ideas in my mind. I just follow my vision.",
		"Creativity takes courage.",
		"We don't make mistakes, just happy little accidents.",
	];
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	const [postType, setPostType] = useState<PostType>("text");

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

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
			const title = "Some Title";
			const parsedText = marked.parse(text || "", {
				gfm: true,
				breaks: true,
				silent: true,
				xhtml: true,
			});
			const newPost = await getContractPost(
				parsedText,
				type,
				file,
				fileContentType
			);
			if (!newPost) return;

			const headerToSign =
				"Kolor Post: " +
				(title || "") +
				"\nText: " +
				(newPost.title || "") +
				"\nFile: " +
				(newPost.url || "") +
				"\n" +
				(fileContentType || "");

			const request = createNewPostBackend(
				title || "",
				newPost.title || "",
				fileContentType || "",
				newPost.url || "",
				account || "",
				(await library?.getSigner().signMessage(headerToSign)) || ""
			);

			if ((await request).ok) {
				showAlert("Your post has been submitted.", "info");

				showLoading(false);
			} else {
				throw new Error("");
			}
		} catch (err) {
			showAlert("There was an error while creating your post.", "error");
		}

		showLoading(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setFile("");
			setFileName(undefined);

			if (
				postType === "audio" &&
				!e.target?.files?.item(0)?.type.startsWith("audio/")
			) {
				showAlert("This is not an audio file.", "warning");
				return;
			}

			if (
				postType === "image" &&
				!e.target?.files?.item(0)?.type.startsWith("image/")
			) {
				showAlert("This is not an image.", "warning");
				return;
			}

			// @ts-ignore
			setFile(URL.createObjectURL(e.target.files[0]));
			setFileName(e.target?.files?.item(0)?.name);
			setFileContentType(e.target?.files?.item(0)?.type);
		} catch (e) {}
	};

	return (
		<div className={styles.container}>
			<div className={styles.JourneyText}>Your journey starts here</div>
			{account && (
				<div className={styles.JourneyPost}>
					<Link to="/profile">
						<div className={styles.InfoContainer}>
							<ProfilePicture
								className={styles.profilePicutre}
								address={account}
								height="2.8rem"
							/>
							<div className={styles.userInfo}>
								<div className={styles.userNickname}>{username}</div>
								<div className={styles.userAddress}>{account}</div>
							</div>
						</div>
					</Link>

					<div className={styles.MediaContent}>
						<textarea
							className={styles.textareaStyling}
							placeholder={randomQuote}
							onChange={(e) => {
								setInputText(e.target.value);
							}}
						></textarea>
					</div>

					<div className={styles.buttons}>
						<div className={styles.buttonsContainer}>
							<div
								className={[styles.buttonMedia, styles.animation].join(" ")}
								onClick={() => {
									setPostType("image");
									document.getElementById("multi")!.click();
								}}
							>
								<img className={styles.buttonIcon} src={Image} alt="Upload" />
							</div>
							{/*<div
								className={[styles.buttonMedia, styles.animation].join(" ")}
								onClick={() => {
									setPostType("image");
									document.getElementById("multi")!.click();
								}}
							>
								<img className={styles.buttonIcon} src={Video} alt="Upload" />
							</div>*/}
							<div
								className={[styles.buttonMedia, styles.animation].join(" ")}
								onClick={() => {
									setPostType("audio");
									document.getElementById("multi")!.click();
								}}
							>
								<img className={styles.buttonIcon} src={Audio} alt="Upload" />
							</div>
						</div>
						<div
							className={[styles.buttonCreate, styles.animation].join(" ")}
							onClick={() => {
								if (!file)
									submitPostFree(inputText, "text", file, fileContentType);
								else submitPostFree(inputText, postType, file, fileContentType);
							}}
						>
							Create
						</div>
						<input
							style={{ display: "none", width: 0, height: 0 }}
							type="file"
							onChange={handleChange}
							id="multi"
						/>
					</div>
					<div className={styles.fileName}>
						{fileName && `Uploading: ${fileName}`}
					</div>
				</div>
			)}
		</div>
	);
};

export default Journey;
