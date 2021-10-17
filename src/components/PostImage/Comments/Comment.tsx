import { resolveNickname } from "../../../api/nickname";
import { CommentT } from "../../../types";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import styles from "../Comments/Comment.module.css";

const Comment: React.FC<{ data: CommentT }> = ({ data }) => {
	return (
		<div>
			<div className={styles.creator}>
				<div className={styles.creatorInfo}>
					<ProfilePicture address={data.a} className={styles.profPicture} />

					<div className={styles.userInfoContainer}>
						<div className={styles.creatorNick}>{resolveNickname(data.a)}</div>
						<div className={styles.creatorWallet}>{data.a}</div>
					</div>
				</div>
			</div>
			<div className={styles.textContainer}>
				<div className={styles.text}>{data.c}</div>
			</div>
		</div>
	);
};

export default Comment;
