import { useState } from "react";
import styles from "../CreateNewPost.module.css";
import ReactGa from "react-ga";
import { TextField } from "@mui/material";
import NTFBackground from "../NFTBg.png";
import ChainBackground from "../chainBg.png";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import { CreatePostType } from "../CreateNewPost";
import { useShowAlert } from "../../../hooks";
import { useEthers } from "@usedapp/core";
import { resolveChainId } from "../../../api/backend";

const CreateAudioPost: React.FC<CreatePostType> = ({
	onSubmitPaid,
	onSubmitFree,
	inputText,
	setInputText,
}) => {
	const showAlert = useShowAlert();

	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState<string | undefined>();
	const [fileContentType, setFileContentType] = useState<string | undefined>(
		""
	);

	const { chainId } = useEthers();
	const chain = resolveChainId(chainId || 3);

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
				<div className={styles.beNice}>
					{fileName && (
						<>
							{" "}
							`Posting ${fileName}.` <br />{" "}
						</>
					)}
					Clicking "Save to blockchain" will allow you to post to {chain.name}.
					When you click "Submit", we'll post to Ropsten for you.
				</div>
				<div
					className={styles.submitToChain}
					onClick={() =>
						onSubmitPaid(inputText, "audio", file, fileContentType)
					}
					style={{
						backgroundImage: `url("${ChainBackground}")`,
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
						onSubmitFree(inputText, "audio", file, fileContentType)
					}
				>
					Submit for free
				</div>
			</div>
		</>
	);
};

export default CreateAudioPost;
