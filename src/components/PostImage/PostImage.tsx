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
import { resolveNickname } from "../../api/nickname";
import { Link } from "react-router-dom";
import TipButton from "./TipButton/TipButton";

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
				const toSign =
					"Kolor Comment: " + newComment + "\nFor post: " + post.uuid;

				// post the comment using the api
				const result = await postComment(
					post.uuid,
					newComment,
					account,
					await library.getSigner().signMessage(toSign)
				);

				// if the posting went fine, add the comment to the local list
				// (to avoid fetching again)
				if (result.ok)
					setComments([...comments, { author: account, content: newComment }]);
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
							<ProfilePicture address={post.author} height="2.8rem" />
						)}
					</Link>
				</div>
				<div className={styles.text}>{post.text}</div>

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
						<TipButton post={post} />
						<div
							className={[styles.buttonBlack, styles.animation].join(" ")}
							onClick={toggleAddComment}
						>
							Comment
						</div>
						hihihi a tutaj jakiś link do: /mint/{post.uuid}
					</div>
				)}

				{showAddComment && <AddComment onSubmit={onCommentSubmit} />}

				<Comments commentData={comments} />
			</div>
		</div>
	);
};

export default PostImage;
