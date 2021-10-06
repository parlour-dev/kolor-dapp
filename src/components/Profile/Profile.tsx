import React, { useState } from "react";
import styles from "../Profile/Profile.module.css";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import editIcon from "../Profile/editIcon.png";
import Popup from "reactjs-popup";

type ProfileT = {
	walletAddress: string;
	author: string;
	username: string;
};

const Profile: React.FC<ProfileT> = ({ walletAddress, author }) => {
	const { deactivate } = useEthers();

	const [username, setUsername] = useState(author.substr(0, 8));

	return (
		<>
			<div className={styles.container}>
				<div className={styles.profilePicture}>
					<ProfilePicture address={author} />
				</div>
				<div className={styles.usernameEditBox}>
					<div className={styles.username}>{username}</div>
					<Popup
						trigger={
							<button className={styles.usernameEditButton}>
								<img
									src={editIcon}
									alt="edit"
									className={styles.editUsername}
								/>
							</button>
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
					</Popup>
				</div>
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
