import styles from "../PostText/PostText.module.css";
import Comments from "./Comments/Comments";
function PostText({text}) {
  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.creator}>
          <div className={styles.creatorInfo}>
            <div className={styles.creatorNick}>Jarosław Jakimowicz</div>
            <div className={styles.creatorWallet}>0x102938a290d90109d29132189189d</div>
          </div>
          <div className={styles.profPicture}> </div>
        </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.viewerAction}>
          <div className={styles.buttonBlue}>Appreciate</div>
          <div className={styles.buttonBlack}>Comment</div>
        </div>
        <Comments/>
        
      </div>
    </div>
  );
}

export default PostText;
