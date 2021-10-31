import PostImage from "../PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../../App";
import {
	trackWindowScroll,
	ScrollPosition,
} from "react-lazy-load-image-component";
import { resolveNickname } from "../../api/nickname";
import { useParams } from "react-router";

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
				<p style={{ color: "white", fontSize: "1.3em" }}>The feed of {nick}!</p>
			)}

			{userPosts?.map((post, idx) => (
				<PostImage
					key={idx}
					scrollPosition={scrollPosition}
					post={post}
				></PostImage>
			))}

			{userPosts.length === 0 && (
				<p style={{ color: "white", fontSize: "1.3em" }}>
					{nick} is on the platform but hasn't posted yet...
				</p>
			)}
		</div>
	);
};

export default trackWindowScroll(UserFeed);
