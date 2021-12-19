import { Link } from "react-router-dom";
import { resolveNickname } from "../../../api/nickname";
import { CommentT } from "../../../types";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import styles from "../Comments/Comment.module.css";

const Comment: React.FC<{ data: CommentT }> = ({ data }) => {
	return (
		<div style={{margin: ".7rem auto"}}>
			<div className={styles.creator}>
				<div className={styles.creatorInfo}>
					<Link to={`/user/${data.a}`} className={styles.profContainer}>
						<ProfilePicture
							address={data.a}
							className={styles.profPicture}
							height="1.2rem"
						/>
					</Link>

					<div className={styles.userInfoContainer}>
						<Link to={`/user/${data.a}`} className={styles.creatorNick}>
							{resolveNickname(data.a)}
						</Link>
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
