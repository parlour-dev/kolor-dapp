import PostImage from "../PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../../App";
import {
	trackWindowScroll,
	ScrollPosition,
} from "react-lazy-load-image-component";
import { resolveNickname } from "../../api/nickname";
import { useParams } from "react-router";
import styles from "./UserFeed.module.css";
import { Link } from "react-router-dom";

interface UserFeedParams {
	address: string;
}

const UserFeed: React.FC<{ scrollPosition: ScrollPosition }> = ({
	scrollPosition,
}) => {
	const posts = useContext(PostsContext);

	const desiredAuthor = useParams<UserFeedParams>().address;
	const nick = resolveNickname(desiredAuthor);

	const userPosts = posts?.filter((p) => p.author === desiredAuthor) || [];

	return (
		<div>
			{userPosts.length !== 0 && (
				<p className={styles.title}>The feed of {nick}!</p>
			)}

			{userPosts?.map((post, idx) => (
				<PostImage
					key={idx}
					scrollPosition={scrollPosition}
					post={post}
				></PostImage>
			))}

			{userPosts.length === 0 && (
				<>
					<p className={styles.title}>
						{nick} is on the platform but hasn't posted yet...
					</p>
					<Link to="/">
						<div className={styles.button}>Go back</div>
					</Link>
				</>
			)}
		</div>
	);
};

export default trackWindowScroll(UserFeed);
