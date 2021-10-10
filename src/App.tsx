import Navbar from "../src/components/Navbar/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import { useEthers } from "@usedapp/core";
import { TCPData } from "./TCPData";
import { PostContextT } from "./types";
import { fetchAllPosts, fetchOnePost, getTCPData } from "./api/tcpdata";
import { ethers } from "ethers";
import ReactGa from "react-ga";
import { usePosts } from "./hooks";
import { addNewPostToContract } from "./api/newPost";

export const PostsContext = React.createContext<PostContextT | undefined>(
	undefined
);
export const TCPDataContext = React.createContext<TCPData | undefined>(
	undefined
);

function App() {
	useEffect(() => {
		ReactGa.initialize("UA-208668639-1");
		//reporting page view
		ReactGa.pageview(window.location.pathname);
	}, []);

	const [posts, dispatch] = usePosts();
	const { account, library } = useEthers();
	const [tcpdata, setTcpdata] = useState<TCPData>();

	useEffect(() => {
		if (!library) {
			// there isn't a provider, remove all posts and bail out
			dispatch({ type: "clear" });
			return undefined;
		}

		const fetchTCPData = async () => {
			const tcpdata = getTCPData(library);
			if (!tcpdata) return undefined;

			// whenever a post is added, asynchronously add it to the list
			tcpdata.on("ContentAdded", async (idx_raw: ethers.BigNumber) => {
				const idx = idx_raw.toNumber();
				if (posts.find((el) => el.id === idx)) return undefined; // avoid creating duplicate posts

				const newPost = await fetchOnePost(tcpdata, idx);
				dispatch({ type: "add", value: newPost });
			});

			// set the contract object
			setTcpdata(tcpdata);

			// add all the fetched posts
			const fetchSuccess = await fetchAllPosts(tcpdata, (post) => {
				dispatch({ type: "add", value: post });
			});

			// if we didn't get anything, throw
			if (!fetchSuccess) throw Error("Couldn't fetch posts");
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
					<Switch>
						<Route exact path="/">
							<PostsContext.Provider value={{ posts, dispatch }}>
								<MainPage />
							</PostsContext.Provider>
						</Route>
						<Route exact path="/create">
							<CreateNewPost
								onSubmit={(newPostRaw) =>
									addNewPostToContract(tcpdata!, newPostRaw)
								}
							/>
						</Route>
						{account && (
							<Route exact path="/profile">
								<Profile
									username="helko"
									walletAddress={account}
									author={account}
								/>
							</Route>
						)}
					</Switch>
				</div>
			</TCPDataContext.Provider>
		</Router>
	);
}

export default App;
