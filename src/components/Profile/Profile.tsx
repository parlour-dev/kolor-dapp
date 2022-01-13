import React, { useEffect, useRef, useState } from "react";
import styles from "../Profile/Profile.module.css";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import editIcon from "../Profile/editIcon.png";
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../../App";
import PostStub from "./PostStub/PostStub";
import {
	trackWindowScroll,
	ScrollPosition,
} from "react-lazy-load-image-component";
import { TextField } from "@mui/material";
import { useShowAlert, useShowLoading } from "../../hooks";
import { backendURI, changeUsernameBackend, getUsernameBackend } from "../../api/backend";
import { useUsername } from "../../api/username";

type ProfileT = {
	walletAddress: string;
	author: string;
	scrollPosition: ScrollPosition;
};

const Profile: React.FC<ProfileT> = ({
	walletAddress,
	author,
	scrollPosition,
}) => {
	const posts = useContext(PostsContext);

	const { deactivate, library, account } = useEthers();
	const defaultUsername = useUsername(account)
	const [currentUsername, setCurrentUsername] = useState(defaultUsername);

	useEffect(() => {
		(async () => {
			const resp = await getUsernameBackend(account || "")
			if (resp.ok) {
				setCurrentUsername(await resp.text());
			}
		})()
	}, [setCurrentUsername, account]);

	const usernameField = useRef<HTMLDivElement>(null);

	const showAlert = useShowAlert();
	const showLoading = useShowLoading();

	function logOutHandler() {
		deactivate();
		history.goBack();
		ReactGa.event({
			category: "User status",
			action: "Logging out",
		});
	}

	let history = useHistory();

	async function usernameChangeHandler() {
		if (currentUsername === defaultUsername) {
			document.getElementById("inputHack")?.focus();
			return;
		}

		if (!library) {
			showAlert("You are not logged in.", "error");
			return;
		}

		if (!currentUsername) {
			showAlert("The username can't be empty!", "error");
			return;
		}

		if (currentUsername.length < 4) {
			showAlert("The username can't be shorter than 4 characters.", "error");
			return;
		}

		if (currentUsername.length > 17) {
			showAlert("The username can't be longer than 17 characters.", "error");
			return;
		}

		showLoading(true);

		try {
			const toSign = "New Kolor username: " + currentUsername;
			const response = await changeUsernameBackend(
				currentUsername,
				await library!.getSigner().signMessage(toSign)
			);

			if (!response.ok) {
				showAlert(await response.text(), "error");
			} else {
				showAlert("Username changed!", "info");
				// force the browser to update its cache
				fetch(`${backendURI}/username/${account}`, { cache: "reload" });
			}
		} catch (e) {
			showAlert("There was an error.", "error");
		}

		showLoading(false);
	}

	return (
		<div className={styles.container}>
			<div className={styles.profilePicture}>
				<ProfilePicture address={author} height="8rem" />
			</div>
			<div className={styles.usernameEditBox}>
				<TextField
					ref={usernameField}
					variant="standard"
					value={currentUsername}
					onChange={(e) => setCurrentUsername(e.target.value)}
					InputProps={{ className: styles.username, id: "inputHack" }}
					sx={{ width: "16.5rem" }}
				/>
				<button
					className={styles.usernameEditButton}
					onClick={usernameChangeHandler}
				>
					<img src={editIcon} alt="edit" />
				</button>
				{/*<Popup
					trigger={
						
					}
					modal
				>
					<div className={styles.popup}>
						<input
							type="text"
							className={styles.popupInput}
							placeholder="Your beautiful name"
							maxLength={32}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<button className={styles.popupTip}>OK</button>
					</div>
				</Popup>*/}
			</div>
			<div className={styles.walletAddress}>{walletAddress}</div>
			<div>
				{posts
					?.filter(
						(post) => post.author?.toLowerCase() === author.toLowerCase()
					)
					.map((post, idx) => {
						return (
							<PostStub
								key={idx}
								post={post}
								className={styles.postStub}
								scrollPosition={scrollPosition}
							/>
						);
					})}
			</div>
			<div>
				<button
					className={[styles.logOutButton, styles.animation].join(" ")}
					onClick={logOutHandler}
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default trackWindowScroll(Profile);
