import PostImage from "./PostImage/PostImage";
import Comments from "./PostImage/Comments/Comments";
import { useContext, useReducer } from "react";
import { PostsContext } from "../App";
import { PostContextT } from "../types";

const MainPage = () => {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const { posts, dispatch } = useContext(PostsContext) as PostContextT;

	function newCommentHandler(commentText: string, idx: number) {
		const newComments = posts[idx].comments
			? [commentText, ...posts[idx].comments!]
			: [commentText];
		const newValue = { ...posts[idx], comments: newComments };

		dispatch({ type: "update", value: newValue, idx: idx });

		// FIXME: DONT DO THIS!!!
		forceUpdate();
	}

	return (
		<>
			{posts.map((post, idx) => (
				<PostImage
					key={idx}
					text={post.text}
					author={post.author!}
					img={post.file!}
					idx={post.id}
					onCommentSubmit={(text) => newCommentHandler(text, idx)}
				>
					{post.comments &&
						post.comments.map((text, idx) => (
							<Comments key={idx} text={text} />
						))}
				</PostImage>
			))}
		</>
	);
};

export default MainPage;
