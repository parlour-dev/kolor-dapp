import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Popup from "reactjs-popup";
import {
	useShowAlert,
	useShowLoading,
	useTCPDataCall,
	useTCPDataFunction,
	useToggle,
} from "../../hooks";
import { ethers } from "ethers";
import { useEthers } from "@usedapp/core";
import ReactGa from "react-ga";
import { useEffect } from "react";
import { useState } from "react";
import { fetchComments, postComment } from "../../api/comments";
import Comments from "./Comments/Comments";
import { CommentT } from "../../types";

type PostImageT = {
	text: string;
	img: string;
	idx: number;
	author: string;
};

const PostImage: React.FC<PostImageT> = ({ text, img, idx, author }) => {
	const [showAddComment, toggleAddComment] = useToggle(false);
	const [comments, setComments] = useState<CommentT[]>([]);

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	const { account, library } = useEthers();

	const [etherTipBalanceRaw] = useTCPDataCall("getContentBalance", [idx]) || [
		0,
	];
	const etherTipBalance = ethers.utils.formatUnits(etherTipBalanceRaw, "ether");

	const [tipAmount, setTipAmount] = useState(ethers.BigNumber.from(0));
	const { send, state } = useTCPDataFunction("tipContent", "Tip post");

	useEffect(() => {
		fetchComments(idx)
			.then((data) => setComments(data))
			.catch(console.error);
	}, [idx]);

	async function handleTip() {
		ReactGa.event({
			category: "Tip",
			action: "Tip sent",
		});

		showLoading(true);
		send(idx, { value: tipAmount });
	}

	useEffect(() => {
		if (state.status !== "None") {
			console.log("gere");
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
				"Your tip has been sent. You will need to wait a minute until the transaction is mined on the blockchain.",
				"info"
			);
		}
	}, [state, showAlert, showLoading]);

	async function onCommentSubmit(newComment: string) {
		showLoading(true);

		// prevent empty comments
		if (!newComment) {
			showAlert("The comment can't be empty!", "error");
		} else if (!account || !library) {
			showAlert("You have to be logged in to add a comment.", "error");
		} else {
			try {
				// post the comment using the api
				const result = await postComment(
					idx,
					newComment,
					account,
					await library.getSigner().signMessage(newComment)
				);

				// if the posting went fine, add the comment to the local list
				// (to avoid fetching again)
				if (result.ok)
					setComments([...comments, { a: account, c: newComment }]);
				else
					showAlert(
						"There was an error while submitting your comment.",
						"error"
					);
			} catch (e) {
				showAlert("There was an error while submitting your comment.", "error");
			}
		}

		showLoading(false);
	}

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div className={styles.creator}>
					<div className={styles.creatorInfo}>
						<div className={styles.creatorNick}>ja debugid:{idx}</div>
						<div className={styles.creatorWallet}>{author}</div>
					</div>
					<div className={styles.profilePicutre}>
						<ProfilePicture address={author} />
					</div>
				</div>
				<div className={styles.text}>{text}</div>
				<div className={styles.mediaContent}>
					{img && (
						<img
							alt=""
							src={"https://" + img}
							className={styles.mediaContent}
						/>
					)}
				</div>

				<div id="renderTips">
					<Tips
						amounts={{
							ethereum: etherTipBalance,
							dai: 32,
							additional: [
								{ name: "WAP", amount: 23 },
								{ name: "WBTC", amount: 0.5 },
							],
						}}
					/>
				</div>

				<div className={styles.viewerAction}>
					<Popup
						trigger={
							<div className={styles.buttonBlue} /*onClick={handleTip}*/>
								Appreciate
							</div>
						}
						modal
					>
						<div className={styles.popup}>
							<input
								type="number"
								className={styles.popupInput}
								placeholder="Amount"
								onChange={(e) =>
									setTipAmount(ethers.utils.parseUnits(e.target.value))
								}
							/>
							<div className="currencyChooser">
								<select name="currency" id="currency">
									<option value="ETH">ETH</option>
									<option value="DAI">DAI</option>
									<option value="WBTC">WBTC</option>
								</select>
							</div>
							<div onClick={handleTip} className={styles.popupTip}>
								Send
							</div>
						</div>
					</Popup>
					<div className={styles.buttonBlack} onClick={toggleAddComment}>
						Comment
					</div>
				</div>
				{showAddComment && <AddComment onSubmit={onCommentSubmit} />}

				<Comments commentData={comments} />
			</div>
		</div>
	);
};

export default PostImage;
