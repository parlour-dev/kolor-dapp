import { useState } from "react";
import imagePlaceholder from "../image.png";
import styles from "../CreateNewPost.module.css";
import ReactGa from "react-ga";
import { TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEthers } from "@usedapp/core";
import { resolveChainId } from "../../../api/backend";
import { OnSubmit } from "../CreateNewPost";

const CreateImagePost: React.FC<{ onSubmit: OnSubmit }> = ({ onSubmit }) => {
	const { chainId } = useEthers();
	const chain = resolveChainId(chainId || 3);

	const [file, setFile] = useState("");
	const [inputText, setInputText] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			// @ts-ignore
			setFile(URL.createObjectURL(e.target.files[0]));
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
				<div
					style={{
						flexGrow: 1,
					}}
				/>
				<div className={styles.beNice}>Posting to {chain.name}.</div>
				<div
					className={styles.submit}
					onClick={() => onSubmit(inputText, file)}
				>
					<CreateIcon sx={{ marginLeft: 0, marginRight: "0.1em" }} /> Submit
				</div>
			</div>
		</>
	);
};

export default CreateImagePost;
