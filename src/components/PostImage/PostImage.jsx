import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import { useToggle } from "../../hooks";

function PostImage({ text, img, children, onCommentSubmit }) {
	const [showAddComment, toggleAddComment] = useToggle(false);

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div className={styles.creator}>
					<div className={styles.creatorInfo}>
						<div className={styles.creatorNick}>ja</div>
						<div className={styles.creatorWallet}>
							0x1029381d89889hf98189dh981
						</div>
					</div>
					<div className={styles.profPicture}></div>
				</div>
				<div className={styles.text}>{text}</div>
				<div className={styles.mediaContent}>
					<img alt="" src={img} className={styles.mediaContent} />
				</div>
				<div className={styles.viewerAction}>
					<div className={styles.buttonBlue}>Appreciate</div>
					<div className={styles.buttonBlack} onClick={toggleAddComment}>
						Comment
					</div>
				</div>
				{showAddComment && <AddComment onSubmit={onCommentSubmit} />}
				{children}
			</div>
		</div>
	);
}

export default PostImage;
