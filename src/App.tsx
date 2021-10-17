import Navbar from "../src/components/Navbar/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import { useEthers } from "@usedapp/core";
import { Post } from "./types";
import { rawPostToPost } from "./api/tcpdata";
import ReactGa from "react-ga";
import UniversalAlertProvider from "./components/UniversalAlert/UniversalAlertProvider";
import { useTCPDataCall } from "./hooks";

export const PostsContext = React.createContext<Post[]>([]);
export const NotificationsContext = React.createContext<any[]>([]);

function App() {
	useEffect(() => {
		ReactGa.initialize("UA-208668639-1");
		//reporting page view
		ReactGa.pageview(window.location.pathname);
	}, []);

	const { account } = useEthers();

	const [postsRaw] = useTCPDataCall("getContent") || [];

	const posts = postsRaw
		?.map((el: string[], idx: number) => rawPostToPost(idx, el[0], el[1]))
		.reverse();

	return (
		<Router>
			<UniversalAlertProvider>
				<PostsContext.Provider value={posts}>
					<div className="App">
						<Navbar />
						<div className="Separator" style={{ height: "7.5vmax" }}></div>
						<Switch>
							<Route exact path="/">
								<MainPage />
							</Route>
							<Route exact path="/create">
								<CreateNewPost />
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
				</PostsContext.Provider>
			</UniversalAlertProvider>
		</Router>
	);
}

export default App;
