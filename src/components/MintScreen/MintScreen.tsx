import { useEthers } from "@usedapp/core";
import { useContext, useEffect, useState } from "react";
import {
	ScrollPosition,
	trackWindowScroll,
} from "react-lazy-load-image-component";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getURIToMint } from "../../api/backend";
import { PostsContext } from "../../App";
import { useKolorDataFunction } from "../../hooks";
import PostImage from "../PostImage/PostImage";
import styles from "./MintScreen.module.css";

interface MintScreenParams {
	uuid: string;
}

type MintingStage = "mint" | "allDone";

const MintScreen: React.FC<{ scrollPosition: ScrollPosition }> = ({
	scrollPosition,
}) => {
	const [mintingStage, setMintingStage] = useState<MintingStage>("mint");

	const posts = useContext(PostsContext);

	const uuidToMint = useParams<MintScreenParams>().uuid;
	const desiredPost = posts?.find((p) => p.uuid === uuidToMint);

	const { account, chainId } = useEthers();
	const { state, send } = useKolorDataFunction(
		"createPost",
		chainId || 56,
		"mintPost"
	);

	useEffect(() => {
		if (state.status === "Mining") {
			console.dir(state);
			setMintingStage("allDone");
		}

		if (state.status === "Exception" || state.status === "Fail") {
			// TODO: redirect to a special screen
		}
	}, [state]);

	// TODO: display an error message here
	if (!desiredPost) {
		return (
			<>
				<div className={styles.actionContainer}>
					<div className={styles.mintInfo}>
						<b style={{ fontSize: "1.5rem" }}>This post does not exist.</b>
						<br />
						<br />
						We cannot find this post.
					</div>
				</div>
			</>
		);
	}

	if (desiredPost.chainid !== 0) {
		return (
			<>
				<div className={styles.actionContainer}>
					<div className={styles.mintInfo}>
						<b style={{ fontSize: "1.5rem" }}>
							This post has already been minted.
						</b>
						<br />
						<br />
						This post is already present on the Ropsten blockchain.
					</div>
				</div>
			</>
		);
	}

	if (desiredPost.author !== account) {
		return (
			<>
				<div className={styles.actionContainer}>
					<div className={styles.mintInfo}>
						<b style={{ fontSize: "1.5rem" }}>You are not the author.</b>
						<br />
						<br />
						This post has a different author. You cannot mint it.
					</div>
				</div>
			</>
		);
	}

	// TODO: add explanations of steps & add actual steps
	// TODO: disallow minting if you're not the author (dynamically)

	return (
		<>
			{mintingStage === "mint" && (
				<div>
					<div className={styles.loginStepsContainer}>
						<div
							className={[styles.loginStep, styles.activeLoginStep].join(" ")}
						>
							<div className={styles.loginStepNumber}>1</div>
							<p className={styles.loginStepInfo}>Mint</p>
						</div>
						<div className={styles.loginStep}>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								2
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								All done
							</p>
						</div>
					</div>
					<div className={styles.actionContainer}>
						<div className={styles.mintInfo}>
							<b style={{ fontSize: "1.5rem" }}>
								You are minting this post as NFT.
							</b>
							<br />
							<br />
							Your post will be permanently stored on the blockchain. The NFT
							will then be transferred to your wallet. The Ethereum network
							requires that you pay a network fee for doing this. We don't
							control or benefit from this fee. It may vary depending on network
							congestion.
						</div>
						<PostImage
							post={desiredPost}
							hideAction={true}
							scrollPosition={scrollPosition}
						/>
						<button
							className={styles.button}
							onClick={() => send(getURIToMint(uuidToMint))}
						>
							Mint
						</button>
					</div>
				</div>
			)}
			{mintingStage === "allDone" && (
				<div>
					<div className={styles.loginStepsContainer}>
						<div
							className={[styles.loginStep, styles.completedLoginStep].join(
								" "
							)}
						>
							<div
								className={[
									styles.loginStepNumber,
									styles.loginStepNumberInactive,
								].join(" ")}
							>
								1
							</div>
							<p
								className={[
									styles.loginStepInfo,
									styles.loginStepInfoInactive,
								].join(" ")}
							>
								Mint
							</p>
						</div>
						<div
							className={[styles.loginStep, styles.activeLoginStep].join(" ")}
						>
							<div className={styles.loginStepNumber}>2</div>
							<p className={styles.loginStepInfo}>All done</p>
						</div>
					</div>
					<div className={styles.actionContainer}>
						<div className={styles.allDoneText}>
							<b>All done</b>
							<p>Your NFT will be minted in just a couple of seconds.</p>
							<br />
							<a
								href={`https://ropsten.etherscan.io/address/${account}`}
								target="_blank"
								rel="noreferrer"
								className={styles.button}
							>
								View your wallet
							</a>
							<br />
							<br />
							<br />
							<Link to="/" className={styles.button}>
								Go back
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default trackWindowScroll(MintScreen);
