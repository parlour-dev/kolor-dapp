import { useState } from "react";
import styles from "../CreateNewPost.module.css";
import ReactGa from "react-ga";
import { TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import { CreatePostType } from "../CreateNewPost";
import { useShowAlert } from "../../../hooks";

const CreateAudioPost: React.FC<CreatePostType> = ({
	onSubmit,
	inputText,
	setInputText,
}) => {
	const showAlert = useShowAlert();

	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState<string | undefined>();
	const [fileContentType, setFileContentType] = useState<string | undefined>(
		""
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setFile("");
			setFileName(undefined);

			if (!e.target?.files?.item(0)?.type.startsWith("audio/")) {
				showAlert("This is not an audio file.", "warning");
				return;
			}

			// @ts-ignore
			setFile(URL.createObjectURL(e.target.files[0]));
			setFileName(e.target?.files?.item(0)?.name);
			setFileContentType(e.target?.files?.item(0)?.type);
		} catch (e) {}
	};

	return (
		<>
			<div className={styles.TextFieldBorderRadius}>
				<TextField
					multiline
					fullWidth
					minRows={10}
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					label="What's on your mind?"
				/>
			</div>
			<div className={styles.submitColumn}>
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
					<AudioFileRoundedIcon
						style={{ fontSize: "6em", color: file ? "forestgreen" : "#a6a6a6" }}
					/>
					<input
						style={{ display: "none", width: 0, height: 0 }}
						type="file"
						onChange={handleChange}
						id="multi"
					/>
				</div>
				<div
					style={{
						flexGrow: 1,
					}}
				/>
				<div className={styles.beNice}>Posting {fileName} to Ropsten.</div>
				<div
					className={styles.submit}
					onClick={() => onSubmit(inputText, "audio", file, fileContentType)}
				>
					<CreateIcon sx={{ marginLeft: 0, marginRight: "0.1em" }} /> Submit
				</div>
			</div>
		</>
	);
};

export default CreateAudioPost;
