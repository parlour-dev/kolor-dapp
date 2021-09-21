import styles from "../Comments/Comments.module.css";

function Comments() {
	return (
		<div>
			<div className={styles.creator}>
				<div className={styles.creatorInfo}>
					<div className={styles.profPicture}> </div>

					<div className={styles.userInfoContainer}>
						<div className={styles.creatorNick}>Jarosław Jakimowicz</div>
						<div className={styles.creatorWallet}>
							0x102938a290d90109d29132189189d
						</div>
					</div>
				</div>
			</div>
			<div className={styles.textContainer}>
				<div className={styles.text}>w szczebrzeszynie chrząszcz brz</div>
			</div>
		</div>
	);
}

export default Comments;
