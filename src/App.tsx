import Navbar from "../src/components/Navbar/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import { useEthers } from "@usedapp/core";
import { TCPData } from "./TCPData";
import { Post, PostAction, ContractPost, PostContextT } from "./types";
import { fetchContent, getTCPData } from "./api/tcpdata";
import { ethers } from "ethers";
import ReactGa from "react-ga";
export const PostsContext = React.createContext<PostContextT | undefined>(
	undefined
);
export const TCPDataContext = React.createContext<TCPData | undefined>(
	undefined
);

function postsReducer(state: Post[], action: PostAction): Post[] {
	switch (action.type) {
		case "add": {
			const { value } = action;
			return [value, ...state];
		}
		case "update": {
			const { value, idx } = action;

			// bail if idx is null or undefined
			if (!idx) return state;

			state[idx] = value;
			return state;
		}
		case "clear": {
			return [];
		}
		default: {
			return state;
		}
	}
}

function App() {
	useEffect(() => {
		ReactGa.initialize("UA-208668639-1");

		//reporting page view
		ReactGa.pageview("/");
	}, []);

	const [posts, dispatch] = useReducer(postsReducer, []);
	const { account, library } = useEthers();
	const [tcpdata, setTcpdata] = useState<TCPData>();

	async function newPostHandler(newPostRaw: Post) {
		if (!tcpdata) {
			console.error("Can't post: no TCPData");
			return false;
		}

		const newPost: ContractPost = {
			title: newPostRaw.text,
			url: newPostRaw.file,
			tags: ["testtag"],
		};
		const newPostString = JSON.stringify(newPost);

		const result = tcpdata.addContent(newPostString);
		result.catch(console.error);
	}

	useEffect(() => {
		if (!library) {
			// if an account is not connected, remove all posts and bail out
			dispatch({ type: "clear" });
			return undefined;
		}

		const fetchTCPData = async () => {
			const tcpdata = getTCPData();
			if (!tcpdata) return undefined;

			// asynchronously add new posts
			tcpdata.on("ContentAdded", async (idx_raw: ethers.BigNumber) => {
				const idx = idx_raw.toNumber();

				// avoid creating duplicate posts
				if (posts.find((el) => el.id === idx)) return undefined;

				const content = await tcpdata.content(idx);
				const author = content.author;
				const header = JSON.parse(content.header);
				const newPost: Post = {
					id: idx,
					text: header.title,
					author: author,
					file: header.url || undefined,
				};
				dispatch({ type: "add", value: newPost });
			});

			// set the contract object
			setTcpdata(tcpdata);

			// add all the fetched posts
			const fetchSuccess = await fetchContent(tcpdata, (post) => {
				dispatch({ type: "add", value: post });
			});

			// if we didn't get anything, remove the saved posts
			if (!fetchSuccess) {
				dispatch({ type: "clear" });
			}
		};

		fetchTCPData().catch((e) => {
			console.error(e);
			dispatch({ type: "clear" });
		});
		// posts are missing from the dependency array on purpose
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [library]);

	return (
		<Router>
			<TCPDataContext.Provider value={tcpdata}>
				<div className="App">
					<Navbar />
					<div className="Separator" style={{ height: "7.5vmax" }}></div>
					{account && (
						<Switch>
							<Route exact path="/">
								<PostsContext.Provider value={{ posts, dispatch }}>
									<MainPage />
								</PostsContext.Provider>
							</Route>
							<Route exact path="/create">
								<CreateNewPost onSubmit={newPostHandler} />
							</Route>
							<Route exact path="/profile">
								<Profile
									username="helko"
									walletAddress={account}
									author={account}
								/>
							</Route>
						</Switch>
					)}
					{!account && <p style={{ color: "white" }}>Please log in</p>}
				</div>
			</TCPDataContext.Provider>
		</Router>
	);
}

export default App;
