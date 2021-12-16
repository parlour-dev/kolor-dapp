import styles from "./Journey.module.css";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
// import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
// import Image from "./image.png";

export default function Journey(props: any) {
	let quote = "Go out and change the world! Now!";
	return (
		<div className={styles.container}>
			<div className={styles.JourneyText}>Your journey starts here</div>
			<div className={styles.JourneyPost}>
				<div className={styles.InfoContainer}>
					<div style={{ display: "flex", justifyContent: "left" }}>
						<div className={styles.ProfStyling}>
							<ProfilePicture address={"234243"} height={"1.5vmax"}></ProfilePicture>
						</div>
						<div className={styles.UserNickname}>asdasd123</div>
					</div>

					<div className={styles.UserAdress}>adasd13</div>
				</div>

				<div className={styles.MediaContent}>
					<textarea
						className={styles.TextareaStyling}
						placeholder={quote}
					></textarea>
				</div>

				<div className={styles.Buttons}>
					<div className={styles.ButtonsContainer}>
						<div className={styles.ButtonMedia}></div>
						<div className={styles.ButtonMedia}></div>
						<div className={styles.ButtonMedia}></div>
					</div>
					<div className={styles.ButtonCreate}>Create</div>
				</div>
			</div>
		</div>
	);
}
