import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import Chain from "./Chain/Chain";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { useShowAlert, useShowLoading, useToggle } from "../../hooks";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { postComment } from "../../api/comments";
import Comments from "./Comments/Comments";
import { CommentT, Post } from "../../types";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import TipButton from "./TipButton/TipButton";
import { Tooltip } from "@mui/material";
import DOMPurify from "dompurify";
import { useUsername } from "../../api/username";

type PostImageT = {
	post: Post;
	scrollPosition: ScrollPosition;
	hideAction?: boolean;
};

const PostImage: React.FC<PostImageT> = ({
	post,
	scrollPosition,
	hideAction,
}) => {
	const [showAddComment, toggleAddComment] = useToggle(false);
	const [comments, setComments] = useState<CommentT[]>(post.comments);

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	const { account, library } = useEthers();

	const authorUsername = useUsername(post.author);

	const isAudioPost = post.contentType?.startsWith("audio/");

	async function onCommentSubmit(newComment: string) {
		showLoading(true);

		// prevent empty comments
		if (!newComment) {
			showAlert("The comment can't be empty!", "error");
		} else if (!account || !library) {
			showAlert("You have to be logged in to add a comment.", "error");
		} else {
			try {
				const text = newComment.replaceAll("\n", "<br/>");

				const toSign = "Kolor Comment: " + text + "\nFor post: " + post.uuid;

				// post the comment using the api
				const result = await postComment(
					post.uuid,
					text,
					account,
					await library.getSigner().signMessage(toSign)
				);

				// if the posting went fine, add the comment to the local list
				// (to avoid fetching again)
				if (result.ok)
					setComments([...comments, { author: account, content: text }]);
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
							{authorUsername}
						</Link>
						<div className={styles.creatorWallet}>{post?.author}</div>
					</div>
					<Link to={`/user/${post?.author}`} className={styles.profilePicutre}>
						{post.author && (
							<ProfilePicture address={post.author} height="2.8rem" />
						)}
					</Link>
				</div>
				<div
					className={styles.text}
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(post.text, {
							USE_PROFILES: { html: true },
						}),
					}}
				></div>

				<div className={styles.mediaContent}>
					{post.file && !isAudioPost && (
						<LazyLoadImage
							alt=""
							effect="blur"
							src={"https://" + post.file}
							style={{ width: "100%", height: "100%" }}
							className={styles.image}
							scrollPosition={scrollPosition}
						/>
					)}
					{isAudioPost && post.file && (
						<audio controls>
							<source src={"https://" + post.file} />
							Your browser does not support the audio element.
						</audio>
					)}
				</div>
				<div id="renderTips">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-end",
						}}
					>
						<Tips amounts={{ ethereum: post.balance }} />
						<Chain blockchain={post.chainid} />
					</div>
					<div
						style={{
							borderBottom: "0.1vmax solid #535353",
							clear: "both",
							marginTop: "0.5vmax",
						}}
					></div>
				</div>

				{!hideAction && (
					<div className={styles.viewerAction}>
						{account === post.author && post.chainid === 0 && (
							<Link
								className={[styles.buttonMint, styles.animation].join(" ")}
								to={`/mint/${post.uuid}`}
							>
								Mint as NFT
							</Link>
						)}
						{account === post.author && post.chainid !== 0 && (
							<Tooltip title={`This post has already been minted.`}>
								<Link
									className={[styles.buttonOff, styles.animation].join(" ")}
									to="#"
								>
									Mint as NFT
								</Link>
							</Tooltip>
						)}
						{account !== post.author && <TipButton post={post} />}

						<div
							className={[styles.buttonBlack, styles.animation].join(" ")}
							onClick={toggleAddComment}
						>
							Comment
						</div>
					</div>
				)}

				{showAddComment && <AddComment onSubmit={onCommentSubmit} />}

				<Comments commentData={comments} />
			</div>
		</div>
	);
};

export default PostImage;
