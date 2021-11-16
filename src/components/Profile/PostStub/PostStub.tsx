import { BigNumber, ethers } from "ethers";
import {
	useShowAlert,
	useShowLoading,
	useTCPDataCall,
	useTCPDataFunction,
} from "../../../hooks";
import { Post } from "../../../types";
import styles from "./PostStub.module.css";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import Chain from "../../PostImage/Chain/Chain";
import { useEthers } from "@usedapp/core";

const PostStub: React.FC<{ post: Post; scrollPosition: ScrollPosition }> = ({
	post,
	scrollPosition,
}) => {
	const {chainId} = useEthers()

	const { send, state } = useTCPDataFunction("removeContent", chainId || 3, "Remove post");

	const showLoading = useShowLoading();
	const showAlert = useShowAlert();

	const time = (useTCPDataCall("getContentTimestamp", chainId ||3, [post.id]) || [
		ethers.constants.Zero,
	])[0] as BigNumber;
	const postMillis = time.toNumber() * 1000;

	// 3 days - ( the difference between now and the date the post was created )
	let timeLeft =
		3 * 24 * 60 * 60 - Math.floor((+new Date() - postMillis) / 1000);
	const [days, hours, minutes] = formatTimeLeft(timeLeft);

	async function handleDeletePost() {
		showLoading(true);
		await send(post.id);

		if (state.status === "Exception") {
			showAlert("There was a problem while processing your request.", "error");
		} else if (state.status === "Mining") {
			showAlert(
				"The deletion request has been sent. You will need to wait a minute until the transaction is mined on the blockchain.",
				"info"
			);
		} else if (state.status === "Success") {
			showAlert("Your post has been deleted.", "info");
		}

		showLoading(false);
	}

	return (
		<div className={styles.post}>
			<div className={styles.container}>
				<div className={styles.text}>{post.text}</div>
				<div className={styles.mediaContent}>
					{post.file && post.file.startsWith("p.deso") && (
						<LazyLoadImage
							alt=""
							effect="blur"
							src={"https://" + post.file}
							className={styles.mediaContent}
							scrollPosition={scrollPosition}
						/>
					)}
				</div>
				<div className={styles.bottomPostContainer}>
					{timeLeft > 0 && !post.removed && (
						<>
							<button onClick={handleDeletePost}>Remove post</button>
							<div className={styles.timeAdded}>
								Time left to remove: {days} {days === 1 ? "day" : "days"}{" "}
								{hours} {hours === 1 ? "hour" : "hours"} {minutes}{" "}
								{minutes === 1 ? "minute" : "minutes"}
							</div>
						</>
					)}
					{timeLeft <= 0 && !post.removed && (
						<div className={styles.timeAdded}>
							It's too late for this post to be removed.
						</div>
					)}
					{post.removed && (
						<div className={styles.timeAdded}>
							This post has already been removed.
						</div>
					)}
					<Chain blockchain={post.chainid} />
				</div>
			</div>
		</div>
	);
};

export default PostStub;

function formatTimeLeft(timeLeft: number) {
	let days = 0;
	let hours = 0;
	let minutes = 0;

	while (timeLeft >= 60 * 60 * 24) {
		timeLeft -= 60 * 60 * 24;
		days++;
	}

	while (timeLeft >= 60 * 60) {
		timeLeft -= 60 * 60;
		hours++;
	}

	while (timeLeft >= 60) {
		timeLeft -= 60;
		minutes++;
	}

	return [days, hours, minutes];
}
