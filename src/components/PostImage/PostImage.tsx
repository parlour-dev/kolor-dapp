import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import {
	useShowAlert,
	useShowLoading,
	useTCPDataCall,
	useToggle,
} from "../../hooks";
import { ethers } from "ethers";
import { useEthers } from "@usedapp/core";
import { useEffect } from "react";
import { useState } from "react";
import { fetchComments, postComment } from "../../api/comments";
import Comments from "./Comments/Comments";
import { CommentT, Post } from "../../types";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TipPopup from "./TipPopup/TipPopup";
import { useMediaQuery } from "@mui/material";
import { resolveNickname } from "../../api/nickname";
import { Link } from "react-router-dom";

type PostImageT = {
	post: Post;
	scrollPosition: ScrollPosition;
};

const PostImage: React.FC<PostImageT> = ({ post, scrollPosition }) => {
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

	const profilePictureHeight = useMediaQuery(
		"@media only screen and (max-width: 500px) and (min-height: 300px)"
	)
		? "5vmax"
		: "3.5vmax";

	// async function usdToEther() {
	// 	let etherPrice = await fetch(
	// 		"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
	// 	);
	// 	console.log(etherPrice);
	// }

	useEffect(() => {
		fetchComments(post.id)
			.then((data) => setComments(data))
			.catch(console.error);
	}, [post.id]);

	useEffect(() => console.log(comments), [comments]);

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
						<Link to={`/user/${post?.author}`} className={styles.creatorNick}>
							{resolveNickname(post?.author || "")}
						</Link>
						<div className={styles.creatorWallet}>{post?.author}</div>
					</div>
					<Link to={`/user/${post?.author}`} className={styles.profilePicutre}>
						{post.author && (
							<ProfilePicture
								address={post.author}
								height={profilePictureHeight}
							/>
						)}
					</Link>
				</div>
				<div className={styles.text}>{post.text}</div>
				<div className={styles.mediaContent}>
					{post.file && (
						<LazyLoadImage
							alt=""
							effect="blur"
							src={"https://" + post.file}
							className={styles.mediaContent}
							scrollPosition={scrollPosition}
						/>
					)}
				</div>
				<div id="renderTips">
					<Tips amounts={{ ethereum: etherTipBalance }} />
				</div>

				<div className={styles.viewerAction}>
					<div
						className={[styles.buttonBlue, styles.animation].join(" ")}
						onClick={() => {
							setPopup(true);
						}}
					>
						Appreciate
					</div>
					<TipPopup
						postId={post.id}
						open={popup}
						onClose={() => setPopup(false)}
					/>
					<div
						className={[styles.buttonBlack, styles.animation].join(" ")}
						onClick={toggleAddComment}
					>
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
