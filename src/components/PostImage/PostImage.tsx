import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
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
import { CommentT, Post } from "../../types";
import { Box, Modal } from "@mui/material";

type PostImageT = {
	post: Post;
};

const PostImage: React.FC<PostImageT> = ({ post }) => {
	const [showAddComment, toggleAddComment] = useToggle(false);
	const [comments, setComments] = useState<CommentT[]>([]);

	const [popup, setPopup] = useState(false);

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	const { account, library } = useEthers();

	const [etherTipBalanceRaw] = useTCPDataCall("getContentBalance", [
		post.id,
	]) || [0];
	const etherTipBalance = ethers.utils.formatUnits(etherTipBalanceRaw, "ether");

	const [tipAmount, setTipAmount] = useState("0");
	const refreshValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTipAmount(e.target.value);
	};
	function tipFunction1() {
		console.log("button1");
		setTipAmount("0.5");
	}
	function tipFunction2() {
		console.log("button2");
		setTipAmount("0.1");
	}
	function tipFunction3() {
		console.log("button3");
		setTipAmount("0.05");
	}
	const { send, state } = useTCPDataFunction("tipContent", "Tip post");

	useEffect(() => {
		fetchComments(post.id)
			.then((data) => setComments(data))
			.catch(console.error);
	}, [post.id]);

	function handleTip() {
		ReactGa.event({
			category: "Tip",
			action: "Tip sent",
		});

		showLoading(true);
		send(post.id, { value: ethers.utils.parseUnits(tipAmount) });
	}

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
					post.id,
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
						<div className={styles.creatorNick}>ja</div>
						<div className={styles.creatorWallet}>{post?.author}</div>
					</div>
					<div className={styles.profilePicutre}>
						{post.author && <ProfilePicture address={post.author} />}
					</div>
				</div>
				<div className={styles.text}>{post.text}</div>
				<div className={styles.mediaContent}>
					{post.file && (
						<img
							alt=""
							src={"https://" + post.file}
							className={styles.mediaContent}
						/>
					)}
				</div>

				<div id="renderTips">
					<Tips
						amounts={{
							ethereum: etherTipBalance,
						}}
					/>
				</div>

				<div className={styles.viewerAction}>
					<div
						className={styles.buttonBlue}
						onClick={() => {
							setPopup(true);
						}}
					>
						Appreciate
					</div>
					<Modal
						open={popup}
						onClose={() => setPopup(false)}
						sx={{ zIndex: 99999 }}
					>
						<Box
							sx={{
								position: "absolute",
								left: "50%",
								top: "50%",
								transform: "translate(-50%, -50%)",
								outline: "none",
							}}
						>
							<div className={styles.popupContainer}>
								<div className={styles.popupRow}>
									<input
										type="number"
										className={styles.popupInput}
										placeholder="Amount"
										onChange={refreshValue}
										value={tipAmount}
									/>
									<div className={styles.currency}>ETH</div>
									<div onClick={handleTip} className={styles.popupTip}>
										Send
									</div>
								</div>
								<div className={styles.popupRow}>
									<button
										className={styles.popupAmountButton}
										onClick={tipFunction1}
									>
										0.5 ETH
									</button>
									<button
										className={styles.popupAmountButton}
										onClick={tipFunction2}
									>
										0.1 ETH
									</button>
									<button
										className={styles.popupAmountButton}
										onClick={tipFunction3}
									>
										0.05 ETH
									</button>
									<button className={styles.popupAmountButton}>$10</button>
									<button className={styles.popupAmountButton}>$5</button>
									<button className={styles.popupAmountButton}>$1</button>
								</div>
							</div>
						</Box>
					</Modal>
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
