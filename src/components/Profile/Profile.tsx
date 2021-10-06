import React from "react";
import styles from "../Profile/Profile.module.css";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import editIcon from "../Profile/editIcon.png";
import Popup from "reactjs-popup";

type ProfileT = {
	username: string;
	walletAddress: string;
	author: string;
};

const Profile: React.FC<ProfileT> = ({ username, walletAddress, author }) => {
	const { deactivate } = useEthers();

	const ChangeUsername = () => {
		alert("helo");
	};

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
							<button
								onClick={ChangeUsername}
								className={styles.usernameEditButton}
							>
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
							/>
							<div className={styles.popupTip}>Change</div>
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
