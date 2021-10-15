import Navbar from "../src/components/Navbar/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateNewPost from "../src/components/CreateNewPost/CreateNewPost";
import Profile from "./components/Profile/Profile";
import { useEthers, useContractCall } from "@usedapp/core";
import { Post } from "./types";
import { rawPostToPost, tcpdata_abi, tcpdata_address } from "./api/tcpdata";
import { ethers } from "ethers";
import ReactGa from "react-ga";
import { AlertColor, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import AlertSnackbar from "./components/AlertSnackbar";

type ShowAlertT = (text: string, severity: AlertColor) => void;

export const PostsContext = React.createContext<Post[]>([]);
export const NotificationsContext = React.createContext<any[]>([]);
export const UniversalAlertContext = React.createContext<ShowAlertT>(
	(text: string, severity: AlertColor) => {}
);

function App() {
	useEffect(() => {
		ReactGa.initialize("UA-208668639-1");
		//reporting page view
		ReactGa.pageview(window.location.pathname);
	}, []);

	const { account } = useEthers();

	const [alertSeverity, setAlertSeveirty] = useState<AlertColor>("info");
	const [alertText, setAlertText] = useState("");
	const [alertOpen, setAlertOpen] = useState(false);

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

	const showAlert: ShowAlertT = (text, severity) => {
		setAlertSeveirty(severity);
		setAlertText(text);
		setAlertOpen(true);
	};

	const handleAlertClose = (reason: SnackbarCloseReason) => {
		setAlertOpen(false);
	};

	return (
		<Router>
			<UniversalAlertContext.Provider value={showAlert}>
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

				{alertOpen && (
					<AlertSnackbar
						severity={alertSeverity}
						value={alertText}
						open={alertOpen}
						handleClose={handleAlertClose}
					/>
				)}
			</UniversalAlertContext.Provider>
		</Router>
	);
}

export default App;
