import PostImage from "./PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../App";
import {
	trackWindowScroll,
	ScrollPosition,
} from "react-lazy-load-image-component";

const MainPage: React.FC<{ scrollPosition: ScrollPosition }> = ({
	scrollPosition,
}) => {
	const posts = useContext(PostsContext);

	return (
		<>
			{posts?.map((post, idx) => (
				<PostImage
					key={idx}
					scrollPosition={scrollPosition}
					post={post}
				></PostImage>
			))}
		</>
	);
};

export default trackWindowScroll(MainPage);
