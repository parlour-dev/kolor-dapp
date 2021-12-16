import PostImage from "./PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../App";
import Journey from "./Navigation/Journey/Journey";
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
			<Journey />
			<div className="Separator" style={{ height: "3.5vmax" }}></div>
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
