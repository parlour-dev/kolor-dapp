import { useState } from "react";
import { CommentT } from "../../../types";
import Comment from "./Comment";
import styles from "./Comments.module.css";

const Comments: React.FC<{ commentData: CommentT[] }> = ({ commentData }) => {
	const [hideExcess, setHideExcess] = useState(true);
	const maxComments = 2;

	if (hideExcess && commentData.length > maxComments) {
		return (
			<div className={styles.container}>
				{commentData.slice(0, maxComments).map((comment, idx) => (
					<Comment key={idx} data={comment} />
				))}
				<button
					className={styles.showHideButton}
					onClick={() => setHideExcess(false)}
				>
					Show {commentData.length - maxComments} more comments
				</button>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{commentData.map((comment, idx) => (
				<Comment key={idx} data={comment} />
			))}
			{commentData.length > maxComments && (
				<button
					className={styles.showHideButton}
					onClick={() => setHideExcess(true)}
				>
					Hide excess
				</button>
			)}
		</div>
	);
};

export default Comments;
