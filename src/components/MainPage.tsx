import PostImage from "./PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../App";

const MainPage = () => {
	const posts = useContext(PostsContext);

	return (
		<>
			{posts?.map((post, idx) => (
				<PostImage
					key={idx}
					text={post.text}
					author={post.author!}
					img={post.file!}
					idx={post.id}
				>
				</PostImage>
			))}
		</>
	);
};

export default MainPage;
