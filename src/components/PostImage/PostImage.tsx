import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Popup from "reactjs-popup";
import { useShowAlert, useToggle } from "../../hooks";
import { ethers } from "ethers";
import { tcpdata_abi, tcpdata_address } from "../../api/tcpdata";
import { useContractCall, useEthers } from "@usedapp/core";
import ReactGa from "react-ga";
import { useEffect } from "react";
import { useState } from "react";
import { fetchComments, postComment } from "../../api/comments";
import Comments from "./Comments/Comments";
import { CommentT } from "../../types";
// import { useSendTransaction } from "@usedapp/core";
import { Backdrop, CircularProgress } from "@mui/material";

type PostImageT = {
	text: string;
	img: string;
	idx: number;
	author: string;
};

const PostImage: React.FC<PostImageT> = ({ text, img, idx, author }) => {
	const [showAddComment, toggleAddComment] = useToggle(false);
	const [comments, setComments] = useState<CommentT[]>([]);

  // const [tip, setTip] = useState(0);
	// FOR ANTONI: use tip variable to set the amount of a tip.

	const [commentPending, setCommentPending] = useState(false);

	const showAlert = useShowAlert();

	const { account, library } = useEthers();

	const [etherTipBalanceRaw] = useContractCall({
		abi: new ethers.utils.Interface(tcpdata_abi),
		address: tcpdata_address,
		method: "getContentBalance",
		args: [idx],
	}) || [0];
	const etherTipBalance = ethers.utils.formatUnits(etherTipBalanceRaw, "ether");

	useEffect(() => {
		fetchComments(idx)
			.then((data) => setComments(data))
			.catch(console.error);
	}, [idx]);

	function handleTip() {
		
		ReactGa.event({
			category: "Tip",
			action: "Tip sent",
		});
		//result.catch(console.error);
	}

	async function onCommentSubmit(newComment: string) {
		setCommentPending(true);

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
			} catch (e) {
				showAlert("There was an error while submitting your comment.", "error");
			}
		}

		setCommentPending(false);
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
								// onChange={(e) => setTip(parseInt(e.target.value))}
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

			{commentPending && (
				<Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={commentPending}>
					<CircularProgress />
				</Backdrop>
			)}
		</div>
	);
};

export default PostImage;
