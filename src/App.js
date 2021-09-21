import Navbar from "../src/components/Navbar/Navbar";

import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import { useEthers } from "@usedapp/core";
import tcpdataABI from "./abi.json";
import { ethers } from "ethers";

export const PostsContext = React.createContext();
export const TCPDataContext = React.createContext();

function postsReducer(state, action) {
	switch (action.type) {
		case "add": {
			const { value } = action;
			return [value, ...state];
		}
		case "update": {
			const { value, idx } = action;
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
	const [posts, dispatch] = useReducer(postsReducer, []);
	const { account, library } = useEthers();
	const [tcpdata, setTcpdata] = useState();

	async function newPostHandler(newPostRaw) {
		if (!tcpdata) {
			console.error("Can't post: no TCPData");
			return false
		}
		// {"title": "The First Text Post", "tags": ["text", "first", "small"], "url": "https://ipfs.io/ipfs/QmNrgEMcUygbKzZeZgYFosdd27VE9KnWbyUD73bKZJ3bGi"}
		
		const newPost = { title: newPostRaw.text, url: newPostRaw.file, tags: ["testtag"] }
		const newPostString = JSON.stringify(newPost)
		
		const result = tcpdata.addContent(newPostString)
		result.catch(e => console.error)
	}

	const tcpdata_address = "0xa398De2fEF0b37cf50c2F9D88b8953b94b49c78C";

	useEffect(() => {
		if (!library) {
			// if an account is not connected, remove all posts and bail out
			dispatch({ type: "clear" });
			return undefined;
		}

		const fetchTCPData = async () => {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum
			);
			// refresh whenever a user changes the network
			provider.on("network", (newNetwork, oldNetwork) => {
				if(oldNetwork) window.location.reload()
			})
			const signer = provider.getSigner();

			const tcpdata = new ethers.Contract(tcpdata_address, tcpdataABI, signer);

			tcpdata.on("ContentAdded", async idx => {
				const content = await tcpdata.content(idx);
				const author = content.author
				const header = JSON.parse(content.header);
				const newPost = { id: idx, text: header.title, author: author };
				dispatch({ type: "add", value: newPost });
			})

			// set the contract object
			setTcpdata(tcpdata);

			// add all the fetched posts
			const contents = await tcpdata.getContent();

			if (contents) {
				for (let idx in contents) {
					const author = contents[idx].author;
					const header = JSON.parse(contents[idx].header);
					const newPost = { id: idx, text: header.title, author: author };
					dispatch({ type: "add", value: newPost });
				}
			} else {
				// if we didn't get anything, remove the saved posts
				dispatch({ type: "clear" });
			}
		};

		fetchTCPData().catch((e) => {
			console.error(e);
			dispatch({ type: "clear" });
		});
	}, [library]);

	return (
		<Router>
			<TCPDataContext.Provider value={tcpdata}>
				<div className="App">
					<Navbar />

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
								<Profile username="bigBoyMIKE" walletAddress={account} />
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
