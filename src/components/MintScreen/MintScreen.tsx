import { useEthers } from "@usedapp/core";
import { useContext, useEffect } from "react";
import {
	ScrollPosition,
	trackWindowScroll,
} from "react-lazy-load-image-component";
import { useParams } from "react-router";
import { getURIToMint } from "../../api/backend";
import { PostsContext } from "../../App";
import { useKolorDataFunction } from "../../hooks";
import PostImage from "../PostImage/PostImage";
import styles from "./MintScreen.module.css";

interface MintScreenParams {
	uuid: string;
}

const MintScreen: React.FC<{ scrollPosition: ScrollPosition }> = ({
	scrollPosition,
}) => {
	const posts = useContext(PostsContext);

	const uuidToMint = useParams<MintScreenParams>().uuid;
	const desiredPost = posts?.find((p) => p.uuid === uuidToMint);

	const { chainId } = useEthers();
	const { state, send } = useKolorDataFunction(
		"createPost",
		chainId || 3,
		"mintPost"
	);

	useEffect(() => {
		if (state.status === "Mining") {
			console.dir(state);
		}

		if (state.status === "Exception" || state.status === "Fail") {
			// TODO: redirect to a special screen
		}
	}, [state]);

	// TODO: display an error message here
	if (!desiredPost) return null;

	// TODO: add explanations of steps & add actual steps
	// TODO: disallow minting if you're not the author (dynamically)

	return (
		<>
			<div className={styles.loginStepsContainer}>
				<div className={[styles.loginStep, styles.activeLoginStep].join(" ")}>
					<div className={styles.loginStepNumber}>1</div>
					<p className={styles.loginStepInfo}>Review</p>
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
						Mint
					</p>
				</div>
				<div className={styles.loginStep}>
					<div
						className={[
							styles.loginStepNumber,
							styles.loginStepNumberInactive,
						].join(" ")}
					>
						3
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
				<PostImage
					post={desiredPost}
					hideAction={true}
					scrollPosition={scrollPosition}
				/>
				<button onClick={() => send(getURIToMint(uuidToMint))}>Mint</button>
			</div>
		</>
	);
};

export default trackWindowScroll(MintScreen);
