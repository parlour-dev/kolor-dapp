import { TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import styles from "../CreateNewPost.module.css";
import Logo from "../../Navbar/logo.png";
import { useEthers } from "@usedapp/core";
import { resolveChainId } from "../../../api/backend";
import { useState } from "react";
import { OnSubmit } from "../CreateNewPost";

const CreateTextPost: React.FC<{ onSubmit: OnSubmit }> = ({ onSubmit }) => {
	const { chainId } = useEthers();
	const chain = resolveChainId(chainId || 3);

	const [inputText, setInputText] = useState("");

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
				<div className={styles.beNice}>Posting to {chain.name}.</div>
				<div
					className={styles.submit}
					onClick={() => onSubmit(inputText, undefined)}
				>
					<CreateIcon sx={{ marginLeft: 0, marginRight: "0.1em" }} /> Submit
				</div>
			</div>
		</>
	);
};

export default CreateTextPost;
