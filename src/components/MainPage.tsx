import PostImage from "./PostImage/PostImage";
import { useContext } from "react";
import { PostsContext } from "../App";
import Journey from "./Navigation/Journey/Journey";
import {
	trackWindowScroll,
	ScrollPosition,
} from "react-lazy-load-image-component";
import styles from "./MainPage.module.css";

const MainPage: React.FC<{ scrollPosition: ScrollPosition }> = ({
	scrollPosition,
}) => {
	const posts = useContext(PostsContext);

	return (
		<div className={styles.mainPage}>
			<Journey />
			{posts?.map((post, idx) => (
				<PostImage
					key={idx}
					scrollPosition={scrollPosition}
					post={post}
				></PostImage>
			))}
		</div>
	);
};

export default trackWindowScroll(MainPage);
