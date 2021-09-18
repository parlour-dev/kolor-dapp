import Navbar from "../src/components/Navbar/Navbar";
import PostImage from "../src/components/PostImage/PostImage";
import PostText from "../src/components/PostText/PostText";
import Comments from "../src/components/PostImage/Comments/Comments";

import "./App.css";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";

function postsReducer(state, action) {
	switch (action.type) {
		case "add": {
			const { value } = action;
			return [value, ...state];
		}
		case "update": {
			const { value, idx } = action;
			state[idx] = value;

			console.log("update");
			console.log(value);
			return state;
		}
		default: {
			return state;
		}
	}
}

function App() {
	const [posts, dispatch] = useReducer(postsReducer, []);

	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	function newPostHandler(newPost) {
		dispatch({ type: "add", value: newPost });
	}

	function newCommentHandler(commentText, idx) {
		const newComments = posts[idx].comments
			? [commentText, ...posts[idx].comments]
			: [commentText];
		const newValue = { ...posts[idx], comments: newComments };
		const dispatchAction = { type: "update", value: newValue, idx: idx };

		dispatch(dispatchAction);

		// FIXME: DONT DO THIS!!!
		forceUpdate();
	}

	return (
		<Router>
			<div className="App">
				<Navbar />

				<Switch>
					<Route exact path="/">
						{posts.map((post, idx) => (
							<PostImage
								key={idx}
								text={post.text}
								img={post.file}
								onCommentSubmit={(text) => newCommentHandler(text, idx)}
							>
								{post.comments &&
									post.comments.map((text, idx) => (
										<Comments key={idx} text={text} />
									))}
							</PostImage>
						))}
					</Route>
					<Route exact path="/create">
						<CreateNewPost onSubmit={newPostHandler} />
					</Route>
					<Route exact path="/profile">
						<Profile
							username="bigBoyMIKE"
							walletAddress="0x91AEEDE11Cb99a060696B9936B5512b51646329f"
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
