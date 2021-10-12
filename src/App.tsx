import Navbar from "../src/components/Navbar/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import { useEthers, useContractCall, useContractFunction } from "@usedapp/core";
import { ContractPost, Post } from "./types";
import { rawPostToPost, tcpdata_abi, tcpdata_address } from "./api/tcpdata";
import { Contract, ethers } from "ethers";
import ReactGa from "react-ga";

export const PostsContext = React.createContext<Post[]>([]);

function App() {
	useEffect(() => {
		ReactGa.initialize("UA-208668639-1");
		//reporting page view
		ReactGa.pageview(window.location.pathname);
	}, []);
	const { account } = useEthers();

	const [postsRaw] =
		useContractCall({
			abi: new ethers.utils.Interface(tcpdata_abi),
			address: tcpdata_address,
			method: "getContent",
			args: [],
		}) || [];

	const posts = postsRaw
		?.map((el: string[], idx: number) => rawPostToPost(idx, el[0], el[1]))
		.reverse();

	// FIXME move this to API
	const { state, send } = useContractFunction(
		// @ts-ignore
		new Contract(tcpdata_address, tcpdata_abi),
		"addContent",
		{ transactionName: "Add content" }
	);

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="Separator" style={{ height: "7.5vmax" }}></div>
				<Switch>
					<Route exact path="/">
						<PostsContext.Provider value={posts}>
							<MainPage />
						</PostsContext.Provider>
					</Route>
					<Route exact path="/create">
						<CreateNewPost
							onSubmit={(newPostRaw) => {
								//addNewPostToContract(tcpdata!, newPostRaw)
								const newPost: ContractPost = {
									title: newPostRaw.text,
									url: newPostRaw.file,
									tags: ["testtag"],
								};

								send(JSON.stringify(newPost));
							}}
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
		</Router>
	);
}

export default App;
