import styles from "./UserSide.module.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { useMemo } from "react";
import { resolveChainId } from "../../../api/backend";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
//import { useTCPDataCall } from "../../../hooks";

const UserSide = () => {
	const history = useHistory();

	const { account, chainId } = useEthers();
	const chain = useMemo(() => resolveChainId(chainId || 3), [chainId]);

	//const version = useTCPDataCall("version", chainId || 3);
	const version = 6;

	return (
		<div className={styles.container}>
			{chainId && (
				<div className={styles.chainDisplayBox}>
					<div
						className={styles.chainDot}
						style={{ backgroundColor: chain.color }}
					></div>
					<p className={styles.chainName}>
						{chain.name} v{version?.toString() || "?"}
					</p>
				</div>
			)}

			{!account && (
				<Link to="/login">
					<button className={[styles.loginButton, styles.animation].join(" ")}>
						Log In
					</button>
				</Link>
			)}
			{account && (
				<div
					className={styles.profilePictureButton}
					onClick={() => history.push("/profile")}
				>
					{account && (
						<ProfilePicture
							className={styles.animation}
							address={account}
							height="3rem"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default UserSide;
