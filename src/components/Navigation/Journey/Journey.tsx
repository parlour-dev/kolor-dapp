import React from "react";
import styles from "./Journey.module.css";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import { useEthers } from "@usedapp/core";
import { Link } from "react-router-dom";
// import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import Image from "./image.png";
import Video from "./video.png";
import Audio from "./audio.png";

const Journey: React.FC = () => {
	const { account } = useEthers();

	const quotes = [
		"Dreams come true when you don't sleep.",
		"Give me a museum and I'll fill it.",
		"Art should comfort the disturbed and disturb the comfortable.",
		"I saw the angel in the marble and carved until i set him free.",
		"<3",
		"For the future of social media.",
		"I have a flood of ideas in my mind. I just follow my vision.",
		"Creativity takes courage.",
		"We don't make mistakes, just happy little accidents.",
	];
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	return (
		<div className={styles.container}>
			<div className={styles.JourneyText}>Your journey starts here</div>
			{account && (
				<div className={styles.JourneyPost}>
					<Link to="/profile">
						<div className={styles.InfoContainer}>
							<div className={styles.userInfo}>
								<ProfilePicture address={account} height="1.3rem" />
								<div className={styles.userNickname}>
									{account.substring(0, 6)}...{account.substring(38, 42)}
								</div>
							</div>

							<div className={styles.userAddress}>{account}</div>
						</div>
					</Link>

					<div className={styles.MediaContent}>
						<textarea
							className={styles.textareaStyling}
							placeholder={randomQuote}
						></textarea>
					</div>

					<div className={styles.buttons}>
						<div className={styles.buttonsContainer}>
							<div className={[styles.buttonMedia, styles.animation].join(" ")}>
								<img className={styles.buttonIcon} src={Image} alt="Upload" />
							</div>
							<div className={[styles.buttonMedia, styles.animation].join(" ")}>
								<img className={styles.buttonIcon} src={Video} alt="Upload" />
							</div>
							<div className={[styles.buttonMedia, styles.animation].join(" ")}>
								<img className={styles.buttonIcon} src={Audio} alt="Upload" />
							</div>
						</div>
						<div className={[styles.buttonCreate, styles.animation].join(" ")}>
							Create
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Journey;