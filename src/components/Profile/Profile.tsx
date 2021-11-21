import React, { useMemo } from "react";
import styles from "../Profile/Profile.module.css";
import { useEthers } from "@usedapp/core";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
//import editIcon from "../Profile/editIcon.png";
import ReactGa from "react-ga";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../../App";
import { useTCPDataCall } from "../../hooks";
import { ethers } from "ethers";
import PostStub from "./PostStub/PostStub";
import {
	trackWindowScroll,
	ScrollPosition,
} from "react-lazy-load-image-component";
import { resolveChainId } from "../../api/backend";

type ProfileT = {
	walletAddress: string;
	author: string;
	username: string;
	scrollPosition: ScrollPosition;
};

const Profile: React.FC<ProfileT> = ({
	walletAddress,
	author,
	username,
	scrollPosition,
}) => {
	const posts = useContext(PostsContext);

	const { deactivate, chainId } = useEthers();

	function logOutHandler() {
		deactivate();
		history.goBack();
		ReactGa.event({
			category: "User status",
			action: "Logging out",
		});
	}

	let history = useHistory();

	const [balanceRaw] = useTCPDataCall("getBalance", chainId || 3, [author]) || [
		0,
	];
	const balance = ethers.utils.formatEther(balanceRaw);

	const chain = useMemo(() => resolveChainId(chainId || 3), [chainId]);

	return (
		<div className={styles.container}>
			<div className={styles.profilePicture}>
				<ProfilePicture address={author} />
			</div>
			<div className={styles.usernameEditBox}>
				<div className={styles.username}>{username}</div>
				{/*<button className={styles.usernameEditButton}>
					<img src={editIcon} alt="edit" className={styles.editUsername} />
				</button>*/}
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
			<div className={styles.balance}>
				Your total earnings on {chain.name}:{" "}
				<b>
					{balance} {chain.currency}
				</b>
			</div>
			<div>
				{posts
					?.filter(
						(post) => post.author?.toLowerCase() === author.toLowerCase()
					)
					.filter((post) => post.chainid === chainId)
					.map((post, idx) => {
						return (
							<PostStub key={idx} post={post} scrollPosition={scrollPosition} />
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
