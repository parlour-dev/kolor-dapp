import styles from "./PostImage.module.css";
import AddComment from "./Comments/AddComment";
import Tips from "../Tips/Tips";
import { useToggle } from "../../hooks";

function PostImage({ text, img, author, children, onCommentSubmit }) {
	const [showAddComment, toggleAddComment] = useToggle(false);

	var EtherTips = 1;
	var DaiTips = 100;

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div className={styles.creator}>
					<div className={styles.creatorInfo}>
						<div className={styles.creatorNick}>ja</div>
						<div className={styles.creatorWallet}>{author}</div>
					</div>
					<div className={styles.profPicture}></div>
				</div>
				<div className={styles.text}>{text}</div>
				<div className={styles.mediaContent}>
					{img && <img alt="" src={img} className={styles.mediaContent} />}
				</div>

				<div id="renderTips">
					{EtherTips > 0 && DaiTips > 0 && (
						<Tips
							amounts={{ ethereum: 2.003, dai: 32, additional: { WBTC: 0.5, WAP: 69 } }}
						/>
					)}
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
