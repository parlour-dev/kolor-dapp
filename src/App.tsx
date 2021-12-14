// import Navbar from "../src/components/Navbar/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import FeedChoice from "./components/Feedchoice/Feedchoice";
import UserSide from "./components/UserSide/UserSide";
import Navbar from "./components/Navbar/Navbar";
import { useEthers } from "@usedapp/core";
import { Post } from "./types";
import ReactGa from "react-ga";
import UniversalAlertProvider from "./components/UniversalAlert/UniversalAlertProvider";
import { resolveNickname } from "./api/nickname";
import UserFeed from "./components/UserFeed/UserFeed";
import { fetchAllPostsBackend } from "./api/backend";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const PostsContext = React.createContext<Post[]>([]);
export const NotificationsContext = React.createContext<any[]>([]);

function App() {
	useEffect(() => {
		ReactGa.initialize("UA-208668639-1");
		//reporting page view
		ReactGa.pageview(window.location.pathname);
	}, []);

	const { account } = useEthers();

	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		(async () => {
			setPosts(await fetchAllPostsBackend());
		})();

		return undefined;
	}, []);

	return (
		<Router>
			<UniversalAlertProvider>
				<ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
					<PostsContext.Provider value={posts}>
						<div className="App">
							<FeedChoice></FeedChoice>
							<UserSide></UserSide>

							<Switch>
								<Route exact path="/">
									<MainPage />
								</Route>
								<Route exact path="/create">
									<CreateNewPost />
								</Route>
								<Route exact path="/user/:address">
									<UserFeed />
								</Route>
								{account && (
									<Route exact path="/profile">
										<Profile
											username={resolveNickname(account)}
											walletAddress={account}
											author={account}
										/>
									</Route>
								)}
							</Switch>
						</div>
					</PostsContext.Provider>
				</ThemeProvider>
			</UniversalAlertProvider>
		</Router>
	);
}

export default App;
