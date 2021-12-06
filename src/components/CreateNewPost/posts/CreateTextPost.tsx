import { TextField } from "@mui/material";
import styles from "../CreateNewPost.module.css";
import Logo from "../../Navbar/logo.png";
import NTFBackground from "../NFTBg.png";
import ChainBackground from "../chainBg.png";
import { CreatePostType } from "../CreateNewPost";
import { useShowAlert } from "../../../hooks";
import { resolveChainId } from "../../../api/backend";
import { useEthers } from "@usedapp/core";

const CreateTextPost: React.FC<CreatePostType> = ({
	onSubmitFree,
	onSubmitPaid,
	inputText,
	setInputText,
}) => {
	const { chainId } = useEthers();

	const showAlert = useShowAlert();
	const chain = resolveChainId(chainId || 3);

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
				<div className={styles.beNice}>
					<span className={styles.logoSection}>
						Posting to <img className={styles.logo} src={Logo} alt="" />
					</span>
					<br />
					<br />
					1. Be respectful
					<br />
					2. Behave as if you were in real life
					<br />
					3. Do not copy the work of others
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
					onClick={() => onSubmitPaid(inputText, "text")}
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
					onClick={() => onSubmitFree(inputText, "text")}
				>
					Submit for free
				</div>
			</div>
		</>
	);
};

export default CreateTextPost;
