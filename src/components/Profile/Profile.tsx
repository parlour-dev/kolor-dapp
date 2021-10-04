import React from "react";
import styles from "../Profile/Profile.module.css";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

type ProfileT = {
	username: string;
	walletAddress: string;
	author: string;
};

const Profile: React.FC<ProfileT> = ({ username, walletAddress, author }) => {
	const { deactivate } = useEthers();

	return (
		<>
			<div className={styles.container}>
				<div className={styles.profilePicture}>
			<ProfilePicture address={author}/>
			</div>
				<div className={styles.username}>{username}</div>
				<div className={styles.walletAddress}>{walletAddress}</div>
				<button
					className={[styles.logOutButton, styles.animation].join(" ")}
					onClick={() => deactivate()}
				>
					Log Out
				</button>
			</div>
		</>
	);
};

export default Profile;
