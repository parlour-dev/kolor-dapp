import PostImage from "./PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../App";

const MainPage = () => {
	const posts = useContext(PostsContext);

	return (
		<>
			{posts?.map((post, idx) => (
				<PostImage key={idx} post={post}></PostImage>
			))}
		</>
	);
};

export default MainPage;
