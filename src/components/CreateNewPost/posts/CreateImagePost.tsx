import { useState } from "react";
import imagePlaceholder from "../image.png";
import styles from "../CreateNewPost.module.css";
import ReactGa from "react-ga";
import { TextField } from "@mui/material";
import NTFBackground from "../NFTBg.png";
import ChainBackground from "../chainBg.png";
import { CreatePostType } from "../CreateNewPost";
import { useShowAlert } from "../../../hooks";
import { useEthers } from "@usedapp/core";
import { resolveChainId } from "../../../api/backend";

const CreateImagePost: React.FC<CreatePostType> = ({
	onSubmitFree,
	onSubmitPaid,
	inputText,
	setInputText,
}) => {
	const [file, setFile] = useState("");
	const showAlert = useShowAlert();

	const { chainId } = useEthers();
	const chain = resolveChainId(chainId || 3);

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
				<div className={styles.beNice}>
					Clicking "Save to blockchain" will allow you to post to {chain.name}.
					When you click "Submit", we'll post to Ropsten for you.
				</div>
				<div
					className={styles.submitToChain}
					onClick={() =>
						onSubmitPaid(inputText, "image", file, "application/octet-stream")
					}
					style={{
						backgroundImage: `url("${ChainBackground}")`,
						backgroundSize: "40%",
					}}
				>
					Save to Blockchain
				</div>
				<div
					className={styles.submitNFT}
					onClick={() => showAlert("Coming soon!", "info")}
					style={{
						backgroundImage: `url("${NTFBackground}")`,
					}}
				>
					Mint as NFT
				</div>
				<div
					className={styles.submit}
					onClick={() =>
						onSubmitFree(inputText, "image", file, "application/octet-stream")
					}
				>
					Submit for free
				</div>
			</div>
		</>
	);
};

export default CreateImagePost;
